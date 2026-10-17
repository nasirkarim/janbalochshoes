import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'jan_baloch_cart_items_v1';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cart]);

  // Generate unique item key based on product ID, size, and color
  const generateCartItemId = (product, size, color) => {
    return `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1, showToast = true) => {
    const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const cartItemId = generateCartItemId(product, size, color);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            selectedSize: size,
            selectedColor: color,
            quantity: quantity,
          }
        ];
      }
    });

    if (showToast) {
      toast.success(`Added "${product.name}" to cart`, {
        icon: '🛍️',
        style: {
          borderRadius: '8px',
          background: '#111111',
          color: '#F7F3EB',
          border: '1px solid #C8A45D',
        },
      });
    }
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.cartItemId === cartItemId);
      if (itemToRemove) {
        toast.error(`Removed from cart`, {
          style: {
            borderRadius: '8px',
            background: '#111111',
            color: '#F7F3EB',
          },
        });
      }
      return prevCart.filter(item => item.cartItemId !== cartItemId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
