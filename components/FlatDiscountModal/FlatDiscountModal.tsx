"use client";
import { useState } from "react";
import { useDiscount } from "@/context/DiscountContext";
import { Button } from "../ui/button";
import { X, Globe } from "lucide-react";

interface FlatDiscountModalProps {
  onClose: () => void;
}

export const FlatDiscountModal = ({ onClose }: FlatDiscountModalProps) => {
  const { flatDiscount, setFlatDiscount } = useDiscount();
  const [discount, setDiscount] = useState<string>(flatDiscount > 0 ? flatDiscount.toString() : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    const discountNum = Number(discount);
    if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) {
      setError("Please enter a value between 0 and 100.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
        setFlatDiscount(discountNum);
        setLoading(false);
        onClose();
    }, 500);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl z-[100] p-4 animate-in fade-in duration-300">
      <div className="glass-card p-10 rounded-[2rem] w-full max-w-md shadow-2xl border-zinc-800 bg-zinc-900 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <X size={20} />
        </button>

        <div className="mb-8">
            <h2 className="text-2xl font-black text-zinc-100 mb-2 tracking-tight">
                Store-wide Discount
            </h2>
            <p className="text-zinc-500 text-sm font-medium">Apply a global discount percentage to all products.</p>
        </div>
        
        <div className="relative mb-6 group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors">
              <Globe size={24} />
          </div>
          <input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-16 py-5 text-3xl font-black text-zinc-100 placeholder:text-zinc-800 focus:outline-none focus:border-primary/50 transition-all shadow-inner tabular-nums"
            placeholder="0"
            autoFocus
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-800 group-focus-within:text-zinc-700 transition-colors">%</span>
        </div>

        {error && (
            <p className="text-red-500 text-xs mb-6 font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</p>
        )}
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-7 bg-primary hover:bg-indigo-600 text-white font-black text-lg rounded-xl shadow-indigo-glow transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Applying..." : "Apply Discount"}
          </Button>
          <button
            onClick={onClose}
            className="w-full py-4 text-zinc-500 hover:text-zinc-300 font-bold text-sm tracking-wide transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};