import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Heart, Rocket } from 'lucide-react';

export function About() {
    const values = [
        { icon: Zap, title: "INNOVATION", desc: "We focus on the latest tech in toy engineering." },
        { icon: Target, title: "PRECISION", desc: "Every component is tested for maximum performance." },
        { icon: Heart, title: "SAFETY", desc: "Fun is only possible when it's safe for everyone." },
        { icon: Rocket, title: "SPEED", desc: "We push the boundaries of what toys can do." }
    ];

    return (
        <div className="pb-24 overflow-x-hidden">
            {/* Hero Section */}
            <section className="bg-secondary/20 py-32 relative">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none mb-8"
                    >
                        OUR <span className="text-primary not-italic">MISSION</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium italic leading-relaxed"
                    >
                        We started ELECTRICI-TOYS with a simple goal: to make professional-grade electric mobility and robotics accessible through play. We believe that the toys of today are the tools of tomorrow.
                    </motion.p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] opacity-5 pointer-events-none">🤖</div>
            </section>

            {/* Values Grid */}
            <section className="container mx-auto px-4 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-secondary/20 border-2 border-transparent hover:border-primary/20 transition-all flex flex-col items-center text-center space-y-4"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <v.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">{v.title}</h3>
                            <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-8">ENGINEERED FOR <span className="text-primary">THRILLS</span>.</h2>
                    <div className="space-y-6 text-lg text-muted-foreground font-medium italic">
                        <p>From the first hoverboard we tested in our garage to the advanced AI-powered tanks we sell today, quality has been our north star.</p>
                        <p>Every Electrici-Toy is engineered to provide a seamless interaction between human and machine. We don't just sell gadgets; we sell the spark of curiosity.</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="aspect-square bg-primary/20 rounded-[4rem] flex items-center justify-center text-[15rem]"
                >
                    🛹
                </motion.div>
            </section>
        </div>
    );
}
