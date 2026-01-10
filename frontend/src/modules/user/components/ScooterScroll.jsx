import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

// 240 frames in /public/sequence/
const frameCount = 240;
const images = [];

// Preload function (in a real app, you might want to do this more selectively or with a loader)
const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Naming convention: ezgif-frame-001.jpg
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
        images.push(img);
    }
};

export function ScooterScroll() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [frameImages, setFrameImages] = useState([]);

    // Scroll progress for the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll (0-1) to frame index (0-239)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        // Determine image path dynamically
        const loadedImages = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Naming convention: ezgif-frame-001.jpg
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
                if (loadedCount === frameCount) {
                    setLoading(false);
                }
            };

            // Fallback for missing images to prevent broken canvas
            img.onerror = () => {
                // Create a placeholder canvas if image fails (so dev can see something)
                loadedCount++;
                setImagesLoaded(loadedCount);
                if (loadedCount === frameCount) setLoading(false);
            }

            loadedImages.push(img);
        }
        setFrameImages(loadedImages);
    }, []);

    useEffect(() => {
        const render = (index) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Handle scaling
            // Set canvas dimensions to window size for fullscreen feel, or fixed aspect ratio
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Only resize if needed to avoid flickering (though checking every frame is okay for this)
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            const img = frameImages[Math.round(index)];

            // Clear canvas
            ctx.fillStyle = '#050505'; // Background match
            ctx.fillRect(0, 0, width, height);

            if (img && img.complete && img.naturalHeight !== 0) {
                // Draw image "contain" style
                const scale = Math.min(width / img.width, height / img.height);
                const x = (width / 2) - (img.width / 2) * scale;
                const y = (height / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            } else {
                // Draw placeholder if image missing
                ctx.fillStyle = '#1a1a1a';
                ctx.font = '20px Inter';
                ctx.fillText(`Frame ${Math.round(index)} (Missing Assets)`, width / 2 - 100, height / 2);

                ctx.strokeStyle = '#333';
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, 100 * (index / frameCount), 0, 2 * Math.PI);
                ctx.stroke();
            }
        };

        // Render loop responding to scroll change
        const unsubscribe = currentIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(0);

        return () => unsubscribe();
    }, [currentIndex, frameImages, loading]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="sticky top-0 w-full h-screen object-contain block"
            />

            {/* Loading Indicator */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin" />
                        <p className="font-mono text-xs uppercase tracking-widest">Loading Assets... {Math.round((imagesLoaded / frameCount) * 100)}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}
