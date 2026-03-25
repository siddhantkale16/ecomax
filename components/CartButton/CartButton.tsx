"use client";
import { useState } from "react";

export const CartButton = () => {
  const [count, setCount] = useState(0);

  return count === 0 ? (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setCount(1);
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
          setCount((prev) => Math.max(0, prev - 1));
        }}
        className="w-1/3 text-lg font-bold bg-red-500 text-white rounded"
      >
        -
      </button>

      <span className="font-medium text-center w-1/3">{count}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCount((prev) => prev + 1);
        }}
        className="w-1/3 text-lg font-bold bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
};