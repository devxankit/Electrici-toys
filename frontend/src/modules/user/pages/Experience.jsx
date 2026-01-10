import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScooterScroll } from '../components/ScooterScroll';

export function Experience() {
    return (
        <div className="bg-[#050505] min-h-screen text-white/90 selection:bg-white/20 selection:text-white">
            {/* Overlay Content using absolute positioning or fixed, effectively creating the "Scrollytelling" captions */}
            <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center">

                {/* Section 1: Intro */}
                <ScrollText start={0} end={0.2} align="center">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">Electrici-Toys.</h1>
                </ScrollText>

                {/* Section 2: Precision */}
                <ScrollText start={0.25} end={0.5} align="start">
                    <div className="md:ml-32 max-w-xl">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">Precision Engineering.</h2>
                        <p className="text-xl text-white/60">Every component designed for maximum performance and durability.</p>
                    </div>
                </ScrollText>

                {/* Section 3: Quality */}
                <ScrollText start={0.55} end={0.8} align="end">
                    <div className="md:mr-32 max-w-xl text-right ml-auto">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-4">Ultra-High Quality.</h2>
                        <p className="text-xl text-white/60">Materials sourced from the future. Built to last a lifetime.</p>
                    </div>
                </ScrollText>

                {/* Section 4: CTA */}
                <ScrollText start={0.85} end={1.0} align="center">
                    <div className="text-center">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">Exciting Toys.</h2>
                        <a href="/products" className="pointer-events-auto inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-bold tracking-wide hover:scale-105 transition-transform">
                            SHOP COLLECTION
                        </a>
                    </div>
                </ScrollText>

            </div>

            <ScooterScroll />

            {/* Footer / Continue hint */}
            <div className="h-screen bg-[#050505] flex flex-col items-center justify-center relative z-20 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-bounce delay-1000" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center space-y-8"
                >
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em]">The Future is Here</p>
                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        READY TO<br />PLAY?
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-6 justify-center pt-8">
                        <a
                            href="/products"
                            className="group relative px-10 py-5 bg-white text-black rounded-full font-black tracking-wider overflow-hidden hover:scale-105 transition-transform"
                        >
                            <span className="relative z-10">ENTER STORE</span>
                            <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </a>
                        <a
                            href="/home"
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-bold tracking-wider hover:bg-white/10 transition-colors"
                        >
                            Go To Dashboard
                        </a>
                    </div>
                </motion.div>

                {/* Bottom Brand */}
                <div className="absolute bottom-10 left-0 right-0 text-center">
                    <p className="text-white/20 text-xs uppercase tracking-widest">Electrici-Toys © 2026. Engineered for Thrills.</p>
                </div>
            </div>
        </div>
    );
}

// Helper to fade text in/out based on scroll range
function ScrollText({ children, start, end, align = "center" }) {
    const { scrollYProgress } = useScroll();
    // Fade in at 'start', fade out at 'end'
    // Create a small window around the center of the range for full opacity
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, end],
        [50, -50]
    );

    // Conditionally render or just control opacity. 
    // We'll rely on opacity since they overlap in position (fixed screen).

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute w-full px-8 ${align === 'center' ? 'text-center' :
                align === 'start' ? 'text-left' : 'text-right'
                }`}
        >
            {children}
        </motion.div>
    );
}
