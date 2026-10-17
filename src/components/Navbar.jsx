import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronRight, Phone, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchBar } from './SearchBar';
import { DISPLAY_PHONE } from '../utils/whatsapp';

export const Navbar = () => {
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All (100+)', path: '/shop' },
    { name: "Men's Collection", path: '/shop?audience=men' },
    { name: "Women's Collection", path: '/shop?audience=women' },
    { name: 'Balochi Heritage', path: '/shop?category=balochi-traditional', highlight: true },
    { name: 'Peshawari Chappal', path: '/shop?category=mens-chappal' },
    { name: "Women's Khussa", path: '/shop?category=womens-khussa' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/' && !location.search;
    return `${location.pathname}${location.search}` === path;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-brand-border'
            : 'bg-white py-3.5 border-b border-brand-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center xl:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-brand-dark hover:text-brand-gold focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo Wordmark */}
            <Link to="/" className="flex flex-col items-center group text-center shrink-0">
              <span className="font-serif text-lg sm:text-2xl font-black tracking-widest text-brand-dark group-hover:text-brand-gold transition-colors uppercase">
                JAN BALOCH
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-brand-gold -mt-1 group-hover:text-brand-dark transition-colors">
                SHOES STORE
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] 2xl:text-xs uppercase tracking-wider font-semibold py-1 transition-colors relative flex items-center space-x-1 ${
                    isActiveLink(link.path)
                      ? 'text-brand-gold font-bold'
                      : link.highlight
                      ? 'text-amber-700 hover:text-brand-gold'
                      : 'text-brand-dark hover:text-brand-gold'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3 h-3 text-brand-gold" />}
                  <span>{link.name}</span>
                  {isActiveLink(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons (Search, Wishlist, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors focus:outline-none"
                aria-label="Search 100+ footwear styles"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative focus:outline-none"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="p-1.5 text-brand-dark hover:text-brand-gold transition-colors relative focus:outline-none"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-dark text-brand-gold text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-brand-gold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Live Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-dark/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-50 flex flex-col justify-between overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                <Link to="/" className="text-left" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-serif text-xl font-bold tracking-wider text-brand-dark uppercase block">
                    JAN BALOCH
                  </span>
                  <span className="text-[8px] tracking-[0.25em] uppercase font-semibold text-brand-gold">
                    SHOES STORE
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-dark"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2.5 rounded bg-brand-surface border border-brand-border text-xs text-brand-muted"
                >
                  <Search className="w-4 h-4 text-brand-gold" />
                  <span>Search 100+ Pakistani footwear styles...</span>
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between py-3 px-2 text-xs uppercase tracking-wider font-semibold border-b border-brand-border/40 ${
                      isActiveLink(link.path)
                        ? 'text-brand-gold font-bold'
                        : 'text-brand-dark hover:text-brand-gold'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      {link.highlight && <Sparkles className="w-3.5 h-3.5 text-brand-gold" />}
                      <span>{link.name}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-muted/60" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="p-6 bg-brand-surface border-t border-brand-border space-y-3">
              <div className="text-xs text-brand-muted">
                Direct WhatsApp Support:
              </div>
              <a
                href="https://wa.me/923315971035"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm font-semibold text-brand-dark hover:text-brand-gold"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
