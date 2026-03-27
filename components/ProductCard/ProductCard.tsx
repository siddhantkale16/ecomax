"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "../CartButton/CartButton";
import { ProductPrice } from "../ProductPrice";

export const ProductCard = ({ productData }: { productData: Product }) => {
  return (
    <Card className="w-full p-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/60 dark:border-zinc-800/60 rounded-3xl shadow-xl hover:shadow-2xl hover:-tranzinc-y-2 transition-all duration-500 flex flex-col text-center min-h-[460px] group relative overflow-hidden">
      {/* CLICKABLE AREA */}
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
          
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
            {productData.rating?.rate && productData.rating.rate > 0 ? (
              <>
                <span>⭐</span>
                <span>{productData.rating.rate}</span>
                <span className="text-gray-400 text-[10px] font-normal">({productData.rating.count})</span>
              </>
            ) : (
              <span className="text-gray-400 font-medium text-xs">Not Rated</span>
            )}
          </div>
        </div>
      </Link>

      {/* CART BUTTON */}
      <div className="mt-2 w-full pt-4 border-t border-gray-100 dark:border-gray-700">
        <CartButton productId={productData._id as any} />
      </div>
    </Card>
  );
};