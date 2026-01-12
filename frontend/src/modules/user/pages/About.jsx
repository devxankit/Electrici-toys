import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContentStore } from '../../admin/store/adminContentStore';
import { fadeIn, staggerContainer, scaleUp } from '../lib/animations';

export function About() {
    const { content } = useContentStore();
    const { aboutPage } = content;

    const IconRenderer = ({ name, ...props }) => {
        const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
        return <Icon {...props} />;
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            className="pb-32 overflow-x-hidden"
        >
            {/* Hero Section */}
            <section className="relative py-40 md:py-56 flex items-center justify-center overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div variants={staggerContainer(0.2)}>
                        <motion.h1
                            variants={fadeIn('up')}
                            className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase italic leading-[0.8] mb-12 drop-shadow-2xl"
                        >
                            {aboutPage.hero.heading.split(' ').map((word, i) => (
                                <React.Fragment key={i}>
                                    {word === 'MISSION' ? <span className="text-primary not-italic text-glow">MISSION </span> : word + ' '}
                                </React.Fragment>
                            ))}
                        </motion.h1>
                        <motion.p
                            variants={fadeIn('up')}
                            className="max-w-4xl mx-auto text-xl md:text-3xl text-muted-foreground font-bold italic leading-relaxed opacity-80"
                        >
                            {aboutPage.hero.mission}
                        </motion.p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] md:text-[50rem] select-none pointer-events-none filter blur-sm"
                >
                    🤖
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="container mx-auto px-4 py-32">
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {aboutPage.values.map((v) => (
                        <motion.div
                            key={v.id}
                            variants={fadeIn('up')}
                            whileHover={{ y: -10, rotate: 1 }}
                            className="p-12 rounded-[3.5rem] glass hover:glass-dark transition-all duration-500 flex flex-col items-center text-center space-y-6 shadow-xl hover:shadow-glow/20"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner"
                            >
                                <IconRenderer name={v.icon} className="h-10 w-10" />
                            </motion.div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{v.title}</h3>
                                <p className="text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] leading-relaxed opacity-60">
                                    {v.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="space-y-8"
                >
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-primary">
                        {aboutPage.content.heading}
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl text-muted-foreground font-bold italic leading-relaxed opacity-80">
                        {aboutPage.content.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, type: "spring" }}
                    className="aspect-square bg-gradient-to-br from-primary/30 to-primary/5 rounded-[5rem] flex items-center justify-center text-[12rem] md:text-[18rem] shadow-2xl shadow-primary/20 relative group"
                >
                    <div className="absolute inset-0 rounded-[5rem] glass opacity-50 group-hover:opacity-20 transition-opacity" />
                    <motion.span
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {aboutPage.content.emoji}
                    </motion.span>
                </motion.div>
            </section>
        </motion.div>
    );
}
