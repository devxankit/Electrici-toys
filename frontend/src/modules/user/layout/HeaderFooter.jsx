import React from 'react';
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

export function Header() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-primary tracking-tighter italic">ELECTRICI-TOYS</span>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
                        <Link to="/home" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/products" className="hover:text-primary transition-colors">Shop All</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex items-center bg-secondary/50 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search toys..."
                            className="bg-transparent border-none outline-none text-sm px-2 w-32 focus:w-48 transition-all"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Heart className="h-5 w-5" />
                    </Button>

                    <CartDrawer />

                    <ThemeToggle />

                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <img
                                        src={user?.avatar}
                                        alt={user?.name}
                                        className="h-8 w-8 rounded-full object-cover border-2 border-primary/20"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/home')}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/orders')}>
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <span>My Orders</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={() => navigate('/login')}
                            className="rounded-full font-bold px-6"
                        >
                            LOGIN
                        </Button>
                    )}
                </div>
            </div>
        </header >
    );
}

export function Footer() {
    return (
        <footer className="w-full border-t bg-secondary/30 py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
