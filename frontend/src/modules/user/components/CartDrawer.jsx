import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CartDrawer() {
    const { items, removeItem, updateQuantity, getTotalPrice, getItemCount } = useCartStore();
    const totalPrice = getTotalPrice();
    const freeShippingThreshold = 50000;
    const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <ShoppingCart className="h-5 w-5" />
                    <AnimatePresence>
                        {getItemCount() > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                            >
                                {getItemCount()}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader className="pb-4 border-b">
                    <SheetTitle className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                        YOUR CART <ShoppingCart className="h-5 w-5 italic" />
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    {/* Free Shipping Progress */}
                    <div className="px-1 space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span>Free Shipping Progress</span>
                            <span>{progress.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-primary"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold text-center">
                            {totalPrice < freeShippingThreshold
                                ? `Spend ₹${(freeShippingThreshold - totalPrice).toLocaleString()} more for free shipping!`
                                : "You've unlocked FREE SHIPPING!"}
                        </p>
                    </div>

                    <AnimatePresence>
                        {items.length === 0 ? (
                            <div className="h-[40vh] flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center text-3xl">🛒</div>
                                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Your cart is empty</p>
                                <Button variant="outline" className="rounded-full">CONTINUE SHOPPING</Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-24 h-24 bg-secondary/20 rounded-2xl overflow-hidden flex items-center justify-center">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive" onClick={() => removeItem(item.id)}>
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 italic">{item.category}</p>
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex items-center border rounded-full px-2 py-1 gap-3">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-primary"><Minus className="h-3 w-3" /></button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-primary"><Plus className="h-3 w-3" /></button>
                                            </div>
                                            <span className="font-black italic">₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {items.length > 0 && (
                    <div className="pt-6 border-t space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subtotal</span>
                            <span className="text-2xl font-black italic tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-wider font-bold">Shipping and taxes calculated at checkout</p>
                        <div className="flex gap-4">
                            <Button asChild variant="outline" className="flex-1 h-14 rounded-full text-md font-black italic tracking-tighter">
                                <Link to="/cart">VIEW BAG</Link>
                            </Button>
                            <Button className="flex-[2] h-14 rounded-full text-lg font-black italic tracking-tighter group" asChild>
                                <Link to="/checkout">
                                    CHECKOUT <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block ml-2">→</motion.span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
