import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useToast } from './Toast';
import { useNavigate } from 'react-router-dom';

import { productCardVariants, imageHover, staggerContainer, fadeIn } from '../lib/animations';

export function ProductCard({ product, onQuickView }) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addItem(product);
        toast({
            title: "ADDED TO CART! 🛒",
            description: `${product.name.toUpperCase()} IS NOW IN YOUR BAG.`,
            variant: "default",
        });
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
        toast({
            title: isInWishlist ? "REMOVED FROM WISHLIST" : "ADDED TO WISHLIST! ❤️",
            description: `${product.name.toUpperCase()} HAS BEEN UPDATED.`,
        });
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        if (onQuickView) onQuickView(product);
    };

    return (
        <motion.div
            variants={productCardVariants}
            initial="hidden"
            whileInView="show"
            whileHover="hover"
            viewport={{ once: true }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer h-full"
        >
            <Card className="relative h-full flex flex-col overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-500 rounded-[2.5rem] shadow-none hover:shadow-premium">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
                    {/* Badges */}
                    <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                        {product.isNew && (
                            <Badge variant="default" className="glass bg-primary/80 hover:bg-primary font-black px-4 py-1.5 rounded-full text-[10px] tracking-widest border-white/20">
                                NEW RELEASE
                            </Badge>
                        )}
                        {product.isSale && (
                            <Badge variant="destructive" className="glass bg-destructive/80 font-black px-4 py-1.5 rounded-full text-[10px] tracking-widest border-white/20">
                                LIMITED OFFER
                            </Badge>
                        )}
                    </div>

                    {/* Product Image */}
                    <motion.div
                        variants={imageHover}
                        initial="initial"
                        whileHover="hover"
                        className="w-full h-full flex items-center justify-center p-8"
                    >
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain filter drop-shadow-2xl" />
                        ) : (
                            <div className="text-8xl select-none">🎮</div>
                        )}
                    </motion.div>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 backdrop-blur-[2px]">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                size="icon"
                                variant="glass"
                                className="rounded-full h-14 w-14 shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out"
                                onClick={handleToggleWishlist}
                            >
                                <Heart className={isInWishlist ? "fill-primary text-primary h-6 w-6" : "h-6 w-6"} />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                size="icon"
                                variant="glass"
                                className="rounded-full h-14 w-14 shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75"
                                onClick={handleQuickView}
                            >
                                <Eye className="h-6 w-6" />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col pt-8 px-8 pb-8">
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-primary/60 mb-2 uppercase tracking-[0.25em]">
                            {product.category}
                        </p>
                        <h3 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors uppercase italic leading-tight">
                            {product.name}
                        </h3>
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-black italic tracking-tighter text-foreground">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through decoration-primary/50 font-bold opacity-60">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="default"
                        premium
                        className="w-full rounded-full font-black italic tracking-tighter h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="mr-2 h-6 w-6" /> ADD TO BAG
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
}
