"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-100 py-16 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="group">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-primary transition-colors">
              Eco<span className="text-primary">Max</span>
            </h2>
          </Link>
          <p className="text-zinc-500 max-w-xs leading-relaxed">
            Leading the way in premium, sustainable, and eco-friendly products for a better tomorrow.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-zinc-100 uppercase tracking-wider text-sm">Company</h3>
          <nav className="flex flex-col gap-2">
            <Link href="#" className="text-zinc-500 hover:text-primary transition-colors duration-200">
              Support
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-primary transition-colors duration-200">
              About Us
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-primary transition-colors duration-200">
              Terms & Conditions
            </Link>
          </nav>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-zinc-100 uppercase tracking-wider text-sm">Stay Updated</h3>
          <p className="text-zinc-500 text-sm">
            Join our newsletter for the latest products and exclusive offers.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Button className="bg-primary hover:bg-indigo-600 text-white rounded-xl shadow-indigo-glow transition-all px-6">
              <Mail className="mr-2" size={16} />
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-zinc-900 pt-8 text-center text-zinc-600 text-xs">
        &copy; {new Date().getFullYear()} EcoMax. Engineered for Excellence.
      </div>
    </footer>
  )
}