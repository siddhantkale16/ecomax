"use client";
import { ObjectId } from "mongodb";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: ObjectId;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: ObjectId, quantity?: number) => void;
  removeFromCart: (id: ObjectId) => void;
  updateQuantity: (id: ObjectId, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: ObjectId) => number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: ObjectId, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id, quantity }];
    });
  };

  const removeFromCart = (id: ObjectId) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: ObjectId, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const getItemQuantity = (id: ObjectId) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier usage
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};