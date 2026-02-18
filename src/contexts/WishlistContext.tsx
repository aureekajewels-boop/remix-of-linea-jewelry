import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '@/lib/controller/WishlistController';

interface WishlistContextType {
  wishlistItems: any[];
  loading: boolean;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<any>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    const items = await fetchWishlist();
    setWishlistItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId || item.product_id === productId);
  };

  const toggleWishlist = async (productId: number) => {
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
        await loadWishlist();
        return { success: true, action: 'added' };
      }
      return result;
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      loading,
      isInWishlist,
      toggleWishlist,
      refreshWishlist: loadWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};