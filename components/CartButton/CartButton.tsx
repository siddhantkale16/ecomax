"use client";
import { useCart } from "@/context/CartContext";
import { ObjectId } from "mongodb";

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
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAdd();
      }}
      className="w-full bg-emerald-400 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition"
    >
      Add to Cart
    </button>
  ) : (
    <div className="w-full flex justify-between items-center border rounded-lg px-3 py-2 bg-gray-100 dark:bg-gray-700">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDecrease();
        }}
        className="w-1/3 text-lg font-bold bg-red-500 text-white rounded"
      >
        -
      </button>

      <span className="font-medium text-center w-1/3">{count}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleIncrease();
        }}
        className="w-1/3 text-lg font-bold bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
};