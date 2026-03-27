"use client"
import Link from "next/link"
import { ShoppingBag, Zap, Shield, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-zinc-800 text-zinc-100 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Shop Our New Collection</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
           Welcome to <br /> <span className="text-primary italic">EcoMax.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            Discover our premium range of high-quality products. Simple, fast, and secure shopping.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <Link href="/products">
              <Button className="px-10 py-6 bg-primary hover:bg-indigo-600 text-white rounded-2xl text-lg font-black shadow-indigo-glow transition-all hover:scale-105 active:scale-95 group">
                Shop Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="px-10 py-6 border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 rounded-2xl text-lg font-bold transition-all">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap className="text-primary" size={32} />, 
              title: "Fast Shipping", 
              desc: "Get your orders delivered quickly within 24-48 hours.",
              bg: "bg-primary/5"
            },
            { 
              icon: <Shield className="text-primary" size={32} />, 
              title: "Secure Payments", 
              desc: "Safe and secure transactions for all your purchases.",
              bg: "bg-indigo-500/5"
            },
            { 
              icon: <Star className="text-primary" size={32} />, 
              title: "Quality Products", 
              desc: "Every item is checked for quality and authenticity.",
              bg: "bg-zinc-900/5"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`glass-card p-10 rounded-[2.5rem] border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-primary/30 transition-all duration-500 group shadow-lg hover:shadow-indigo-glow-strong`}
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
