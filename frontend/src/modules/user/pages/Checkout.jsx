import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Truck, CreditCard, Banknote, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '../components/Toast';

export function Checkout() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const addOrder = useOrderStore((state) => state.addOrder);
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'card'
    });

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="text-6xl">🛒</div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Your Cart is Empty</h2>
                <Button onClick={() => navigate('/products')}>START SHOPPING</Button>
            </div>
        );
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate processing
        setTimeout(() => {
            const orderId = addOrder(
                { address: `${formData.address}, ${formData.city}, ${formData.zipCode}`, paymentMethod: formData.paymentMethod },
                items,
                getTotalPrice()
            );

            clearCart();
            setIsLoading(false);
            navigate('/order-success');
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl pb-24">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-6 md:mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Shipping Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="bg-secondary/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-secondary/20">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="text-primary h-6 w-6" />
                            <h2 className="text-xl md:text-2xl font-black italic tracking-tight uppercase">Shipping Details</h2>
                        </div>

                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Address</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                                    placeholder="123 Electric Ave"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">City</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                                        placeholder="New York"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Zip Code</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-full bg-background border border-input rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-base"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-secondary/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-secondary/20">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="text-primary h-6 w-6" />
                            <h2 className="text-xl md:text-2xl font-black italic tracking-tight uppercase">Payment Method</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                className={`cursor-pointer border-2 rounded-2xl p-4 flex items-center gap-4 transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-transparent bg-background hover:bg-secondary/20'}`}
                            >
                                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold">Credit/Debit Card</p>
                                    <p className="text-xs text-muted-foreground">Secure payment</p>
                                </div>
                                {formData.paymentMethod === 'card' && <CheckCircle className="ml-auto text-primary h-5 w-5" />}
                            </div>

                            <div
                                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                                className={`cursor-pointer border-2 rounded-2xl p-4 flex items-center gap-4 transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-transparent bg-background hover:bg-secondary/20'}`}
                            >
                                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                    <Banknote className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold">Cash on Delivery</p>
                                    <p className="text-xs text-muted-foreground">Pay when it arrives</p>
                                </div>
                                {formData.paymentMethod === 'cod' && <CheckCircle className="ml-auto text-primary h-5 w-5" />}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-secondary/10 p-8 rounded-[2rem] border border-secondary/20 sticky top-24">
                        <h2 className="text-2xl font-black italic tracking-tight uppercase mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="h-16 w-16 rounded-xl bg-background overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold uppercase text-sm line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity} x ₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="font-black italic">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-dashed border-white/10">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-bold">₹{getTotalPrice().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-bold text-green-500">FREE</span>
                            </div>
                            <div className="flex justify-between text-xl font-black italic pt-4 mt-4 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            className="w-full h-14 mt-8 rounded-full text-lg font-black italic tracking-wider shadow-xl shadow-primary/20 group hover:scale-[1.02] transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">PROCESSING...</span>
                            ) : (
                                <span className="flex items-center">CONFIRM ORDER <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                            )}
                        </Button>

                        <div className="flex items-center gap-2 justify-center mt-6 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                            <Truck className="h-4 w-4" /> Secure Checkout • SSL Encrypted
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
