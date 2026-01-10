import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
    return (
        <div className="container mx-auto px-4 py-24 pb-32">
            <div className="max-w-6xl mx-auto">
                <header className="mb-20 text-center md:text-left">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-primary leading-none mb-6">GET IN TOUCH</h1>
                    <p className="text-xl md:text-2xl font-medium italic text-muted-foreground uppercase max-w-2xl">Have questions about our electric wonders? Our team is here to help you gear up.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary shrink-0"><Mail className="h-6 w-6" /></div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">EMAIL US</h3>
                                    <p className="text-muted-foreground font-bold uppercase tracking-widest">support@electricitoys.com</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary shrink-0"><Phone className="h-6 w-6" /></div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">CALL US</h3>
                                    <p className="text-muted-foreground font-bold uppercase tracking-widest">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-primary shrink-0"><MapPin className="h-6 w-6" /></div>
                                <div>
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">VISIT STUDIO</h3>
                                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">123 Electric Avenue, Cyber City, Bangalore - 560001</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-primary text-primary-foreground space-y-4">
                            <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Support Hours</h4>
                            <p className="text-xs uppercase font-black tracking-[0.2em] opacity-80">Monday — Friday: 9am — 6pm<br />Saturday: 10am — 4pm</p>
                            <div className="pt-4 flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">LIVE SUPPPORT ACTIVE NOW</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-secondary/20 rounded-[4rem] p-10 md:p-14 border-2 border-transparent focus-within:border-primary/20 transition-all"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 text-primary">Full Name</label>
                                    <input type="text" className="w-full bg-background border-none rounded-2xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none" placeholder="JOHNNY DRIFT" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 text-primary">Email Address</label>
                                    <input type="email" className="w-full bg-background border-none rounded-2xl h-14 px-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none" placeholder="HELLO@SPEED.COM" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 text-primary">Message</label>
                                <textarea rows={5} className="w-full bg-background border-none rounded-[2rem] p-6 font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="TELL US ABOUT YOUR QUERY..."></textarea>
                            </div>

                            <Button className="w-full h-16 rounded-full text-xl font-black italic tracking-tighter shadow-xl shadow-primary/20 group">
                                SEND TRANSMISSION <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
