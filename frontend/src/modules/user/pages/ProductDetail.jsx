import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../../../data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { ProductCard } from '../components/ProductCard';

export function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const isInWishlist = useWishlistStore((state) => state.isInWishlist(Number(id)));

    useEffect(() => {
        const foundProduct = products.find(p => p.id === Number(id));
        setProduct(foundProduct);
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return (
        <div className="h-[60vh] flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⌛</motion.div>
        </div>
    );

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="pb-24">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-8">
                <nav className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/products" className="hover:text-primary">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Gallery Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-square rounded-[3rem] bg-secondary/20 flex items-center justify-center relative overflow-hidden group">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-[12rem]">🎮</div>
                            )}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl bg-secondary/20 flex items-center justify-center text-3xl cursor-pointer hover:bg-secondary/40 transition-colors overflow-hidden">
                                    {product.image ? <img src={product.image} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" /> : '🎮'}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Badge className="font-black tracking-widest uppercase">{product.category}</Badge>
                            {product.isNew && <Badge variant="success" className="font-black tracking-widest uppercase">NEW ARRIVAL</Badge>}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] mb-6">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`h-5 w-5 ${s <= Math.floor(product.rating) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                            <span className="text-sm font-black italic text-muted-foreground uppercase">{product.rating} / 5.0 Rating</span>
                        </div>

                        <p className="text-lg text-muted-foreground font-medium italic mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-6 mb-10">
                            <span className="text-5xl font-black italic tracking-tighter text-primary">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-2xl text-muted-foreground line-through decoration-primary/50 italic tracking-tighter">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 items-center mb-10">
                            <div className="flex items-center bg-secondary/50 rounded-full p-1 border-2 border-transparent focus-within:border-primary transition-all">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-12 w-12 hover:bg-background"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="h-5 w-5" />
                                </Button>
                                <span className="w-12 text-center font-black italic text-xl">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-12 w-12 hover:bg-background"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 h-14 rounded-full font-black italic tracking-tighter text-xl shadow-xl shadow-primary/20 group"
                                onClick={() => {
                                    for (let i = 0; i < quantity; i++) addItem(product);
                                }}
                            >
                                ADD TO CART <ShoppingCart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 w-14 rounded-full border-2"
                                onClick={() => toggleWishlist(product)}
                            >
                                <Heart className={isInWishlist ? "fill-primary text-primary" : ""} />
                            </Button>
                        </div>

                        {/* Features/Trust */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t">
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Shield className="h-5 w-5" /></div>
                                <span className="text-xs font-black uppercase tracking-wider">1-Year Warranty Included</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Truck className="h-5 w-5" /></div>
                                <span className="text-xs font-black uppercase tracking-wider">Free Express Delivery</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="container mx-auto px-4 mt-32">
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic text-primary mb-12">YOU MIGHT ALSO LIKE</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
