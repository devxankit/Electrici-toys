import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, BarChart2, User, Bell, LogOut, X } from 'lucide-react';
import { cn } from "../../../lib/utils";

export function Sidebar({ isOpen, onClose, onLogout }) {
    const navItems = [
        { name: 'DASHBOARD', icon: LayoutDashboard, path: '/vendor' },
        { name: 'PRODUCTS', icon: Package, path: '/vendor/products' },
        { name: 'ORDERS', icon: ShoppingBag, path: '/vendor/orders' },
        { name: 'ANALYTICS', icon: BarChart2, path: '/vendor/analytics' },
        { name: 'PROFILE', icon: User, path: '/vendor/profile' },
        { name: 'NOTIFICATIONS', icon: Bell, path: '/vendor/notifications' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside className={cn(
                "fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-secondary/20 z-50 transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                        <span className="text-3xl font-black text-primary tracking-tighter italic uppercase">VENDOR HUB</span>
                        <button onClick={onClose} className="lg:hidden p-2">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/vendor'}
                                onClick={() => window.innerWidth < 1024 && onClose()}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-4 px-6 py-4 rounded-2xl font-black italic uppercase tracking-widest text-xs transition-all duration-300",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30 scale-105"
                                        : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground hover:scale-[1.02]"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
                                        {item.name}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="pt-8 mt-auto">
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-4 px-6 py-4 w-full rounded-2xl font-black italic uppercase tracking-widest text-xs text-red-500 hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="h-5 w-5" />
                            LOG OUT
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
