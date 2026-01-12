import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useAdminProductStore } from '../../store/adminProductStore';
import { Badge } from '../../../user/components/ui/badge';
import { Button } from '../../../user/components/ui/button';
import {
    Search,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Filter,
    ArrowUpDown,
    Eye,
    Package
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '../../../user/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const { products, deleteProduct, toggleStatus } = useAdminProductStore();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category));
        return ['All', ...Array.from(cats)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
            const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [products, searchQuery, statusFilter, categoryFilter]);

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Inventory</h1>
                    <p className="text-muted-foreground font-medium italic">Manage your toy collection ({products.length} products)</p>
                </div>
                <Button
                    onClick={() => navigate('/admin/products/new')}
                    className="rounded-full font-black italic tracking-widest uppercase px-8 py-6 h-auto shadow-xl shadow-primary/20 group transform hover:scale-105 transition-all"
                >
                    <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add New Toy
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="bg-secondary/10 p-4 rounded-3xl border border-secondary/20 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="SEARCH TOYS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background border border-secondary/20 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold uppercase tracking-widest text-xs"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-background border border-secondary/20 rounded-2xl px-6 py-3 outline-none font-bold uppercase tracking-widest text-xs cursor-pointer w-full sm:w-auto"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat} CATEGORY</option>
                        ))}
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-background border border-secondary/20 rounded-2xl px-6 py-3 outline-none font-bold uppercase tracking-widest text-xs cursor-pointer w-full sm:w-auto"
                    >
                        <option value="All">ALL STATUS</option>
                        <option value="Active">ACTIVE</option>
                        <option value="Draft">DRAFT</option>
                        <option value="Out of Stock">OUT OF STOCK</option>
                    </select>
                </div>
            </div>

            {/* Product Table */}
            <div className="bg-secondary/5 rounded-[2.5rem] border border-secondary/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-secondary/10">
                            <tr>
                                <th className="px-8 py-6">Product</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Price</th>
                                <th className="px-8 py-6">Stock</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/10">
                            <AnimatePresence mode='popLayout'>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group hover:bg-secondary/10 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 bg-background rounded-2xl overflow-hidden border border-secondary/20 flex-shrink-0">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center bg-primary/10">
                                                            <Package className="h-6 w-6 text-primary" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold uppercase italic tracking-tight">{product.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">ID: {product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge variant="secondary" className="bg-secondary/30 text-[10px] uppercase tracking-widest">{product.category}</Badge>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-black italic">₹{product.price.toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <p className={cn(
                                                    "font-bold text-sm",
                                                    product.stock < 10 ? "text-red-500" : "text-foreground"
                                                )}>{product.stock} pcs</p>
                                                <div className="w-24 h-1 bg-secondary/20 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            product.stock < 10 ? "bg-red-500" : "bg-emerald-500"
                                                        )}
                                                        style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Badge
                                                variant={product.status === 'Active' ? 'success' : 'outline'}
                                                className="text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => toggleStatus(product.id)}
                                            >
                                                {product.status}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/20">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-secondary/20">
                                                    <DropdownMenuItem onClick={() => navigate(`/product/${product.id}`)} className="rounded-xl px-4 py-3 cursor-pointer">
                                                        <Eye className="mr-3 h-4 w-4" /> View Store
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => navigate(`/admin/products/${product.id}/edit`)} className="rounded-xl px-4 py-3 cursor-pointer">
                                                        <Edit className="mr-3 h-4 w-4" /> Edit Toy
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-secondary/10" />
                                                    <DropdownMenuItem
                                                        onClick={() => deleteProduct(product.id)}
                                                        className="text-red-500 focus:text-red-500 focus:bg-red-500/10 rounded-xl px-4 py-3 cursor-pointer"
                                                    >
                                                        <Trash2 className="mr-3 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center">
                        <div className="h-20 w-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">No toys found</h3>
                        <p className="text-muted-foreground italic mt-2">Try adjusting your filters or search query.</p>
                        <Button
                            variant="ghost"
                            className="mt-6 text-primary font-bold uppercase tracking-widest text-xs"
                            onClick={() => {
                                setSearchQuery('');
                                setStatusFilter('All');
                                setCategoryFilter('All');
                            }}
                        >
                            Reset All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
