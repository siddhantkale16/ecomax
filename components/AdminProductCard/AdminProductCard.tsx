"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2, Tag, Star } from "lucide-react";
import { useState } from "react";
import { DiscountModal } from "../DiscountModal/DiscountModal";
import { DeleteConfirmModal } from "../DeleteConfirmModal";
import { ProductPrice } from "../ProductPrice";

export const AdminProductCard = ({ productData }: { productData: Product }) => {
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`http://localhost:3000/api/products/${productData._id}`, {
        method: "DELETE",
      });
      location.reload();
    } catch (err) {
      console.error("Failed to delete product", err);
      setIsDeleting(false);
    }
  };

  return (
    <Card className="glass-card w-full p-6 rounded-[2rem] shadow-indigo-glow hover:shadow-indigo-glow-strong hover:-translate-y-1 transition-all duration-500 flex flex-col text-center min-h-[460px] group relative overflow-hidden bg-zinc-900/60 border-zinc-800/50">
      <Link
        href={`/products/${productData._id}`}
        className="flex flex-col items-center text-center flex-1"
      >
        {/* Category */}
        <div className="mb-4 self-start">
          <span className="inline-block bg-primary/5 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full group-hover:bg-primary/10 transition-colors">
            {productData.category}
          </span>
        </div>

        {/* Image Container - Adjusted for squarer look */}
        <div className="w-44 h-44 relative mb-6 mx-auto flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full" />
          <Image
            src={productData.image}
            alt={productData.title + " image"}
            fill
            className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
            sizes="200px"
          />
        </div>

        {/* Title */}
        <div className="mb-6 w-full px-2">
          <h2 className="text-lg font-black text-zinc-100 line-clamp-2 overflow-hidden leading-tight tracking-tight group-hover:text-primary transition-colors">
            {productData.title}
          </h2>
        </div>

        {/* Price & Rating */}
        <div className="flex justify-between w-full px-2 items-end mb-6 mt-auto">
          <div className="text-left">
            <span className="text-zinc-200 font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Price</span>
            <ProductPrice basePrice={productData.price} productDiscount={productData.discount} size="lg" />
          </div>
          
          <div className="flex items-center gap-1 bg-zinc-950/50 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-inner">
            <Star fill="currentColor" className="text-primary" size={14} />
            <span className="text-zinc-100 font-black text-sm tabular-nums">{productData.rating?.rate}</span>
          </div>
        </div>
      </Link>

      {/* Action Icons */}
      <div className="flex justify-center gap-3 mt-4 pt-6 border-t border-zinc-900 group-hover:border-primary/10 transition-colors">
        <Link
          href={`/admin/products/edit/${productData._id}`}
          className="bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900 hover:border-primary/40 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm group/edit cursor-pointer"
          title="Edit"
        >
          <Edit2 size={16} className="text-zinc-400 group-hover/edit:text-primary transition-colors" />
        </Link>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-zinc-950/50 border border-zinc-800 hover:bg-red-950/30 hover:border-red-500/40 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm cursor-pointer group/delete"
          title="Delete"
        >
          <Trash2 size={16} className="text-zinc-400 group-hover/delete:text-red-500 transition-colors" />
        </button>

        <button
          onClick={() => setIsDiscountModalOpen(true)}
          className="bg-primary hover:bg-indigo-600 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-indigo-glow cursor-pointer"
          title="Discount"
        >
          <Tag size={16} className="text-white" />
        </button>
      </div>

      {isDiscountModalOpen && (
        <DiscountModal
          productId={productData._id as any}
          currentDiscount={productData.discount}
          onClose={() => setIsDiscountModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          productTitle={productData.title}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isLoading={isDeleting}
        />
      )}
    </Card>
  );
};