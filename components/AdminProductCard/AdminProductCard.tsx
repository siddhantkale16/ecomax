"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const AdminProductCard = ({ productData }: { productData: Product }) => {

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/api/products/${productData._id}`, {
      method: "DELETE",
    });

    location.reload();
  };

  return (
    <Card className="w-full p-3 bg-linear-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col text-center h-100">
      
      {/* KEEP SAME LINK + UI */}
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
          <span className="inline-block bg-emerald-400 text-white text-xs font-medium px-2 py-2 rounded-full">
            {productData.category}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col mb-4 h-10">
          <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 overflow-hidden">
            {productData.title}
          </h2>
        </div>

        <div className="flex justify-between w-full px-1 items-center mb-2 shrink-0 text-sm">
          <p className="text-green-600 font-bold">
            ${productData.price.toFixed(2)}
          </p>
          <p className="text-yellow-600">
            {productData.rating
              ? `⭐ ${productData.rating.rate} (${productData.rating.count})`
              : "Not Rated"}
          </p>
        </div>
      </Link>

      <div className="flex gap-2 mt-auto">
        <Link
          href={`/admin/products/edit/${productData._id}`}
          className="flex-1 bg-emerald-400 hover:bg-emerald-600 text-white py-2 rounded text-sm"
        >
          Edit
        </Link>

        <Button
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-400 text-white py-1 rounded text-sm cursor-pointer"
        >
          Delete
        </Button>
      </div>

    </Card>
  );
};