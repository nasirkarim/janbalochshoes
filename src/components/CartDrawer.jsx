import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { getCartWhatsAppUrl } from '../utils/whatsapp';

export const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const whatsappOrderUrl = getCartWhatsAppUrl(cart, subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-brand-border animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-surface">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-lg font-bold text-brand-dark">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-brand-muted hover:text-brand-dark rounded-md hover:bg-brand-cream/60 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-brand-border/70">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mb-4 text-brand-muted">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Your bag is empty</h3>
                <p className="text-xs text-brand-muted max-w-xs mt-1.5 mb-6">
                  Explore our handcrafted collections and discover your next statement pair.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider bg-brand-dark text-white px-5 py-3 rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors"
                >
                  <Link to="/shop" onClick={closeCart}>
                    Explore Footwear
                  </Link>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-brand-cream rounded overflow-hidden shrink-0 border border-brand-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/images/men/men-footwear-01.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-brand-dark line-clamp-1 pr-2">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="hover:text-brand-gold transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-brand-muted/70 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex flex-wrap gap-x-3 text-[11px] text-brand-muted mt-0.5">
                        {item.selectedSize && <span>Size: <strong className="text-brand-dark">{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>Color: <strong className="text-brand-dark">{item.selectedColor}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-brand-border rounded">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 text-brand-muted hover:text-brand-dark hover:bg-brand-cream/60 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-brand-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 text-brand-muted hover:text-brand-dark hover:bg-brand-cream/60 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-sm font-bold text-brand-dark">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & WhatsApp CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-brand-border bg-brand-surface space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-muted font-medium">Subtotal</span>
                <span className="text-lg font-bold text-brand-dark">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-brand-muted">
                Taxes & delivery will be confirmed with the merchant on WhatsApp.
              </p>

              {/* Order via WhatsApp Button */}
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white rounded font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md transition-all duration-200"
              >
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* View Full Cart Link */}
              <Link
                to="/cart"
                onClick={closeCart}
                className="w-full py-2.5 px-4 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white rounded font-medium text-xs uppercase tracking-wider text-center block transition-colors border border-brand-border"
              >
                View Full Cart & Summary
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
