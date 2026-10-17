import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = 'jan_baloch_wishlist_items_v1';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading wishlist from storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to storage', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      toast.error(`Removed from wishlist`, {
        icon: '💔',
        style: {
          borderRadius: '8px',
          background: '#111111',
          color: '#F7F3EB',
        },
      });
    } else {
      setWishlist(prev => [...prev, product]);
      toast.success(`Saved to your wishlist`, {
        icon: '❤️',
        style: {
          borderRadius: '8px',
          background: '#111111',
          color: '#F7F3EB',
          border: '1px solid #C8A45D',
        },
      });
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    toast.error(`Removed from wishlist`, {
      style: {
        borderRadius: '8px',
        background: '#111111',
        color: '#F7F3EB',
      },
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
