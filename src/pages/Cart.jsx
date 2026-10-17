import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { getCartWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();

  const whatsappOrderUrl = getCartWhatsAppUrl(cart, subtotal);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
        <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-5 text-brand-muted">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-dark mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto mb-8 font-light">
          You haven't added any pairs yet. Explore our handcrafted leather footwear, casual sneakers, and traditional chappals.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center px-8 py-3.5 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-surface border-b border-brand-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Shopping Bag
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review your selected footwear before ordering directly with our team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Cart Items Table/List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-brand-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                Footwear Items ({totalItems})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-brand-muted hover:text-red-500 transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>

            <div className="divide-y divide-brand-border">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-6 flex flex-col sm:flex-row gap-5">
                  {/* Image */}
                  <div className="w-24 h-28 bg-brand-cream/40 rounded-sm overflow-hidden shrink-0 border border-brand-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/images/men/men-footwear-01.jpg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-base font-semibold text-brand-dark">
                          <Link to={`/product/${item.slug}`} className="hover:text-brand-gold transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        <span className="font-bold text-base text-brand-dark">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 text-xs text-brand-muted mt-1">
                        {item.selectedSize && (
                          <span>Size: <strong className="text-brand-dark">{item.selectedSize}</strong></span>
                        )}
                        {item.selectedColor && (
                          <span>Finish: <strong className="text-brand-dark">{item.selectedColor}</strong></span>
                        )}
                        <span>Unit: {formatPrice(item.price)}</span>
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-border/40">
                      <div className="inline-flex items-center border border-brand-border rounded-sm bg-brand-surface">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-brand-muted hover:text-brand-dark"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-brand-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-brand-muted hover:text-brand-dark"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-xs text-brand-muted hover:text-red-500 inline-flex items-center space-x-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-brand-dark hover:text-brand-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Continue Exploring Footwear</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-brand-surface rounded-sm border border-brand-border shadow-sm space-y-5 sticky top-28">
              <h2 className="font-serif text-lg font-bold text-brand-dark pb-3 border-b border-brand-border">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-brand-muted">
                  <span>Total Items</span>
                  <span className="font-semibold text-brand-dark">{totalItems} Pairs</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-brand-dark">Confirmed via WhatsApp</span>
                </div>
                <div className="pt-3 border-t border-brand-border flex justify-between text-sm font-bold text-brand-dark">
                  <span>Order Total</span>
                  <span className="font-serif text-lg text-brand-dark">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Order via WhatsApp Direct Checkout Button */}
              <div className="pt-2">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white rounded-sm font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Place Order on WhatsApp</span>
                </a>
              </div>

              <div className="p-3.5 bg-brand-cream/60 rounded border border-brand-border/60 text-[11px] text-brand-dark/80 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-semibold text-brand-dark">
                  <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>How WhatsApp Checkout Works:</span>
                </div>
                <p className="text-brand-muted font-light leading-relaxed">
                  Clicking will open WhatsApp with your itemized bag breakdown. Our support representative ({DISPLAY_PHONE}) will immediately confirm your delivery address and Cash on Delivery details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
