"use client";
import { Trash2, X } from "lucide-react";
import { Button } from "./ui/button";

interface DeleteConfirmModalProps {
  productTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmModal = ({
  productTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl z-[110] p-4 animate-in fade-in duration-300">
      <div className="glass-card p-10 rounded-[2rem] max-w-md w-full shadow-2xl border-zinc-800 bg-zinc-900 relative">
        <button onClick={onCancel} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
            <Trash2 className="text-red-500 w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-black text-zinc-100 mb-2 tracking-tight">Delete Product</h3>
          <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium">
            Are you sure you want to remove <span className="text-zinc-200">"{productTitle}"</span>? This action cannot be undone.
          </p>

          <div className="flex flex-col w-full gap-3">
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full py-7 bg-red-500 hover:bg-red-600 text-white font-black text-lg rounded-xl shadow-lg shadow-red-500/10 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Product"}
            </Button>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-full py-4 text-zinc-500 hover:text-zinc-300 font-bold text-sm tracking-wide transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
