import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full flex justify-center py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-125 bg-zinc-400/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <section className="max-w-7xl w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-100 bg-white/50 dark:bg-zinc-800/50 dark:border-zinc-700 w-fit mx-auto md:mx-0 shadow-xs backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              New Collection 2026
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-zinc-900 dark:text-white drop-shadow-xs">
            Elevate Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-amber-400">
              Lifestyle
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            Discover premium, sustainable products that blend cutting-edge design with everyday functionality. Shop the future of eco-friendly commerce.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center md:justify-start">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-8 py-6 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-xl shadow-amber-600/20 text-lg transition-transform hover:-tranzinc-y-1">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Feature Cards Grid (Modern visual element instead of a single image) */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 auto-rows-fr perspective-1000 mt-10 md:mt-0">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-8 rounded-[2rem] border border-white dark:border-zinc-700 shadow-2xl flex flex-col justify-center items-center text-center gap-4 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
            <div className="h-16 w-16 bg-amber-100 dark:bg-amber-900/50 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Leaf size={32} />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Eco-Friendly</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">Sustainably sourced materials for a better planet.</p>
          </div>
          
          <div className="bg-linear-to-br from-amber-600 to-amber-800 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-center items-center text-center gap-4 text-white transform rotate-[2deg] tranzinc-y-6 hover:rotate-0 transition-transform duration-500 hover:scale-105">
            <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-lg">Premium Quality</h3>
            <p className="text-sm text-amber-100 leading-relaxed">Certified products with extended warranties.</p>
          </div>

          <div className="col-span-2 bg-zinc-900 dark:bg-zinc-950 p-8 rounded-[2rem] border border-zinc-800 shadow-2xl flex items-center justify-between mt-4 overflow-hidden relative group hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
            <div className="absolute inset-0 bg-linear-to-r from-amber-600/20 to-transparent -tranzinc-x-full group-hover:tranzinc-x-0 transition-transform duration-700 ease-out"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="h-14 w-14 bg-amber-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                <Zap size={24} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black tracking-tight text-white">Fast Delivery</h3>
                <p className="text-zinc-400 text-sm mt-1">Get your orders in 2-3 business days.</p>
              </div>
            </div>
            <ArrowRight className="text-amber-400 relative z-10 shrink-0" size={24} />
          </div>
        </div>
      </section>
    </div>
  )
}