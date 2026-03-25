"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="text-white bg-slate-700 backdrop-blur-md py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold tracking-tight">
            Eco<span className="text-emerald-400">Max</span>
          </h2>
          <p className="text-slate-300 max-w-xs">
            Your one-stop shop for sustainable and eco-friendly products.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">More Links</h3>
          <Link href="#" className="text-slate-300 hover:text-emerald-400 transition">
            Support
          </Link>
          <Link href="#" className="text-slate-300 hover:text-emerald-400 transition">
            About
          </Link>
          <Link href="#" className="text-slate-300 hover:text-emerald-400 transition">
            Terms & Conditions
          </Link>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white">Subscribe</h3>
          <p className="text-slate-300">
            Get updates on new products and offers.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-lg border border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Button className="px-4 py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-md">
              <Mail className="mr-1" size={16} />
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} EcoMax. All rights reserved.
      </div>
    </footer>
  )
}