import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../components/ThemeToggle';
import { ShoppingCart, Heart, Search, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CartDrawer } from '../components/CartDrawer';
import { Link } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const NavLinks = ({ mobile = false, onClick }) => (
        <>
            {[
                { name: 'Home', path: '/home' },
                { name: 'Shop All', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
            ].map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClick}
                    className={cn(
                        "relative group transition-colors duration-300",
                        mobile
                            ? "text-3xl font-black italic uppercase tracking-tighter py-4 border-b border-border/10"
                            : "text-[11px] font-black uppercase tracking-[0.2em] text-foreground hover:text-primary"
                    )}
                >
                    {link.name}
                    {!mobile && (
                        <motion.span
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 shadow-glow"
                        />
                    )}
                </Link>
            ))}
        </>
    );

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "h-14 bg-background/70 backdrop-blur-xl shadow-xl border-b border-border/10"
                    : "h-16 bg-background/40 backdrop-blur-md border-b-transparent shadow-none"
            )}
        >
            <div className="container mx-auto px-6 h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-12">
                        {/* Mobile Menu Trigger */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="-ml-2 hover:bg-primary/10">
                                        <Menu className="h-7 w-7" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-full flex flex-col pt-24 glass border-r border-border/10">
                                    <SheetHeader className="absolute top-8 left-8">
                                        <SheetTitle className="text-left font-black italic tracking-tighter text-3xl text-primary">ELECTRICI-TOYS</SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-2 mt-8">
                                        <NavLinks mobile onClick={() => { }} />
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                className="flex items-center"
                            >
                                <span className="text-xl md:text-2xl font-black italic tracking-tighter text-foreground/60 group-hover:text-primary transition-colors">ELECTRICI</span>
                                <span className="text-xl md:text-2xl font-black italic tracking-tighter text-primary drop-shadow-glow">TOYS</span>
                            </motion.div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-10">
                            <NavLinks />
                        </nav>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden md:flex items-center glass rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all w-48 lg:w-64">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="SEARCH TOYS..."
                                className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest px-3 w-full placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="text-foreground/70 hover:text-primary transition-colors hidden sm:block"
                            >
                                <Heart className="h-6 w-6" />
                            </motion.button>

                            <CartDrawer />

                            <ThemeToggle />

                            {isAuthenticated ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
                                            <img
                                                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                                alt={user?.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-64 glass-dark border-white/10 mt-2" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal p-4">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-black italic tracking-tighter uppercase">{user?.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{user?.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <div className="p-2 space-y-1">
                                            <DropdownMenuItem onClick={() => navigate('/home')} className="rounded-lg font-black italic uppercase tracking-tighter focus:bg-primary focus:text-black">
                                                <User className="mr-3 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/orders')} className="rounded-lg font-black italic uppercase tracking-tighter focus:bg-primary focus:text-black">
                                                <ShoppingBag className="mr-3 h-4 w-4" />
                                                <span>My Orders</span>
                                            </DropdownMenuItem>
                                        </div>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <div className="p-2">
                                            <DropdownMenuItem onClick={handleLogout} className="rounded-lg font-black italic uppercase tracking-tighter text-red-500 focus:bg-red-500 focus:text-white">
                                                <LogOut className="mr-3 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    onClick={() => navigate('/login')}
                                    premium
                                    className="rounded-full font-black italic uppercase tracking-tighter px-6 h-10 text-xs shadow-glow"
                                >
                                    LOGIN
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-secondary/10 backdrop-blur-md pt-24 pb-12 mt-40">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-primary italic tracking-tighter">ELECTRICI-TOYS</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Revolutionizing playtime with high-quality electric toys. We combine safety, innovation, and pure fun to create unforgettable experiences for kids of all ages.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Quick Links</h4>
                    <ul className="space-y-2 text-sm font-medium">
                        <li><Link to="/products" className="hover:text-primary transition-all">New Arrivals</Link></li>
                        <li><Link to="/products" className="hover:text-primary transition-all">Best Sellers</Link></li>
                        <li><Link to="/about" className="hover:text-primary transition-all">Our Story</Link></li>
                        <li><Link to="/contact" className="hover:text-primary transition-all">Support</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Categories</h4>
                    <ul className="space-y-2 text-sm font-medium">
                        <li><Link to="/products" className="hover:text-primary transition-all">Hoverboards</Link></li>
                        <li><Link to="/products" className="hover:text-primary transition-all">Electric Scooters</Link></li>
                        <li><Link to="/products" className="hover:text-primary transition-all">RC Cars & Tanks</Link></li>
                        <li><Link to="/products" className="hover:text-primary transition-all">Smart Robotics</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold uppercase text-xs tracking-widest text-primary">Newsletter</h4>
                    <p className="text-xs text-muted-foreground">Get updates on new releases and secret sales.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-background border rounded-lg px-3 py-2 text-xs flex-1 outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button size="sm">JOIN</Button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                <p>© 2026 ELECTRICI-TOYS. ENGINEERED FOR FUN.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary">Privacy Policy</a>
                    <a href="#" className="hover:text-primary">Terms of Service</a>
                    <a href="#" className="hover:text-primary">Refund Policy</a>
                </div>
            </div>
        </footer>
    );
}
