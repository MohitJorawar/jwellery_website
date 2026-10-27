import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ShowroomModal } from './components/ShowroomModal';
import { WhatsAppButton } from './components/WhatsAppButton';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Blogs } from './pages/Blogs';
import { Team } from './pages/Team';
import { Licenses } from './pages/Licenses';
import { StyleGuide } from './pages/StyleGuide';
import { Changelog } from './pages/Changelog';
import { NotFound } from './pages/NotFound';
import { getProductBySlug } from './data/glymoraProducts';

export function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSearch, setActiveSearch] = useState('');
  const [isShowroomModalOpen, setIsShowroomModalOpen] = useState(false);

  // Sync with browser back/forward buttons and initial URL
  useEffect(() => {
    const initialPath = window.location.pathname;
    let initialView = 'home';
    let initialProduct = null;

    if (initialPath.startsWith('/product/')) {
      const slug = initialPath.replace('/product/', '');
      initialProduct = getProductBySlug(slug);
      initialView = 'product';
    } else if (initialPath.length > 1) {
      const viewName = initialPath.replace('/', '');
      if (['shop', 'about', 'contact', 'wishlist', 'checkout', 'login', 'admin', 'blogs', 'blog', 'team', 'licenses', 'styleguide', 'style-guide', 'changelog', '404'].includes(viewName)) {
        if (viewName === 'blog') initialView = 'blogs';
        else if (viewName === 'style-guide') initialView = 'styleguide';
        else initialView = viewName;
      }
    }

    setCurrentView(initialView);
    if (initialProduct) setSelectedProduct(initialProduct);

    window.history.replaceState(
      { view: initialView, product: initialProduct },
      '',
      initialPath
    );

    const handlePopState = (e) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
        setSelectedProduct(e.state.product || null);
        if (e.state.category !== undefined) setActiveCategory(e.state.category);
        if (e.state.search !== undefined) setActiveSearch(e.state.search);
      } else {
        const path = window.location.pathname;
        if (path.startsWith('/product/')) {
          const slug = path.replace('/product/', '');
          setSelectedProduct(getProductBySlug(slug));
          setCurrentView('product');
        } else if (path === '/about') {
          setCurrentView('about');
          setSelectedProduct(null);
        } else if (path === '/shop') {
          setCurrentView('shop');
          setSelectedProduct(null);
        } else if (path === '/contact') {
          setCurrentView('contact');
          setSelectedProduct(null);
        } else if (path === '/blogs' || path === '/blog') {
          setCurrentView('blogs');
          setSelectedProduct(null);
        } else if (path === '/team') {
          setCurrentView('team');
          setSelectedProduct(null);
        } else if (path === '/licenses') {
          setCurrentView('licenses');
          setSelectedProduct(null);
        } else if (path === '/styleguide' || path === '/style-guide') {
          setCurrentView('styleguide');
          setSelectedProduct(null);
        } else if (path === '/changelog') {
          setCurrentView('changelog');
          setSelectedProduct(null);
        } else if (path === '/404') {
          setCurrentView('404');
          setSelectedProduct(null);
        } else {
          setCurrentView('home');
          setSelectedProduct(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  const handleNavigate = (view, options = {}) => {
    const normalizedView = view === 'blog' ? 'blogs' : view;
    if (options.search !== undefined) setActiveSearch(options.search);
    if (options.category !== undefined) setActiveCategory(options.category);
    setSelectedProduct(null);
    setCurrentView(normalizedView);
    const path = normalizedView === 'home' ? '/' : `/${normalizedView}`;
    if (window.location.pathname !== path) {
      window.history.pushState(
        { view: normalizedView, product: null, category: options.category, search: options.search },
        '',
        path
      );
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    const slug = product.slug || product.id || 'product';
    const path = `/product/${slug}`;
    if (window.location.pathname !== path) {
      window.history.pushState(
        { view: 'product', product },
        '',
        path
      );
    }
  };

  const handleBack = () => {
    if (window.history.state && window.history.length > 1) {
      window.history.back();
    } else {
      handleNavigate('home');
    }
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setActiveSearch('');
  };

  const handleOrderSuccess = (order) => {
    setConfirmedOrder(order);
    setCurrentView('success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Dynamic View Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onSelectCategory={(cat) => {
              handleSelectCategory(cat);
              handleNavigate('shop');
            }}
            onSelectProduct={handleSelectProduct}
            onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
          />
        )}

        {currentView === 'shop' && (
          <Shop
            initialCategory={activeCategory}
            initialSearch={activeSearch}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'product' && (
          <ProductDetail
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            onBack={handleBack}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            onOrderSuccess={handleOrderSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'success' && (
          <OrderSuccess
            order={confirmedOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'wishlist' && (
          <Wishlist
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <About
            onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'contact' && (
          <Contact
            onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
          />
        )}

        {currentView === 'blogs' && (
          <Blogs
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'team' && (
          <Team
            onNavigate={handleNavigate}
            onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
          />
        )}

        {currentView === 'licenses' && (
          <Licenses
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'styleguide' && (
          <StyleGuide
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'changelog' && (
          <Changelog
            onNavigate={handleNavigate}
          />
        )}

        {currentView === '404' && (
          <NotFound
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'login' && (
          <Login
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Cart Slide-Out Drawer */}
      <CartDrawer
        onNavigateCheckout={() => handleNavigate('checkout')}
        onContinueShopping={() => handleNavigate('shop')}
      />

      {/* Showroom Appointment Modal */}
      <ShowroomModal
        isOpen={isShowroomModalOpen}
        onClose={() => setIsShowroomModalOpen(false)}
      />

      {/* WhatsApp VIP Concierge Floating Button */}
      {currentView !== 'home' && <WhatsAppButton />}

      {/* Global Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
