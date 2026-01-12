import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layouts
import { UserLayout } from './modules/user/layout/UserLayout';
import AdminLayout from './modules/admin/layout/AdminLayout';

// Module: User Pages
import { Home } from './modules/user/pages/Home';
import { Products } from './modules/user/pages/Products';
import { ProductDetail } from './modules/user/pages/ProductDetail';
import { Cart } from './modules/user/pages/Cart';
import { Wishlist } from './modules/user/pages/Wishlist';
import { About } from './modules/user/pages/About';
import { Contact } from './modules/user/pages/Contact';
import { Gallery } from './modules/user/pages/Gallery';
import { Experience } from './modules/user/pages/Experience';
import { Login } from './modules/user/pages/Auth/Login';
import { Signup } from './modules/user/pages/Auth/Signup';
import { Checkout } from './modules/user/pages/Checkout';
import { MyOrders } from './modules/user/pages/MyOrders';
import { OrderSuccess } from './modules/user/pages/OrderSuccess';
import { ToastManager } from './modules/user/components/Toast';

// Module: Admin Pages
import AdminDashboard from './modules/admin/pages/AdminDashboard';
import ProductList from './modules/admin/pages/Products/ProductList';
import ProductForm from './modules/admin/pages/Products/ProductForm';
import OrderList from './modules/admin/pages/Orders/OrderList';
import OrderDetail from './modules/admin/pages/Orders/OrderDetail';
import Analytics from './modules/admin/pages/Analytics';
import Profile from './modules/admin/pages/Profile';
import Notifications from './modules/admin/pages/Notifications';
import AdminLogin from './modules/admin/pages/Auth/AdminLogin';
import AdminRegister from './modules/admin/pages/Auth/AdminRegister';

// Content Management
import { HomeContent } from './modules/admin/pages/Content/HomeContent';
import { AboutContent } from './modules/admin/pages/Content/AboutContent';

import { ContactContent } from './modules/admin/pages/Content/ContactContent';
import { ExperienceContent } from './modules/admin/pages/Content/ExperienceContent';
import { useContentStore } from './modules/admin/store/adminContentStore';

// Placeholder for missing components
const Placeholder = ({ title, emoji = '🚧' }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center p-8">
    <span className="text-6xl animate-bounce">{emoji}</span>
    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-primary">{title}</h2>
    <p className="text-muted-foreground font-medium">This page is currently under construction.</p>
  </div>
);

const AboutContentEditor = () => <AboutContent />;
const ContactContentEditor = () => <ContactContent />;
const ExperienceContentEditor = () => <ExperienceContent />;

function App() {
  return (
    <ToastManager>
      <Router>
        <Routes>
          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="analytics" element={<Analytics />} />

            {/* Content Management */}
            <Route path="content/home" element={<HomeContent />} />
            <Route path="content/about" element={<AboutContentEditor />} />
            <Route path="content/contact" element={<ContactContentEditor />} />
            <Route path="content/experience" element={<ExperienceContentEditor />} />

            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<UserLayout><Outlet /></UserLayout>}>
            <Route index element={<Experience />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="experience" element={<Experience />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="*" element={<Placeholder title="404 - Not Found" emoji="😵" />} />
          </Route>
        </Routes>
      </Router>
    </ToastManager>
  );
}

export default App;
