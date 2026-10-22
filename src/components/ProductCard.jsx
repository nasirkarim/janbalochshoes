import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const isFavorited = isInWishlist(product.id);

  const handleImageError = () => {
    // Reliable fallback footwear photo if primary fails
    setImgSrc(
      product.audience === 'women'
        ? '/images/pdf-products/product-027.jpg'
        : '/images/pdf-products/product-001.jpg'
    );
  };

  const directWhatsAppUrl = getProductWhatsAppUrl({
    productName: product.name,
    price: product.price,
    size: product.sizes?.[0],
    color: product.colors?.[0],
    quantity: 1,
    productUrl: typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : '',
  });

  return (
    <div className="group relative flex flex-col bg-white border border-brand-border rounded-sm overflow-hidden luxury-card-hover shadow-xs">
      {/* Product Image & Badges Container */}
      <div className="relative aspect-[4/5] bg-brand-cream/40 overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs shadow-xs ${
                product.badge.includes('Balochi')
                  ? 'bg-amber-800 text-brand-cream border border-amber-600'
                  : product.badge === 'Bestseller'
                  ? 'bg-brand-dark text-brand-gold border border-brand-gold/30'
                  : product.badge === 'New Arrival'
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-white/95 text-brand-dark border border-brand-border'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-brand-dark hover:text-brand-gold'
            }`}
          />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={handleImageError}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-brand-cream/50 animate-pulse flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-widest text-brand-muted">Loading...</span>
            </div>
          )}
        </Link>

        {/* Quick Action Overlay (Desktop Hover) */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0], 1)}
            className="flex-1 bg-brand-dark/95 hover:bg-brand-dark text-white text-[11px] font-semibold py-2 px-3 rounded-xs flex items-center justify-center space-x-1.5 shadow-md backdrop-blur-xs transition-colors border border-brand-gold/30 hover:border-brand-gold"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
            <span>Add to Bag</span>
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="w-9 bg-white/95 hover:bg-white text-brand-dark rounded-xs flex items-center justify-center shadow-md transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Audience Tag & Star Rating */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-brand-gold">
              {product.audience === 'women' ? "Women's" : "Men's"} • {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-semibold text-brand-dark">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-semibold text-brand-dark line-clamp-1 group-hover:text-brand-gold transition-colors">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short description */}
          <p className="text-[11px] text-brand-muted line-clamp-1 mt-0.5 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Order on WhatsApp CTA */}
        <div className="mt-2.5 pt-2.5 border-t border-brand-border/60 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
            Authentic Leather
          </span>

          {/* WhatsApp Direct Order Button */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Order on WhatsApp"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#189647] hover:text-white rounded-xs text-[11px] font-semibold transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
