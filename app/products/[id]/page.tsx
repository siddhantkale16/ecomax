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
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary relative z-10 shadow-indigo-glow"></div>
      </div>
    </div>
  );

  if (!product) return notFound();

  const hasRating = product.rating?.rate && product.rating.rate > 0;

  return (
    <div className="min-h-screen w-full bg-zinc-950 p-6 md:p-12 lg:p-20 flex flex-col items-center animate-in fade-in duration-700">
      {/* Back Link */}
      <div className="w-full max-w-[1400px] mb-12">
        <Link href="/products" className="inline-flex items-center gap-3 text-zinc-500 hover:text-primary font-bold uppercase tracking-widest text-xs transition-all group">
          <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:bg-zinc-800">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Return to Selection</span>
        </Link>
      </div>
      
      <section className="w-full max-w-[1400px] flex flex-col lg:flex-row items-stretch justify-center gap-16 glass-card p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -mr-64 -mt-64"></div>

        {/* Product Image */}
        <div className="w-full lg:w-1/2 min-h-[500px] relative bg-white rounded-[2.5rem] p-12 border border-zinc-100 shadow-inner flex items-center justify-center group/img overflow-hidden">
            <div className="absolute inset-0 bg-zinc-50/50 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
            <div className="w-full h-full relative transition-all duration-700 group-hover/img:scale-110 group-hover/img:rotate-2">
                <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
                priority
                />
            </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          <div className="mb-8">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full border border-primary/20 shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-zinc-100 mb-6 leading-[1.1] tracking-tighter">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-zinc-500 mb-10 text-lg leading-relaxed font-medium max-w-2xl">
            {product.description}
          </p>

          {/* Price and Rating */}
          <div className="flex flex-wrap items-center justify-between gap-8 mb-10 pb-10 border-b border-zinc-900">
            <div className="flex flex-col gap-2">
                <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.3em]">Exclusive Price</span>
                <ProductPrice basePrice={product.price} productDiscount={product.discount} size="xl" />
            </div>
            
            {hasRating ? (
              <div className="text-right">
                <div className="flex items-center gap-2 text-primary text-4xl font-black justify-end tracking-tighter shadow-indigo-glow-strong">
                  <Star fill="currentColor" size={32} />
                  <span>{product.rating?.rate}</span>
                </div>
                <p className="text-zinc-600 text-[10px] mt-2 font-black uppercase tracking-[0.3em]">{product.rating?.count} VERIFIED REVIEWS</p>
              </div>
            ): (
              <div className="text-right bg-zinc-900 px-6 py-3 rounded-2xl border border-zinc-800">
                <p className="text-zinc-500 font-black text-xs tracking-widest uppercase">Awaiting Ratings</p>
              </div>
            )}
          </div>

          {/* Add to Cart Area */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            <div className="w-full sm:w-80">
              <CartButton productId={product._id}/>
            </div>
            
            <Link 
              href="/cart" 
              className="text-zinc-500 hover:text-primary font-black transition-colors flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] cursor-pointer group/cart"
            >
              View Full Bag 
              <span className="group-hover/cart:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.2em] bg-primary/5 self-start px-5 py-3 rounded-2xl border border-primary/20 shadow-indigo-glow">
            <ShieldCheck size={18} />
            Certified EcoMax Authentic
          </div>
        </div>
      </section>
    </div>
  );
}