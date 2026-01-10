import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layouts
import { UserLayout } from './modules/user/layout/UserLayout';
import VendorLayout from './modules/vendor/layout/VendorLayout';

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

// Module: Vendor Pages
import VendorDashboard from './modules/vendor/pages/Dashboard';
import ProductList from './modules/vendor/pages/Products/ProductList';
import ProductForm from './modules/vendor/pages/Products/ProductForm';
import OrderList from './modules/vendor/pages/Orders/OrderList';
import OrderDetail from './modules/vendor/pages/Orders/OrderDetail';
import Analytics from './modules/vendor/pages/Analytics';
import Profile from './modules/vendor/pages/Profile';
import Notifications from './modules/vendor/pages/Notifications';
import VendorLogin from './modules/vendor/pages/Auth/VendorLogin';
import VendorRegister from './modules/vendor/pages/Auth/VendorRegister';

// Placeholder components with better styling
const Placeholder = ({ title, emoji = "🚀" }) => (
  <div className="container mx-auto px-4 py-32 text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-9xl mb-8"
    >
      {emoji}
    </motion.div>
    <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase italic tracking-tighter text-primary">{title}</h1>
    <p className="text-xl text-muted-foreground font-medium italic">We're building something electric. Stay tuned!</p>
  </div>
);

function App() {
  return (
    <ToastManager>
      <Router>
        <Routes>
          {/* Vendor Auth Routes */}
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/register" element={<VendorRegister />} />

          {/* Vendor Routes */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<VendorDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="analytics" element={<Analytics />} />
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
