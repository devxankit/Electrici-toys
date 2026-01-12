import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useContentStore } from '../../admin/store/adminContentStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { staggerContainer, fadeIn, scaleUp } from '../lib/animations';

export function Contact() {
    const { content } = useContentStore();
    const { contactPage } = content;

    return (
        <motion.div
            initial="hidden"
            animate="show"
            className="container mx-auto px-4 py-32 pb-40"
        >
            <div className="max-w-6xl mx-auto">
                <header className="mb-24 text-center md:text-left">
                    <motion.h1
                        variants={fadeIn('up')}
                        className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase italic text-primary leading-[0.8] mb-8 drop-shadow-2xl"
                    >
                        {contactPage.header.title}
                    </motion.h1>
                    <motion.p
                        variants={fadeIn('up')}
                        className="text-xl md:text-3xl font-bold italic text-muted-foreground uppercase max-w-3xl leading-tight opacity-70"
                    >
                        {contactPage.header.subtitle}
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Contact Info */}
                    <motion.div
                        variants={staggerContainer(0.1, 0.3)}
                        className="space-y-16"
                    >
                        <div className="space-y-10">
                            {[
                                { icon: Mail, title: "EMAIL US", value: contactPage.contactInfo.email },
                                { icon: Phone, title: "CALL US", value: contactPage.contactInfo.phone },
                                { icon: MapPin, title: "VISIT STUDIO", value: contactPage.contactInfo.address }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeIn('right')}
                                    className="flex gap-8 items-start group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white group-hover:shadow-glow"
                                    >
                                        <item.icon className="h-7 w-7" />
                                    </motion.div>
                                    <div className="space-y-1 pt-2">
                                        <h3 className="text-xl font-black italic tracking-tighter uppercase leading-none">{item.title}</h3>
                                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={fadeIn('up')}
                            whileHover={{ y: -5 }}
                            className="p-12 rounded-[4rem] bg-primary text-primary-foreground space-y-6 shadow-2xl shadow-primary/30 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all" />
                            <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Support Hours</h4>
                            <p className="text-sm uppercase font-black tracking-[0.2em] opacity-80 whitespace-pre-line leading-relaxed">
                                {contactPage.supportHours.schedule}
                            </p>
                            <div className="pt-6 flex gap-4 items-center">
                                <div className={`w-3 h-3 rounded-full ${contactPage.supportHours.liveStatus ? 'bg-success animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-muted'}`} />
                                <span className="text-[11px] font-black uppercase tracking-[0.25em]">{contactPage.supportHours.liveText}</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        variants={fadeIn('left')}
                        className="glass-dark rounded-[4rem] p-12 md:p-16 border-white/5 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">
                                        {contactPage.formLabels.nameLabel}
                                    </label>
                                    <Input
                                        className="bg-background/20 backdrop-blur-md border-white/10 h-16 rounded-[1.5rem] px-8"
                                        placeholder={contactPage.formLabels.namePlaceholder}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">
                                        {contactPage.formLabels.emailLabel}
                                    </label>
                                    <Input
                                        type="email"
                                        className="bg-background/20 backdrop-blur-md border-white/10 h-16 rounded-[1.5rem] px-8"
                                        placeholder={contactPage.formLabels.emailPlaceholder}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-3">
                                    {contactPage.formLabels.messageLabel}
                                </label>
                                <Textarea
                                    rows={5}
                                    className="bg-background/20 backdrop-blur-md border-white/10 rounded-[2.5rem] p-8 resize-none"
                                    placeholder={contactPage.formLabels.messagePlaceholder}
                                />
                            </div>

                            <Button
                                premium
                                className="w-full h-20 rounded-full text-2xl font-black italic tracking-tighter shadow-glow group"
                            >
                                {contactPage.formLabels.submitText}
                                <Send className="ml-3 h-6 w-6 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
