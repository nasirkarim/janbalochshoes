import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          {/* Notification Toast */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#111111',
                color: '#F7F3EB',
                border: '1px solid rgba(200, 164, 93, 0.4)',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />

          <div className="min-h-screen flex flex-col bg-white text-brand-dark selection:bg-brand-gold selection:text-white">
            {/* Announcement Banner */}
            <AnnouncementBar />

            {/* Navigation Header */}
            <Navbar />

            {/* Cart Slide-Over Drawer */}
            <CartDrawer />

            {/* Floating WhatsApp Contact Button */}
            <FloatingWhatsApp />

            {/* Application Main Content Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
