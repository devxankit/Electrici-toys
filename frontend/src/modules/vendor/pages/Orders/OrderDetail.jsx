import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVendorOrderStore } from '../../store/vendorOrderStore';
import { Button } from '../../../user/components/ui/button';
import { Badge } from '../../../user/components/ui/badge';
import {
    ArrowLeft,
    Truck,
    Package,
    CreditCard,
    MapPin,
    Calendar,
    Phone,
    Mail,
    CheckCircle,
    Clock,
    AlertCircle,
    Printer
} from 'lucide-react';
import { format } from 'date-fns';

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOrderById, updateOrderStatus } = useVendorOrderStore();
    const order = getOrderById(id);

    if (!order) {
        return (
            <div className="p-8 text-center py-20">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Order not found</h2>
                <Button onClick={() => navigate('/vendor/orders')} className="mt-4">Back to Orders</Button>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="h-6 w-6 text-amber-500" />;
            case 'Processing': return <AlertCircle className="h-6 w-6 text-blue-500" />;
            case 'Shipped': return <Truck className="h-6 w-6 text-primary" />;
            case 'Delivered': return <CheckCircle className="h-6 w-6 text-emerald-500" />;
            default: return null;
        }
    };

    const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const currentStepIndex = statusSteps.indexOf(order.status);

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate('/vendor/orders')}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Order {order.id}</h1>
                            <Badge variant="success" className="bg-primary/20 text-primary border-primary/20 font-black italic uppercase tracking-widest text-[10px]">
                                {order.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-medium italic">Placed on {format(new Date(order.date), 'MMMM dd, yyyy • hh:mm a')}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full font-bold uppercase tracking-widest text-xs border-secondary/20">
                        <Printer className="mr-2 h-4 w-4" /> Print Invoice
                    </Button>
                    <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-primary text-primary-foreground font-black italic uppercase tracking-widest text-xs px-6 py-3 rounded-full outline-none cursor-pointer shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                    >
                        {statusSteps.map(step => (
                            <option key={step} value={step}>MARK AS {step}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Order Stepper */}
            <div className="bg-secondary/10 p-12 rounded-[2.5rem] border border-secondary/20">
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary/20 -translate-y-1/2 z-0" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                        style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                    />

                    {statusSteps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isActive = index === currentStepIndex;

                        return (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-4">
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30' : 'bg-background border-2 border-secondary/20 text-muted-foreground'
                                    }`}>
                                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                                </div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {step}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                            <Package className="h-5 w-5 text-primary" /> Order Items
                        </h3>
                        <div className="space-y-6">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex gap-6 items-center">
                                    <div className="h-20 w-20 bg-background rounded-2xl border border-secondary/20 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold uppercase italic tracking-tight text-lg">{item.name}</h4>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="text-xl font-black italic tracking-tighter">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-dashed border-secondary/20 space-y-3">
                            <div className="flex justify-between text-sm uppercase tracking-widest font-bold text-muted-foreground">
                                <span>Subtotal</span>
                                <span>₹{order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm uppercase tracking-widest font-bold text-green-500">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black italic tracking-tighter pt-4 border-t border-secondary/20">
                                <span>Total Amount</span>
                                <span className="text-primary">₹{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer & Shipping Info */}
                <div className="space-y-8">
                    <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20 space-y-6">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-primary" /> Delivery Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 bg-background rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expected</p>
                                    <p className="font-bold uppercase tracking-tight italic">Jan 15, 2026</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Customer</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 bg-primary/20 rounded-2xl flex items-center justify-center font-black italic text-primary">
                                            {order.customer.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase tracking-tight italic">{order.customer}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold">{order.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shipping Address</p>
                                    <p className="text-sm font-medium italic text-muted-foreground leading-relaxed">{order.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20 space-y-6">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-primary" /> Payment
                        </h3>
                        <div className="flex justify-between items-center bg-background/50 p-4 rounded-2xl border border-secondary/10">
                            <div className="flex items-center gap-3">
                                {order.paymentMethod === 'card' ? <CreditCard className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
                                <span className="font-bold uppercase tracking-widest text-xs">{order.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery'}</span>
                            </div>
                            <Badge variant="success" className="text-[8px] uppercase tracking-widest">PAID</Badge>
                        </div>
                    </div>

                    <Button className="w-full h-14 rounded-full font-black italic tracking-widest uppercase shadow-xl shadow-primary/10">
                        Contact Customer
                    </Button>
                </div>
            </div>
        </div>
    );
}
