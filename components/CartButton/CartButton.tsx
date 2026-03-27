"use client";
import { useCart } from "@/context/CartContext";
import { ObjectId } from "mongodb";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartButtonProps {
  productId: ObjectId;
}

export const CartButton = ({ productId }: CartButtonProps) => {
  const { getItemQuantity, addToCart, updateQuantity, removeFromCart } = useCart();
  const count = getItemQuantity(productId);

  const handleAdd = () => addToCart(productId, 1);
  const handleIncrease = () => addToCart(productId, 1);
  const handleDecrease = () => {
    if (count <= 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, count - 1);
    }
  };

  return count === 0 ? (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAdd();
      }}
      className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-6 rounded-2xl shadow-indigo-glow transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </Button>
  ) : (
    <div className="w-full flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-2 py-2 shadow-inner">
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleDecrease();
        }}
        className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl transition-colors"
      >
        <Minus size={16} />
      </Button>

      <span className="font-bold text-zinc-100 text-lg w-12 text-center">{count}</span>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleIncrease();
        }}
        className="w-10 h-10 flex items-center justify-center bg-primary hover:bg-indigo-600 text-white rounded-xl transition-all shadow-indigo-glow"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};