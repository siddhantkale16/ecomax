"use client";
import { Card } from "../ui/card";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { CartButton } from "../CartButton/CartButton";
import { ProductPrice } from "../ProductPrice";

export const ProductCard = ({ productData }: { productData: Product }) => {
  return (
    <Card className="glass-card w-full p-6 rounded-[2rem] shadow-indigo-glow hover:shadow-indigo-glow-strong hover:-translate-y-1 transition-all duration-500 flex flex-col text-center min-h-[460px] group relative overflow-hidden bg-zinc-900/60 border-zinc-800/50">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
      
      <Link
        href={`/products/${productData._id}`}
        className="flex flex-col items-center text-center flex-1"
      >
        {/* Category Label */}
        <div className="mb-4 self-start">
          <span className="bg-zinc-950/50 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full group-hover:border-primary/30 group-hover:text-primary transition-all">
            {productData.category}
          </span>
        </div>

        {/* Image Container - Adjusted for a squarer look */}
        <div className="w-48 h-48 relative mb-6 mx-auto flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
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
        <div className="mb-4 w-full px-2">
          <h2 className="text-lg font-black text-zinc-100 line-clamp-2 overflow-hidden leading-tight tracking-tight group-hover:text-primary transition-colors">
            {productData.title}
          </h2>
        </div>

        {/* Price & Rating Display */}
        <div className="flex justify-between w-full px-2 items-end mb-6 mt-auto">
          <div className="text-left">
            <span className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] mb-1 block">Price</span>
            <ProductPrice basePrice={productData.price} productDiscount={productData.discount} size="lg" />
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-zinc-950/50 border border-zinc-800 px-2 py-1 rounded-lg">
                <Star fill="currentColor" className="text-primary" size={12} />
                <span className="text-zinc-100 font-black text-xs">{productData.rating?.rate}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Cart Interaction */}
      <div className="w-full pt-4 border-t border-zinc-900 group-hover:border-primary/20 transition-colors">
         <CartButton productId={productData._id} />
      </div>
    </Card>
  );
};