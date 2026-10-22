import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, ChevronRight, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppOrderButton } from '../components/WhatsAppButton';

export const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product from 100 products
  const product = PRODUCTS.find((p) => p.slug === slug);

  // States
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Update states when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
      setQuantity(1);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-brand-dark mb-3">Footwear Not Found</h2>
        <p className="text-xs text-brand-muted max-w-sm mb-6 font-light">
          The requested footwear style might have been updated or moved to our archives.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          Return to Footwear Store
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappUrl = getProductWhatsAppUrl({
    productName: product.name,
    price: product.price,
    size: selectedSize,
    color: selectedColor,
    quantity,
    productUrl: currentUrl,
  });

  // Related products from same category or audience
  const relatedProducts = PRODUCTS.filter(
    (p) => (p.category === product.category || p.audience === product.audience) && p.id !== product.id
  ).slice(0, 4);

  const galleryImages = [
    product.image,
    ...(product.gallery || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-brand-surface border-b border-brand-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-brand-muted">
            <Link to="/" className="hover:text-brand-dark transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-brand-dark transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/shop?audience=${product.audience}`}
              className="hover:text-brand-dark transition-colors font-medium capitalize"
            >
              {product.audience === 'women' ? "Women's Collection" : "Men's Collection"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/shop?category=${product.category}`}
              className="hover:text-brand-dark transition-colors uppercase"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Primary Display Image */}
            <div className="relative aspect-[4/5] bg-brand-cream/30 rounded-sm overflow-hidden border border-brand-border shadow-xs">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = product.audience === 'women'
                    ? '/images/pdf-products/product-027.jpg'
                    : '/images/pdf-products/product-001.jpg';
                }}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-xs shadow-md ${
                    product.badge.includes('Balochi')
                      ? 'bg-amber-800 text-brand-cream border border-amber-600'
                      : 'bg-brand-dark text-brand-gold border border-brand-gold/30'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xs overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img
                        ? 'border-brand-gold scale-95 shadow-md'
                        : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.target.src = product.audience === 'women'
                          ? '/images/pdf-products/product-027.jpg'
                          : '/images/pdf-products/product-001.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Options */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category, Audience & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-bold tracking-wider text-brand-gold flex items-center space-x-1.5">
                  {product.isBalochi && <Sparkles className="w-3.5 h-3.5 text-brand-gold" />}
                  <span>{product.audience === 'women' ? "Women's & Girls" : "Men's & Boys"} • {product.category.replace('-', ' ')}</span>
                </span>
                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-brand-dark">{product.rating}</span>
                  <span className="text-xs text-brand-muted">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-brand-dark tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Pricing & Inquiry Note */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-brand-border">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#189647] font-semibold text-xs rounded-sm">
                  <span>Direct Price on WhatsApp Inquiry</span>
                </span>
                <span className="text-xs text-brand-muted font-light">
                  Direct artisan pricing & size guidance via WhatsApp
                </span>
              </div>

              {/* Descriptions */}
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs uppercase font-bold tracking-wider text-brand-dark">
                      Select Size ({product.audience === 'women' ? 'Women EU' : 'Men EU'})
                    </span>
                    <span className="text-[11px] text-brand-muted font-light">
                      True to Pakistani standard fit
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-11 text-xs font-semibold rounded-xs border transition-all ${
                          selectedSize === size
                            ? 'bg-brand-dark text-white border-brand-dark shadow-xs'
                            : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <span className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-2.5">
                    Select Leather Finish / Color
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-xs border transition-all flex items-center space-x-1.5 ${
                          selectedColor === color
                            ? 'bg-brand-dark text-brand-cream border-brand-dark shadow-xs'
                            : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-gold'
                        }`}
                      >
                        {selectedColor === color && <Check className="w-3.5 h-3.5 text-brand-gold" />}
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <span className="block text-xs uppercase font-bold tracking-wider text-brand-dark mb-2.5">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-brand-border rounded-xs bg-brand-surface">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 text-brand-muted hover:text-brand-dark transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-brand-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-2 text-brand-muted hover:text-brand-dark transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-brand-border">
                {/* Buy on WhatsApp Primary Button */}
                <WhatsAppOrderButton
                  url={whatsappUrl}
                  text="Buy Now on WhatsApp"
                  size="lg"
                  fullWidth
                />

                <div className="flex gap-3">
                  {/* Add to Bag */}
                  <button
                    onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                    className="flex-1 py-3.5 px-6 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white rounded-xs font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xs border border-brand-dark"
                  >
                    <ShoppingBag className="w-4 h-4 text-brand-gold" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-14 rounded-xs border flex items-center justify-center transition-all ${
                      isFavorited
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-brand-border bg-white text-brand-dark hover:border-brand-gold'
                    }`}
                    title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Service Badges */}
              <div className="mt-8 pt-6 border-t border-brand-border grid grid-cols-2 gap-4 text-xs text-brand-muted">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Cash on Delivery in Pakistan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Authentic Handcrafted Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-brand-border">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                You May Also Admire
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-1">
                Complementary Pakistani Styles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
