import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col text-white bg-linear-to-l from-slate-300 to-slate-700">
  <section className="flex flex-col h-[90vh] items-center justify-center">
    <div className="w-2/3 flex flex-col justify-center h-full gap-8">
      
      <h1 className="text-6xl font-bold tracking-tight leading-tight drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
        Welcome to <span className="text-emerald-400">EcoMax</span>
      </h1>

      <p className="text-lg text-slate-200 max-w-xl">
        Sustainable solutions for a better tomorrow. Discover eco-friendly products that make a difference.
      </p>

      <Button className="max-w-max px-6 py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg" >
        <Link href="/products">See Products</Link>
      </Button>

    </div>
  </section>
</div>
  )
}