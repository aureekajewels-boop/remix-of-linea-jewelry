import { useState, useEffect, useCallback } from 'react';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '@/lib/controller/WishlistController';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    const items = await fetchWishlist();
    setWishlistItems(items);
    setLoading(false);
  };

  // Check if product is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId || item.product_id === productId);
  }, [wishlistItems]);

  // Toggle wishlist
  const toggleWishlist = async (productId) => {
    const inWishlist = isInWishlist(productId);
    
    if (inWishlist) {
      const result = await removeFromWishlist(productId);
      if (result.success) {
        setWishlistItems(prev => prev.filter(item => 
          item.id !== productId && item.product_id !== productId
        ));
        return { success: true, action: 'removed' };
      }
      return result;
    } else {
      const result = await addToWishlist(productId);
      if (result.success) {
        await loadWishlist(); // Reload to get updated list
        return { success: true, action: 'added' };
      }
      return result;
    }
  };

  return {
    wishlistItems,
    loading,
    isInWishlist,
    toggleWishlist,
    refreshWishlist: loadWishlist
  };
};