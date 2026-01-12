import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    BarChart2,
    PieChart as PieChartIcon,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Download
} from 'lucide-react';
import { useAdminAnalyticsStore } from '../store/adminAnalyticsStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { Button } from '../../user/components/ui/button';
import { Badge } from '../../user/components/ui/badge';

export default function Analytics() {
    const { revenueData, categorySales, topProducts, getSummary } = useAdminAnalyticsStore();
    const summary = getSummary();
    const [timeRange, setTimeRange] = useState('Last 7 Days');

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="p-8 space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Detailed Analytics</h1>
                    <p className="text-muted-foreground font-medium italic">Deep dive into your store's performance metrics</p>
                </div>
                <div className="flex gap-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-secondary/10 border border-secondary/20 rounded-full px-6 py-3 outline-none font-bold uppercase tracking-widest text-[10px] cursor-pointer"
                    >
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                    </select>
                    <Button variant="outline" className="rounded-full font-bold uppercase tracking-widest text-[10px] border-secondary/20">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Performance Highlight */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8 space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">Order Volume vs Revenue</h3>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    yAxisId="left"
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    tick={{ fontSize: 10, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        fontWeight: '900'
                                    }}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--color-primary)"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#10b981"
                                    strokeWidth={4}
                                    dot={{ fill: '#10b981', r: 6, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8 space-y-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Sales by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categorySales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categorySales.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                        {categorySales.map((cat, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{cat.name}</span>
                                </div>
                                <span className="text-xs font-black">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Sales Performance */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8">Top Toys Performance</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topProducts} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 9, fontWeight: 900, fill: 'var(--color-muted-foreground)' }}
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="sold" fill="var(--color-primary)" radius={[0, 10, 10, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-[2.5rem] p-8 space-y-6">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Key Insights</h3>
                    <div className="space-y-6">
                        <div className="p-6 bg-background/40 border border-secondary/10 rounded-2xl flex gap-6 items-center">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight italic">Hoverboards leading sales</p>
                                <p className="text-xs text-muted-foreground italic mt-1">45% of total revenue this week comes from this category. Consider stock replenishment.</p>
                            </div>
                        </div>
                        <div className="p-6 bg-background/40 border border-secondary/10 rounded-2xl flex gap-6 items-center">
                            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <BarChart2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight italic">Weekend Surge Detected</p>
                                <p className="text-xs text-muted-foreground italic mt-1">Saturday is consistently your highest performing day. Plan promotions accordingly.</p>
                            </div>
                        </div>
                        <div className="p-6 bg-background/40 border border-secondary/10 rounded-2xl flex gap-6 items-center">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight italic">Optimal Order Value</p>
                                <p className="text-xs text-muted-foreground italic mt-1">Your average order value is ₹{Math.round(summary.avgOrderValue).toLocaleString()}. Upsell more kits!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
