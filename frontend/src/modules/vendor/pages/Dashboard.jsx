import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Package,
    ShoppingCart,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Plus
} from 'lucide-react';
import { useVendorProductStore } from '../store/vendorProductStore';
import { useVendorOrderStore } from '../store/vendorOrderStore';
import { useVendorAnalyticsStore } from '../store/vendorAnalyticsStore';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import { Button } from '../../user/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../user/components/ui/badge';
import { format } from 'date-fns';

export default function VendorDashboard() {
    const { products } = useVendorProductStore();
    const { orders } = useVendorOrderStore();
    const { revenueData, getSummary, topProducts } = useVendorAnalyticsStore();
    const summary = getSummary();
    const navigate = useNavigate();

    const stats = [
        {
            label: 'Total Revenue',
            value: `₹${summary.totalRevenue.toLocaleString()}`,
            icon: TrendingUp,
            color: 'text-emerald-500',
            trend: '+12.5%',
            positive: true
        },
        {
            label: 'Total Orders',
            value: summary.totalOrders,
            icon: ShoppingCart,
            color: 'text-blue-500',
            trend: '+8.2%',
            positive: true
        },
        {
            label: 'Active Toys',
            value: products.length,
            icon: Package,
            color: 'text-amber-500',
            trend: '+2 new',
            positive: true
        },
        {
            label: 'Avg Order Value',
            value: `₹${Math.round(summary.avgOrderValue).toLocaleString()}`,
            icon: ShoppingBag,
            color: 'text-primary',
            trend: '-2.4%',
            positive: false
        },
    ];

    return (
        <div className="p-8 space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2 text-foreground">Overview</h1>
                    <p className="text-muted-foreground font-medium italic">Welcome back! Your toy empire is growing.</p>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="rounded-full font-bold uppercase tracking-widest text-xs border-secondary/20"
                        onClick={() => navigate('/vendor/analytics')}
                    >
                        View Full Reports
                    </Button>
                    <Button
                        onClick={() => navigate('/vendor/products/new')}
                        className="rounded-full font-black italic tracking-widest uppercase px-8 shadow-xl shadow-primary/20"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Toy
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-secondary/10 border border-secondary/20 rounded-[2rem] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon className="h-20 w-20 transform translate-x-4 -translate-y-4" />
                        </div>

                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-2xl bg-background border border-secondary/10 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black italic px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {stat.trend}
                            </div>
                        </div>

                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        <h3 className="text-3xl font-black italic tracking-tighter mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">Revenue Trends</h3>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-[8px] uppercase tracking-widest">Weekly</Badge>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    tickFormatter={(value) => `₹${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        fontSize: '12px',
                                        fontWeight: '900',
                                        textTransform: 'uppercase'
                                    }}
                                    itemStyle={{ color: 'var(--color-primary)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--color-primary)"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Best Sellers */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8">Best Selling Toys</h3>
                    <div className="space-y-6">
                        {topProducts.map((product, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="h-12 w-12 bg-background rounded-xl border border-secondary/10 flex items-center justify-center font-black italic text-primary group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black uppercase tracking-tight line-clamp-1">{product.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{product.sold} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black italic">₹{product.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-8 rounded-full text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">
                        View Product Analytics
                    </Button>
                </div>
            </div>

            {/* Recent Orders Mini Table */}
            <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Recent Orders</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/vendor/orders')}
                        className="text-[10px] font-black uppercase tracking-widest text-primary"
                    >
                        View All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-secondary/10">
                            <tr>
                                <th className="pb-4 text-left px-4">Order ID</th>
                                <th className="pb-4 text-left px-4">Customer</th>
                                <th className="pb-4 text-left px-4">Date</th>
                                <th className="pb-4 text-left px-4">Status</th>
                                <th className="pb-4 text-right px-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/10">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="group hover:bg-background/40 transition-colors">
                                    <td className="py-4 px-4 font-black italic tracking-tighter text-sm text-primary">{order.id}</td>
                                    <td className="py-4 px-4 text-xs font-bold uppercase">{order.customer}</td>
                                    <td className="py-4 px-4 text-[10px] font-bold text-muted-foreground uppercase">{format(new Date(order.date), 'MMM dd')}</td>
                                    <td className="py-4 px-4">
                                        <Badge variant="outline" className="text-[8px] uppercase tracking-[0.2em] px-2">{order.status}</Badge>
                                    </td>
                                    <td className="py-4 px-4 text-right font-black italic text-sm">₹{order.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
