"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2, Tag } from "lucide-react";
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
    <Card className="w-full p-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/60 dark:border-zinc-800/60 rounded-3xl shadow-xl hover:shadow-2xl hover:-tranzinc-y-2 transition-all duration-500 flex flex-col text-center min-h-[460px] group relative overflow-hidden">
      <Link
        href={`/products/${productData._id}`}
        className="flex flex-col items-center text-center flex-1"
      >
        {/* Image */}
        <div className="w-44 h-44 relative mb-6 mx-auto flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Image
            src={productData.image}
            alt={productData.title + " image"}
            fill
            className="object-contain"
            sizes="160px"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {productData.category}
          </span>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 overflow-hidden px-2">
            {productData.title}
          </h2>
        </div>

        {/* Price & Rating */}
        <div className="flex justify-between w-full px-2 items-center mb-4 mt-auto">
          <ProductPrice basePrice={productData.price} productDiscount={productData.discount} size="lg" />
          
          <p className="text-yellow-500 font-bold text-sm">
            {productData.rating?.rate && productData.rating.rate > 0 ? `⭐ ${productData.rating.rate}` : <span className="text-gray-400 font-medium text-xs italic">Not Rated</span>}
          </p>
        </div>
      </Link>

      {/* Action Icons */}
      <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Link
          href={`/admin/products/edit/${productData._id}`}
          className="bg-amber-500 hover:bg-amber-700 w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm"
          title="Edit Product"
        >
          <Edit2 size={16} className="text-white" />
        </Link>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm cursor-pointer"
          title="Delete Product"
        >
          <Trash2 size={16} className="text-white" />
        </button>

        <button
          onClick={() => setIsDiscountModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-500 w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm cursor-pointer"
          title="Set Product Discount"
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