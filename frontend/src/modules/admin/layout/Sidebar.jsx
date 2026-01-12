import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, BarChart2, User, Bell, LogOut, X, Layout, FileText, Info, Phone, Play } from 'lucide-react';
import { cn } from "../../../lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../user/components/ui/sheet';

export function Sidebar({ isOpen, onClose, onLogout }) {
    const navItems = [
        { name: 'DASHBOARD', icon: LayoutDashboard, path: '/admin' },
        { name: 'PRODUCTS', icon: Package, path: '/admin/products' },
        { name: 'ORDERS', icon: ShoppingBag, path: '/admin/orders' },
        { name: 'ANALYTICS', icon: BarChart2, path: '/admin/analytics' },
        {
            name: 'CONTENT MANAGEMENT',
            icon: Layout,
            path: '/admin/content',
            isHeader: true
        },
        { name: 'HOME PAGE', icon: FileText, path: '/admin/content/home', indent: true },
        { name: 'ABOUT PAGE', icon: Info, path: '/admin/content/about', indent: true },
        { name: 'CONTACT PAGE', icon: Phone, path: '/admin/content/contact', indent: true },
        { name: 'EXPERIENCE', icon: Play, path: '/admin/content/experience', indent: true },
        { name: 'PROFILE', icon: User, path: '/admin/profile', isHeader: true },
        { name: 'NOTIFICATIONS', icon: Bell, path: '/admin/notifications' },
    ];

    const SidebarContent = ({ mobile = false }) => (
        <div className={cn("flex flex-col h-full", mobile ? "p-0" : "p-8")}>
            {!mobile && (
                <div className="flex items-center justify-between mb-12">
                    <span className="text-3xl font-black text-primary tracking-tighter italic uppercase">ADMIN PANEL</span>
                </div>
            )}

            <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                {navItems.map((item) => (
                    item.isHeader ? (
                        <div key={item.name} className="pt-4 pb-2 px-6 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-50">
                            {item.name}
                        </div>
                    ) : (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => mobile && onClose()}
                            className={({ isActive }) => cn(
                                "flex items-center gap-4 px-6 py-3 rounded-2xl font-black italic uppercase tracking-widest text-[10px] transition-all duration-300",
                                item.indent && "ml-4 scale-95 origin-left",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/30 scale-105"
                                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground hover:scale-[1.02]"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn("h-4 w-4", isActive && "animate-pulse")} />
                                    {item.name}
                                </>
                            )}
                        </NavLink>
                    )
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
    );

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="w-[300px] border-secondary/20 p-8 pt-12">
                    <SheetHeader className="mb-8">
                        <SheetTitle className="text-left text-3xl font-black text-primary tracking-tighter italic uppercase">Admin Panel</SheetTitle>
                    </SheetHeader>
                    <SidebarContent mobile />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-secondary/20 z-30">
                <SidebarContent />
            </aside>
        </>
    );
}
