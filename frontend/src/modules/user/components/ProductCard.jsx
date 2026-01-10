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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer"
        >
            <Card className="group relative overflow-hidden border-none bg-secondary/20 hover:bg-secondary/30 transition-all duration-500 rounded-[2.5rem]">
                <div className="relative aspect-square overflow-hidden bg-muted">
                    {/* Badges */}
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                        {product.isNew && <Badge variant="default" className="bg-primary hover:bg-primary font-black px-3 py-1">NEW</Badge>}
                        {product.isSale && <Badge variant="destructive" className="font-black px-3 py-1">SALE</Badge>}
                    </div>

                    {/* Product Image */}
                    <div className="w-full h-full flex items-center justify-center bg-secondary/10 group-hover:scale-110 transition-transform duration-700">
                        {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-7xl">🎮</div>
                        )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full h-12 w-12 shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]"
                            onClick={handleToggleWishlist}
                        >
                            <Heart className={isInWishlist ? "fill-primary text-primary h-5 w-5" : "h-5 w-5"} />
                        </Button>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full h-12 w-12 shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[100ms]"
                            onClick={handleQuickView}
                        >
                            <Eye className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <CardContent className="pt-8 px-8">
                    <p className="text-[10px] font-black text-primary mb-2 uppercase tracking-[0.2em]">{product.category}</p>
                    <h3 className="text-xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors uppercase italic leading-none">{product.name}</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-black italic tracking-tighter">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through decoration-primary/50 font-bold">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pb-8 px-8 pt-4">
                    <Button
                        className="w-full rounded-full font-black italic tracking-tighter h-12 text-md group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-lg"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" /> ADD TO BAG
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
