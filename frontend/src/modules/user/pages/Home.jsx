import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useContentStore } from '../../admin/store/adminContentStore';
import { products } from '../../../data/products';
import { QuickView } from '../components/QuickView';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { staggerContainer, fadeIn, scaleUp } from '../lib/animations';

export function Home() {
    const { content } = useContentStore();
    const { homePage } = content;
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const featuredProducts = products.slice(0, 4);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const IconRenderer = ({ name, ...props }) => {
        const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
        return <Icon {...props} />;
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            className="flex flex-col gap-24 pb-32 overflow-x-hidden"
        >
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img src={homePage.hero.image} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={staggerContainer(0.2, 0.5)}
                        className="max-w-5xl mx-auto flex flex-col items-center text-center"
                    >
                        <motion.h1
                            variants={fadeIn('up')}
                            className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        >
                            {homePage.hero.heading.split(' ').map((word, i) =>
                                word === 'POWER' ? <span key={i} className="text-primary not-italic text-glow">POWER </span> : word + ' '
                            )}
                        </motion.h1>

                        <motion.div variants={fadeIn('up')}>
                            <a href={homePage.hero.ctaLink}>
                                <Button
                                    premium
                                    size="lg"
                                    className="rounded-full px-16 h-20 text-2xl font-black italic tracking-tighter shadow-glow"
                                >
                                    {homePage.hero.ctaText}
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Markers */}
            <section className="container mx-auto px-4">
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 px-8 rounded-[3rem] border bg-card/30 backdrop-blur-sm"
                >
                    {homePage.trustMarkers.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn('up')}
                            className="flex flex-col items-center text-center space-y-4 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 transition-colors group-hover:bg-primary group-hover:text-white group-hover:shadow-glow"
                            >
                                <IconRenderer name={item.icon} className="h-8 w-8" />
                            </motion.div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-black tracking-[0.2em] uppercase">{item.title}</h4>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase opacity-60 group-hover:opacity-100 transition-opacity">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4">
                <motion.div
                    variants={fadeIn('up')}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
                >
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-primary leading-[0.8]">
                            {homePage.featuredSection.title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-bold italic opacity-70">
                            {homePage.featuredSection.subtitle}
                        </p>
                    </div>
                    <a href={homePage.featuredSection.ctaLink}>
                        <Button variant="link" className="font-black text-xl tracking-tighter uppercase italic group p-0 h-auto gap-3">
                            {homePage.featuredSection.ctaText}
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                →
                            </span>
                        </Button>
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={() => handleQuickView(product)}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Categories */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {homePage.categories.slice(0, 1).map((cat) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className={`h-[450px] md:h-[600px] rounded-[3rem] bg-${cat.bgColor} relative overflow-hidden group p-10 md:p-16 flex flex-col justify-end border-2 border-transparent hover:border-${cat.borderColor} transition-all duration-700 shadow-2xl hover:shadow-glow`}
                        >
                            <motion.img
                                initial={{ scale: 1.2, rotate: -5 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 1.2 }}
                                src={cat.image}
                                alt={cat.name}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] object-contain opacity-20 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000 pointer-events-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            />
                            <div className="relative z-10">
                                <h3 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6 drop-shadow-lg">
                                    {cat.title.split('\\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i === 0 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h3>
                                <p className="max-w-xs text-muted-foreground font-black mb-10 uppercase tracking-[0.2em] text-xs opacity-80">{cat.description}</p>
                                <a href={cat.ctaLink} className="w-fit">
                                    <Button premium size="lg" className="rounded-full px-12 h-14 font-black italic shadow-2xl">{cat.ctaText}</Button>
                                </a>
                            </div>
                        </motion.div>
                    ))}

                    <div className="grid grid-cols-1 gap-8">
                        {homePage.categories.slice(1).map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.2, type: "spring" }}
                                className={`h-[210px] md:h-[284px] rounded-[3rem] bg-${cat.bgColor} relative overflow-hidden group p-8 md:p-12 flex flex-col justify-center border-2 border-transparent hover:border-${cat.borderColor} transition-all duration-700 shadow-xl hover:shadow-glow`}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[150%] object-contain opacity-20 group-hover:opacity-40 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000 pointer-events-none filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                                />
                                <div className="relative z-10">
                                    <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2 leading-none">{cat.title}</h3>
                                    <p className="text-[10px] md:text-xs text-muted-foreground font-black uppercase tracking-[0.2em] mb-8 opacity-70">{cat.description}</p>
                                    <a href={cat.ctaLink} className="w-fit">
                                        <Button variant="outline" className="rounded-full border-2 border-foreground/10 font-black italic h-12 px-8 hover:bg-foreground hover:text-background transition-colors shadow-lg">{cat.ctaText}</Button>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            <QuickView
                product={selectedProduct}
                open={isQuickViewOpen}
                onOpenChange={setIsQuickViewOpen}
            />
        </motion.div>
    );
}
