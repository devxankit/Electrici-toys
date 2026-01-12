import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const frameCount = 240;

// Progressive loading strategy: Load critical frames first, then fill in gaps
const getCriticalFrames = () => {
    const critical = [];
    // Load every 10th frame first (24 frames = ~90% less data)
    for (let i = 1; i <= frameCount; i += 10) {
        critical.push(i);
    }
    return critical;
};

const getRemainingFrames = () => {
    const critical = getCriticalFrames();
    const remaining = [];
    for (let i = 1; i <= frameCount; i++) {
        if (!critical.includes(i)) {
            remaining.push(i);
        }
    }
    return remaining;
};

export function ScooterScroll() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [criticalFramesLoaded, setCriticalFramesLoaded] = useState(false);
    const [allFramesLoaded, setAllFramesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const frameImagesRef = useRef([]);

    // Scroll progress for the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });


    // Map scroll (0-1) to frame index (0-239)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Phase 1: Load critical frames (every 10th frame) for instant start
    useEffect(() => {
        const criticalFrames = getCriticalFrames();
        let loadedCount = 0;

        frameImagesRef.current = new Array(frameCount);

        criticalFrames.forEach((frameNum) => {
            const img = new Image();
            const paddedIndex = frameNum.toString().padStart(3, '0');
            img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                frameImagesRef.current[frameNum - 1] = img;
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / criticalFrames.length) * 100));

                if (loadedCount === criticalFrames.length) {
                    setCriticalFramesLoaded(true);
                }
            };

            img.onerror = () => {
                loadedCount++;
                if (loadedCount === criticalFrames.length) {
                    setCriticalFramesLoaded(true);
                }
            };
        });
    }, []);

    // Phase 2: Load remaining frames in background after critical frames are ready
    useEffect(() => {
        if (!criticalFramesLoaded) return;

        const remainingFrames = getRemainingFrames();
        let loadedCount = 0;

        // Use requestIdleCallback for non-blocking background loading
        const loadNextBatch = (startIdx) => {
            const batchSize = 10;
            const batch = remainingFrames.slice(startIdx, startIdx + batchSize);

            batch.forEach((frameNum) => {
                const img = new Image();
                const paddedIndex = frameNum.toString().padStart(3, '0');
                img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;

                img.onload = () => {
                    frameImagesRef.current[frameNum - 1] = img;
                    loadedCount++;
                    if (loadedCount === remainingFrames.length) {
                        setAllFramesLoaded(true);
                    }
                };

                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === remainingFrames.length) {
                        setAllFramesLoaded(true);
                    }
                };
            });

            if (startIdx + batchSize < remainingFrames.length) {
                setTimeout(() => loadNextBatch(startIdx + batchSize), 50);
            }
        };

        loadNextBatch(0);
    }, [criticalFramesLoaded]);


    useEffect(() => {
        const render = (index) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const frameIndex = Math.round(index);
            let img = frameImagesRef.current[frameIndex];

            // If exact frame isn't loaded, find nearest loaded frame
            if (!img || !img.complete) {
                // Look for nearest loaded frame
                for (let offset = 1; offset <= 10; offset++) {
                    const before = frameImagesRef.current[Math.max(0, frameIndex - offset)];
                    const after = frameImagesRef.current[Math.min(frameCount - 1, frameIndex + offset)];

                    if (before && before.complete && before.naturalHeight !== 0) {
                        img = before;
                        break;
                    }
                    if (after && after.complete && after.naturalHeight !== 0) {
                        img = after;
                        break;
                    }
                }
            }

            // Clear canvas
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            if (img && img.complete && img.naturalHeight !== 0) {
                // Draw image "cover" style to fill screen (Math.max instead of Math.min)
                const scale = Math.max(width / img.width, height / img.height);
                const x = (width / 2) - (img.width / 2) * scale;
                const y = (height / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const unsubscribe = currentIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(0);

        return () => unsubscribe();
    }, [currentIndex, criticalFramesLoaded]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="sticky top-0 w-full h-screen object-cover block"
            />

            {/* Minimal loading hint - only shows during initial critical frame load */}
            {!criticalFramesLoaded && (
                <div className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                    <p className="font-mono text-xs text-white/80">Loading {loadingProgress}%</p>
                </div>
            )}
        </div>
    );
}
