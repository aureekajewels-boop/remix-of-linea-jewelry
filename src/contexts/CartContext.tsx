import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchCart, addToCart, updateCartItem, removeFromCart } from '@/lib/controller/CartController';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: any; // Product details
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
  getCartItemQuantity: (productId: number) => number;
  addToCart: (productId: number, quantity?: number) => Promise<any>;
  updateQuantity: (productId: number, quantity: number) => Promise<any>;
  removeFromCart: (productId: number) => Promise<any>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    setLoading(true);
    const items = await fetchCart();
    setCartItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product_id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product_id === productId);
    return item ? item.quantity : 0;
  };

  const addItemToCart = async (productId: number, quantity = 1) => {
    try {
      const result = await addToCart(productId, quantity);
      if (result.success) {
        await loadCart();
        return { success: true, action: 'added' };
      }
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error };
    }
  };

  const updateItemQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        return await removeItemFromCart(productId);
      }
      const result = await updateCartItem(productId, quantity);
      if (result.success) {
        await loadCart();
        return { success: true, action: 'updated' };
      }
      return result;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return { success: false, error };
    }
  };

  const removeItemFromCart = async (productId: number) => {
    try {
      const result = await removeFromCart(productId);
      if (result.success) {
        setCartItems(prev => prev.filter(item => item.product_id !== productId));
        return { success: true, action: 'removed' };
      }
      return result;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error };
    }
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      totalItems,
      totalPrice,
      isInCart,
      getCartItemQuantity,
      addToCart: addItemToCart,
      updateQuantity: updateItemQuantity,
      removeFromCart: removeItemFromCart,
      clearCart: clearCartItems,
      refreshCart: loadCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};