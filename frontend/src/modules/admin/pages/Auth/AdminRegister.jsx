import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/adminAuthStore';
import { Button } from '../../../user/components/ui/button';
import { Input } from '../../../user/components/ui/input';
import { useToast } from '../../../user/components/Toast';
import { Loader2, ArrowRight, Store, Rocket } from 'lucide-react';

export default function AdminRegister() {
    const navigate = useNavigate();
    const { register } = useAdminAuthStore();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Passwords mismatch",
                description: "Please ensure both passwords match.",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        // Simulate API delay
        setTimeout(() => {
            const result = register(formData.businessName, formData.email, formData.password);

            if (result.success) {
                toast({
                    title: "Application Received!",
                    description: "Welcome to the Partner Program.",
                    variant: "success",
                });
                navigate('/admin');
            } else {
                toast({
                    title: "Registration Failed",
                    description: result.error,
                    variant: "destructive",
                });
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex text-foreground relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-6xl mx-auto flex items-center justify-center p-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

                    {/* Left Side - Brand/Hero (Order Swapped for visual variety vs Login) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:block space-y-8 order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-secondary/20 mb-4 border border-secondary/30">
                            <Rocket className="h-12 w-12 text-primary" />
                        </div>
                        <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-tight">
                            Start Your<br />
                            <span className="text-primary">Journey</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-medium max-w-md">
                            Create your admin account today and start managing the platform instantly.
                        </p>

                        <div className="space-y-4 pt-4">
                            {['Zero Commission for 30 Days', 'Instant Store Setup', 'Dedicated Account Manager'].map((perk, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <p className="font-bold uppercase tracking-widest text-sm">{perk}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-background/60 backdrop-blur-xl border border-secondary/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl order-1 lg:order-2"
                    >
                        <div className="mb-8">
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Admin Apply</h1>
                            <p className="text-muted-foreground font-medium italic">Join the Electrici-Toys Admin Team</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest pl-4">Business / Store Name</label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Turbo Toys Inc."
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    className="h-12 rounded-2xl bg-secondary/10 border-secondary/20 focus:border-primary/50 text-sm font-bold"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest pl-4">Business Email</label>
                                <Input
                                    type="email"
                                    placeholder="partner@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="h-12 rounded-2xl bg-secondary/10 border-secondary/20 focus:border-primary/50 text-sm font-bold"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest pl-4">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="h-12 rounded-2xl bg-secondary/10 border-secondary/20 focus:border-primary/50 text-sm font-bold"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest pl-4">Confirm</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="h-12 rounded-2xl bg-secondary/10 border-secondary/20 focus:border-primary/50 text-sm font-bold"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl text-lg font-black italic uppercase tracking-widest hover:scale-[1.02] transition-transform bg-primary text-primary-foreground shadow-lg shadow-primary/25 mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Submit Application <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 text-center space-y-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                Already a partner?{' '}
                                <Link to="/admin/login" className="text-primary font-black uppercase tracking-wider hover:underline">
                                    Login Here
                                </Link>
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
