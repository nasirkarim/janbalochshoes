import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, X, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const initialCategory = searchParams.get('category') || 'all';
  const initialAudience = searchParams.get('audience') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAudience, setSelectedAudience] = useState(initialAudience);
  const [selectedStyle, setSelectedStyle] = useState('all'); // all, traditional, contemporary
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);
  const [priceRange, setPriceRange] = useState(10000);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const aud = searchParams.get('audience');
    if (aud) setSelectedAudience(aud);
    const q = searchParams.get('search');
    if (q) setSearchTerm(q);
    const s = searchParams.get('sort');
    if (s) setSortBy(s);
  }, [searchParams]);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    setVisibleCount(12);
    const newParams = new URLSearchParams(searchParams);
    if (catSlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catSlug);
    }
    setSearchParams(newParams);
  };

  const handleAudienceChange = (aud) => {
    setSelectedAudience(aud);
    setVisibleCount(12);
    const newParams = new URLSearchParams(searchParams);
    if (aud === 'all') {
      newParams.delete('audience');
    } else {
      newParams.set('audience', aud);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedAudience('all');
    setSelectedStyle('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSearchTerm('');
    setSortBy('featured');
    setPriceRange(10000);
    setOnlyBestsellers(false);
    setOnlyNewArrivals(false);
    setVisibleCount(12);
    setSearchParams({});
  };

  // Available filter chips
  const allSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const allColors = ['Black', 'Tan', 'Brown', 'Gold', 'Silver', 'Mustard', 'White', 'Red', 'Green'];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Audience filter (Men / Women)
      if (selectedAudience !== 'all' && product.audience !== selectedAudience) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'balochi-traditional') {
          if (!product.isBalochi && product.category !== 'balochi-traditional') return false;
        } else if (selectedCategory === 'festive-collection') {
          if (!product.isFestive && product.category !== 'festive-collection') return false;
        } else if (selectedCategory === 'new-arrivals') {
          if (!product.isNewArrival) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Style filter (Traditional vs Contemporary)
      if (selectedStyle !== 'all' && product.style !== selectedStyle) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all') {
        const sizeNum = Number(selectedSize);
        if (!product.sizes || !product.sizes.includes(sizeNum)) {
          return false;
        }
      }

      // Color filter
      if (selectedColor !== 'all') {
        const cLower = selectedColor.toLowerCase();
        const hasColor = product.colors && product.colors.some(col => col.toLowerCase().includes(cLower));
        if (!hasColor) return false;
      }

      // Search keyword filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
          (product.colors && product.colors.some(c => c.toLowerCase().includes(q)));
        if (!matches) return false;
      }

      // Price slider
      if (product.price > priceRange) {
        return false;
      }

      // Highlights
      if (onlyBestsellers && !product.isBestseller) return false;
      if (onlyNewArrivals && !product.isNewArrival) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedAudience,
    selectedStyle,
    selectedSize,
    selectedColor,
    searchTerm,
    sortBy,
    priceRange,
    onlyBestsellers,
    onlyNewArrivals,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-brand-surface border-b border-brand-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
            100+ Authentic Handcrafted Styles
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark mt-2">
            The Pakistani Footwear Collection
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto mt-2 font-light">
            Discover handcrafted Peshawari chappals, authentic Balochi Chawat footwear, bridal khussas, executive formal leathers, and modern everyday sneakers.
          </p>

          {/* Gender / Audience Quick Tabs */}
          <div className="inline-flex rounded-full bg-white p-1 border border-brand-border shadow-sm mt-6">
            <button
              onClick={() => handleAudienceChange('all')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                selectedAudience === 'all'
                  ? 'bg-brand-dark text-brand-gold shadow'
                  : 'text-brand-dark hover:text-brand-gold'
              }`}
            >
              All Footwear ({PRODUCTS.length})
            </button>
            <button
              onClick={() => handleAudienceChange('men')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                selectedAudience === 'men'
                  ? 'bg-brand-dark text-brand-gold shadow'
                  : 'text-brand-dark hover:text-brand-gold'
              }`}
            >
              Men & Boys (50)
            </button>
            <button
              onClick={() => handleAudienceChange('women')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                selectedAudience === 'women'
                  ? 'bg-brand-dark text-brand-gold shadow'
                  : 'text-brand-dark hover:text-brand-gold'
              }`}
            >
              Women & Girls (50)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          {/* Live Search */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, Balochi, khussa, or color..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-brand-surface border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 bg-brand-surface border border-brand-border rounded-sm text-brand-dark"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>Filter Options</span>
            </button>

            {/* Style Selector */}
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="text-xs py-2 px-3 bg-brand-surface border border-brand-border rounded-sm text-brand-dark focus:outline-none focus:border-brand-gold font-medium cursor-pointer"
            >
              <option value="all">All Styles</option>
              <option value="traditional">Traditional Heritage</option>
              <option value="contemporary">Contemporary / Modern</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-2 px-3 bg-brand-surface border border-brand-border rounded-sm text-brand-dark focus:outline-none focus:border-brand-gold font-medium cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals First</option>
              <option value="bestseller">Bestsellers First</option>
            </select>

            {/* Reset */}
            <button
              onClick={handleResetFilters}
              title="Reset All Filters"
              className="p-2 text-brand-muted hover:text-brand-gold hover:bg-brand-surface rounded-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4 border-r border-brand-border">
            {/* Categories */}
            <div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-dark mb-3">
                Categories
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full text-left text-xs uppercase tracking-wider py-1.5 px-2 rounded-sm transition-colors flex justify-between items-center ${
                          isSelected
                            ? 'bg-brand-dark text-white font-bold shadow-xs'
                            : 'text-brand-dark hover:bg-brand-surface'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {cat.slug === 'balochi-traditional' && (
                          <Sparkles className="w-3 h-3 text-brand-gold shrink-0 ml-1" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Size Filter */}
            <div className="pt-6 border-t border-brand-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Filter by Size
                </h3>
                {selectedSize !== 'all' && (
                  <button onClick={() => setSelectedSize('all')} className="text-[11px] text-brand-gold hover:underline">
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                    selectedSize === 'all'
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-white text-brand-dark border-brand-border hover:border-brand-gold'
                  }`}
                >
                  All
                </button>
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(String(s))}
                    className={`w-9 h-8 text-xs font-semibold rounded border transition-colors ${
                      selectedSize === String(s)
                        ? 'bg-brand-dark text-white border-brand-dark'
                        : 'bg-white text-brand-dark border-brand-border hover:border-brand-gold'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-6 border-t border-brand-border">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Color / Finish
                </h3>
                {selectedColor !== 'all' && (
                  <button onClick={() => setSelectedColor('all')} className="text-[11px] text-brand-gold hover:underline">
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                    selectedColor === 'all'
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-white text-brand-dark border-brand-border hover:border-brand-gold'
                  }`}
                >
                  All Colors
                </button>
                {allColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                      selectedColor === col
                        ? 'bg-brand-dark text-brand-cream border-brand-dark shadow-xs'
                        : 'bg-white text-brand-dark border-brand-border hover:border-brand-gold'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-6 border-t border-brand-border">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-brand-gold">
                  {formatPrice(priceRange)}
                </span>
              </div>
              <input
                type="range"
                min="2500"
                max="10000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-gold cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-brand-muted mt-1.5">
                <span>Rs. 2,500</span>
                <span>Rs. 10,000</span>
              </div>
            </div>

            {/* Quick Badges Toggles */}
            <div className="pt-6 border-t border-brand-border space-y-2.5">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-brand-dark mb-2">
                Quick Highlights
              </h3>
              <label className="flex items-center space-x-2 text-xs text-brand-dark cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyBestsellers}
                  onChange={(e) => setOnlyBestsellers(e.target.checked)}
                  className="rounded border-brand-border text-brand-gold focus:ring-brand-gold"
                />
                <span>Bestselling Products</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-brand-dark cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyNewArrivals}
                  onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                  className="rounded border-brand-border text-brand-gold focus:ring-brand-gold"
                />
                <span>New Season Releases</span>
              </label>
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Products count header */}
            <div className="flex justify-between items-center text-xs text-brand-muted mb-6 flex-wrap gap-2">
              <span>
                Displaying <strong className="text-brand-dark">{displayedProducts.length}</strong> of{' '}
                <strong className="text-brand-dark">{filteredProducts.length}</strong> styles
              </span>
              {(selectedCategory !== 'all' || selectedAudience !== 'all' || selectedStyle !== 'all' || selectedSize !== 'all' || selectedColor !== 'all' || searchTerm || priceRange < 10000) && (
                <button
                  onClick={handleResetFilters}
                  className="text-brand-gold hover:underline font-semibold"
                >
                  Clear all active filters
                </button>
              )}
            </div>

            {/* Product Cards Grid */}
            {displayedProducts.length === 0 ? (
              <div className="py-20 text-center bg-brand-surface rounded border border-dashed border-brand-border px-4">
                <p className="font-serif text-lg font-bold text-brand-dark">No Footwear Matches Your Filters</p>
                <p className="text-xs text-brand-muted max-w-sm mx-auto mt-2 mb-6 font-light">
                  Try adjusting your price range, clearing active search keywords, or switching categories.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3.5 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow"
                >
                  Load More Footwear ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-brand-dark/50 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <h3 className="font-serif text-base font-bold text-brand-dark">Filter Footwear</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-brand-muted hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs uppercase font-bold text-brand-dark mb-3">Categories</h4>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryChange(cat.slug);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left text-xs py-2 px-2.5 rounded ${
                        selectedCategory === cat.slug ? 'bg-brand-dark text-white font-bold' : 'text-brand-dark hover:bg-brand-surface'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-brand-border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs uppercase font-bold text-brand-dark">Max Price</h4>
                  <span className="text-xs font-bold text-brand-gold">{formatPrice(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="10000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-gold"
                />
              </div>

              {/* Apply / Reset */}
              <div className="pt-6 border-t border-brand-border space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-brand-dark text-white text-xs uppercase font-bold tracking-wider rounded-sm"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-2.5 bg-brand-surface text-brand-dark text-xs uppercase font-semibold tracking-wider rounded-sm border border-brand-border"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
