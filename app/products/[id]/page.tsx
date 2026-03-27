"use client"
import { useDiscount } from "@/context/DiscountContext";
import { CartButton } from "@/components/CartButton/CartButton";
import { Product } from "@/types/Product";
import { ProductPrice } from "@/components/ProductPrice";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { flatDiscount } = useDiscount();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });
        if(!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

  if (!product) return notFound();

  const hasRating = product.rating?.rate && product.rating.rate > 0;

  return (
    <div className="min-h-screen w-full p-6 md:p-12 flex flex-col items-center animate-in fade-in duration-500">
      {/* Back Link */}
      <div className="w-full max-w-[1400px] mb-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 font-bold transition group">
          <ArrowLeft size={18} className="group-hover:-tranzinc-x-1 transition-transform" />
          <span>Back to Products</span>
        </Link>
      </div>
      
      <section className="w-full max-w-[1400px] flex flex-col md:flex-row items-stretch justify-center gap-12 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/60 dark:border-zinc-800/60 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] -mr-32 -mt-32"></div>

        {/* Product Image */}
        <div className="w-full md:w-1/2 min-h-[400px] relative bg-white rounded-3xl p-10 border border-gray-100 dark:border-gray-700/30 shadow-inner flex items-center justify-center group">
          <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <div className="mb-6">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col gap-1">
              <ProductPrice basePrice={product.price} productDiscount={product.discount} size="xl" />
            </div>
            
            {hasRating ? (
              <div className="text-right">
                <div className="flex items-center gap-2 text-yellow-500 text-3xl font-black justify-end">
                  <Star fill="currentColor" size={28} />
                  <span>{product.rating?.rate}</span>
                </div>
                <p className="text-gray-400 text-[10px] mt-1 font-bold uppercase tracking-widest">{product.rating?.count} REVIEWS</p>
              </div>
            ): (
              <div className="text-right">
                <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Not Rated Yet</p>
              </div>
            )}
          </div>

          {/* Add to Cart Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-full sm:w-72">
              <CartButton productId={product._id}/>
            </div>
            
            <Link 
              href="/cart" 
              className="text-gray-400 hover:text-amber-600 font-black transition flex items-center gap-2 text-[10px] uppercase tracking-widest cursor-pointer"
            >
              View Cart →
            </Link>
          </div>

          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-50 dark:bg-amber-900/10 self-start px-3 py-2 rounded-lg">
            <ShieldCheck size={14} />
            Verified EcoMax Product
          </div>
        </div>
      </section>
    </div>
  );
}