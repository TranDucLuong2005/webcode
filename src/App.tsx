/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './client/context/AuthContext.tsx';
import { CartProvider } from './client/context/CartContext.tsx';
import Navbar from './client/components/Navbar.tsx';
import Footer from './client/components/Footer.tsx';
import Home from './client/pages/Home.tsx';
import Products from './client/pages/Products.tsx';
import Login from './client/pages/Login.tsx';
import Register from './client/pages/Register.tsx';
import ProductDetail from './client/pages/ProductDetail.tsx';
import Cart from './client/pages/Cart.tsx';
import Checkout from './client/pages/Checkout.tsx';
import Profile from './client/pages/Profile.tsx';
import AdminDashboard from './client/pages/AdminDashboard.tsx';
import PrivacyPolicy from './client/pages/PrivacyPolicy.tsx';
import TermsOfService from './client/pages/TermsOfService.tsx';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
