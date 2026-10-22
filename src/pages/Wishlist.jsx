import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
        <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-5 text-brand-muted">
          <Heart className="w-10 h-10 stroke-1 text-brand-gold" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-dark mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto mb-8 font-light">
          Save your favorite footwear styles here to compare leather finishes, review details, or order later.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center px-8 py-3.5 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow"
        >
          <span>Browse Footwear</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-surface border-b border-brand-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              Your Wishlist
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              You have {wishlist.length} saved {wishlist.length === 1 ? 'pair' : 'pairs'} in your wishlist.
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-brand-muted hover:text-red-500 transition-colors self-start sm:self-auto"
          >
            Clear Entire Wishlist
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white border border-brand-border rounded-sm overflow-hidden luxury-card-hover shadow-sm"
            >
              {/* Image & Remove */}
              <div className="relative aspect-[4/5] bg-brand-cream/40 overflow-hidden">
                <Link to={`/product/${product.slug}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = product.audience === 'women'
                        ? '/images/women/women-footwear-01.jpg'
                        : '/images/men/men-footwear-01.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-500 flex items-center justify-center shadow-md transition-all hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Details & Actions */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-gold">
                    {product.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-brand-dark line-clamp-1 mt-0.5">
                    <Link to={`/product/${product.slug}`} className="hover:text-brand-gold transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-2 text-xs font-semibold text-[#189647]">
                    Inquire for Price
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-border/60 flex gap-2">
                  <button
                    onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0], 1)}
                    className="flex-1 py-2 px-3 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Add to Bag</span>
                  </button>
                  <Link
                    to={`/product/${product.slug}`}
                    className="px-3 py-2 bg-brand-surface hover:bg-brand-cream text-brand-dark text-xs uppercase tracking-wider font-semibold rounded-sm border border-brand-border transition-colors flex items-center justify-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
