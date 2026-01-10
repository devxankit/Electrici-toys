import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { products } from '../../../data/products';
import { QuickView } from '../components/QuickView';
import { Shield, Truck, CreditCard, RotateCcw } from 'lucide-react';

export function Home() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const featuredProducts = products.slice(0, 4);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <div className="flex flex-col gap-20 pb-20 overflow-x-hidden">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center bg-secondary/20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/hero.png" alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 md:bg-black/10" />
                </div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic text-white drop-shadow-2xl">
                            UNLEASH THE <span className="text-primary not-italic">POWER</span> OF PLAY.
                        </h1>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" className="rounded-full px-12 text-xl font-black italic tracking-tighter h-16 shadow-2xl shadow-primary/30 hover:scale-105 transition-all bg-primary text-white border-2 border-primary">
                                SHOP COLLECTION
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Markers */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y">
                    {[
                        { icon: Shield, title: "1-YEAR WARRANTY", desc: "Full peace of mind" },
                        { icon: Truck, title: "EXPRESS SHIPPING", desc: "Same day dispatch" },
                        { icon: CreditCard, title: "GST INVOICE", desc: "Business ready" },
                        { icon: RotateCcw, title: "EASY RETURNS", desc: "7-day policy" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h4 className="text-xs font-black tracking-widest uppercase">{item.title}</h4>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-primary leading-none">THE HIT LIST</h2>
                        <p className="text-lg text-muted-foreground font-medium italic">Our most-wanted electric wonders.</p>
                    </div>
                    <Button variant="link" className="font-black text-xl tracking-tighter uppercase italic group">
                        All Products <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={() => handleQuickView(product)}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Categories (Visual) */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        className="h-[500px] rounded-[3rem] bg-accent/20 relative overflow-hidden group p-12 flex flex-col justify-end border-2 border-transparent hover:border-accent/30 transition-all duration-500"
                    >
                        <img
                            src="/assets/products/Ha1214f3bb2bb47c0b55e98d0143b90455.jpg_720x720q50.jpg"
                            alt="Hoverboard"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] object-contain opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                        />
                        <h3 className="text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">Hover<br />Boards</h3>
                        <p className="max-w-xs text-muted-foreground font-bold mb-8 uppercase tracking-widest text-xs">Self-balancing tech with precision engineering.</p>
                        <Button className="w-fit rounded-full px-8 h-12 font-black italic">DISCOVER NOW</Button>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8">
                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="h-[234px] rounded-[3rem] bg-primary/10 relative overflow-hidden group p-8 flex flex-col justify-center border-2 border-transparent hover:border-primary/30 transition-all duration-500"
                        >
                            <img
                                src="/assets/products/WhatsApp Image 2026-01-10 at 16.10.54.jpeg"
                                alt="Drift Pro"
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[140%] object-contain opacity-40 group-hover:opacity-60 group-hover:rotate-12 transition-all duration-700 pointer-events-none"
                            />
                            <h3 className="text-4xl font-black italic tracking-tighter uppercase">Drift Pro</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">Maximum Slide. Zero Friction.</p>
                            <Button variant="outline" className="w-fit rounded-full border-2 font-black italic">EXPLORE</Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 0.98 }}
                            className="h-[234px] rounded-[3rem] bg-indigo-500/10 relative overflow-hidden group p-8 flex flex-col justify-center border-2 border-transparent hover:border-indigo-500/30 transition-all duration-500"
                        >
                            <img
                                src="/assets/products/WhatsApp Image 2026-01-10 at 16.11.05.jpeg"
                                alt="Robotics"
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[120%] object-contain opacity-40 group-hover:opacity-60 group-hover:-rotate-12 transition-all duration-700 pointer-events-none"
                            />
                            <h3 className="text-4xl font-black italic tracking-tighter uppercase">Robotics</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">Smart toys, smarter interaction.</p>
                            <Button variant="outline" className="w-fit rounded-full border-2 font-black italic">EXPLORE</Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            <QuickView
                product={selectedProduct}
                open={isQuickViewOpen}
                onOpenChange={setIsQuickViewOpen}
            />
        </div>
    );
}
