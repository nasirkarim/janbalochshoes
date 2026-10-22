import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-brand-dark/70 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-2xl bg-white shadow-2xl rounded-lg overflow-hidden border border-brand-border animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3.5 border-b border-brand-border bg-brand-cream/30">
          <Search className="w-5 h-5 text-brand-gold mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search footwear by style, leather, or category..."
            className="w-full bg-transparent border-none outline-none text-brand-dark text-base placeholder:text-brand-muted/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-brand-muted hover:text-brand-dark"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-3 py-1 text-xs uppercase tracking-wider font-semibold text-brand-muted hover:text-brand-dark"
          >
            ESC
          </button>
        </form>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-brand-border/60">
          {query.trim().length > 1 && results.length === 0 && (
            <div className="py-8 text-center text-brand-muted">
              <p className="text-sm">No footwear matching "{query}" was found.</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="mt-3 text-xs font-semibold text-brand-gold uppercase tracking-wider hover:underline"
              >
                Browse All Collections
              </button>
            </div>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product.slug)}
              className="flex items-center space-x-4 py-3 hover:bg-brand-cream/40 px-2 rounded cursor-pointer transition-colors group"
            >
              <div className="w-14 h-14 rounded overflow-hidden bg-brand-cream shrink-0 border border-brand-border/80">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/men/men-footwear-01.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-dark truncate group-hover:text-brand-gold transition-colors">
                  {product.name}
                </p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-xs uppercase tracking-wider text-brand-muted">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
            </div>
          ))}

          {query.trim().length > 1 && results.length > 0 && (
            <div className="pt-3 text-center">
              <button
                onClick={handleSubmit}
                className="text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-brand-dark inline-flex items-center"
              >
                View all results for "{query}" <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          )}

          {query.trim().length <= 1 && (
            <div className="py-6 px-2 text-xs text-brand-muted">
              <p className="font-semibold uppercase tracking-wider text-brand-dark mb-2">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Balochi', 'Peshawari', 'Khussa', 'Kaptaan', 'Oxford', 'Sneakers', 'Sandals', 'Festive'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-brand-cream text-brand-dark rounded-full text-xs hover:bg-brand-gold hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
