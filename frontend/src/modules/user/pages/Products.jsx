import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../../../data/products';
import { QuickView } from '../components/QuickView';
import { Button } from '../components/ui/button';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

export function Products() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [sortBy, setSortBy] = useState("featured");

    const filteredProducts = useMemo(() => {
        let result = selectedCategory === "All"
            ? products
            : products.filter(p => p.category === selectedCategory);

        if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
        if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

        return result;
    }, [selectedCategory, sortBy]);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="flex flex-col gap-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-primary leading-none mb-2">SHOP ALL</h1>
                        <p className="text-base md:text-lg text-muted-foreground font-medium italic">Discover our full range of electric excitement.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground mr-2">
                            <SlidersHorizontal className="h-4 w-4" /> SORT BY:
                        </div>
                        <select
                            className="bg-transparent border-b-2 border-primary font-black italic tracking-tighter outline-none cursor-pointer text-sm md:text-base"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">FEATURED</option>
                            <option value="price-low">PRICE: LOW TO HIGH</option>
                            <option value="price-high">PRICE: HIGH TO LOW</option>
                            <option value="rating">TOP RATED</option>
                        </select>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-nowrap overflow-x-auto pb-4 gap-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    <Button
                        variant={selectedCategory === "All" ? "default" : "outline"}
                        className="rounded-full font-bold px-6 border-2 flex-shrink-0"
                        onClick={() => setSelectedCategory("All")}
                    >
                        ALL TOYS
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            className="rounded-full font-bold px-6 border-2 flex-shrink-0"
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat.toUpperCase()}
                        </Button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard
                                    product={product}
                                    onQuickView={() => handleQuickView(product)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center space-y-4">
                        <div className="text-6xl text-muted-foreground opacity-20">🔍</div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">No toys found</h3>
                        <p className="text-muted-foreground italic">Try a different category or search term.</p>
                        <Button variant="outline" className="rounded-full border-2" onClick={() => setSelectedCategory("All")}>CLEAR FILTERS</Button>
                    </div>
                )}
            </div>

            <QuickView
                product={selectedProduct}
                open={isQuickViewOpen}
                onOpenChange={setIsQuickViewOpen}
            />
        </div>
    );
}
