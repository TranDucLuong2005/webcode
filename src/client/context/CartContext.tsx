import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')!) : []
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any, upgradeEmail: string) => {
    const existItem = cartItems.find((x) => x.product._id === product._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) => 
          x.product._id === existItem.product._id ? { ...x, upgradeEmail } : x
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1, upgradeEmail, price: product.price }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((x) => x.product._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
