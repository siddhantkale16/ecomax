"use client";
import { Trash2, AlertTriangle } from "lucide-react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <Trash2 className="text-red-500 w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2">Delete Product?</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-gray-800 dark:text-gray-200">"{productTitle}"</span>? This action cannot be undone.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 transition active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Yes, Delete Product"}
            </button>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-full py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition active:scale-[0.98] disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
