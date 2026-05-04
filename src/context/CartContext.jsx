import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({ cartItems: [], toggleCart: () => {}, isCartOpen: false, addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {} });

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('rhodes_cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  useEffect(() => {
    window.localStorage.setItem('rhodes_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, toggleCart, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    return { cartItems: [], toggleCart: () => {}, isCartOpen: false, addToCart: () => {}, removeFromCart: () => {}, updateQuantity: () => {} };
  }
  return context;
}
