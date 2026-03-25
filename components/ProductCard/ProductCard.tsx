"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "../CartButton/CartButton";

export const ProductCard = ({ productData }: { productData: Product }) => {
  return (
    <Card className="w-full p-3 bg-linear-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col text-center h-100">

      {/* CLICKABLE AREA */}
      <Link
        href={`/products/${productData._id}`}
        className="flex flex-col items-center text-center"
      >
        {/* Image */}
        <div className="w-40 h-40 relative mb-4 mx-auto">
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
          <span className="inline-block bg-emerald-400 text-white text-xs font-medium px-2 py-1 rounded-full">
            {productData.category}
          </span>
        </div>

        {/* Title + Description */}
        <div className="flex flex-col mb-4 h-10">
          <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 overflow-hidden">
            {productData.title}
          </h2>
        </div>

        {/* Price & Rating */}
        <div className="flex justify-between w-full px-1 items-center mb-2 shrink-0 text-sm">
          <p className="text-green-600 font-bold">
            ${productData.price.toFixed(2)}
          </p>
         
            <p className="text-yellow-600">

              {productData.rating ? (` ⭐ ${productData.rating.rate} (${productData.rating.count})  `):"Not Rated"}
            </p>
        
        </div>
      </Link>

      {/* NON-CLICKABLE (Cart stays outside) */}
      <div className="mt-auto shrink-0">
        <CartButton />
      </div>

    </Card>
  );
};