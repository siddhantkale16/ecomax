"use client";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DiscountModalProps {
  productId: ObjectId;
  currentDiscount?: number;
  onClose: () => void;
}

export const DiscountModal = ({ productId, currentDiscount, onClose }: DiscountModalProps) => {
  // If discount is 0, show empty string so user can easily type
  const [discount, setDiscount] = useState<string>(currentDiscount && currentDiscount > 0 ? currentDiscount.toString() : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSave = async () => {
    const discountNum = Number(discount);
    if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
      setError("Discount must be between 0 and 100%");
      return;
    }

    setError("");
    setLoading(true);
    await fetch(`http://localhost:3000/api/products/${productId}/discount`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discount: discountNum }),
    });
    setLoading(false);
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in zoom-in duration-200">
        <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-gray-100">
          Set Discount
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Enter a percentage value (0-100) to apply to this product.</p>
        
        <div className="relative mb-6">
          <input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-2xl px-5 py-4 text-xl font-bold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-amber-600 transition shadow-inner pr-12"
            placeholder="0"
          />
          <span className="absolute right-5 top-1/2 -tranzinc-y-1/2 text-xl font-black text-gray-400">%</span>
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4 font-bold ml-1">{error}</p>
        )}

        <div className="flex flex-col gap-3 font-bold">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 rounded-2xl text-white shadow-lg shadow-amber-600/20 transition active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Apply Discount"}
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl text-gray-500 dark:text-gray-300 transition active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};