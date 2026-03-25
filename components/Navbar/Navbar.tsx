"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `transition-all duration-200 ${
      pathname === path
        ? "text-emerald-400 font-semibold"
        : "text-slate-300 hover:text-white"
    }`

  return (
    <NavigationMenu className="fixed top-0 w-full h-20 flex items-center justify-between px-10 bg-slate-700 backdrop-blur-md border-b border-white/10 z-50">
      
      {/* Logo */}
      <div className="text-xl font-bold tracking-tight text-white">
        Eco<span className="text-emerald-400">Max</span>
      </div>

      {/* Links */}
      <NavigationMenuList className="flex gap-10 text-lg">
        <NavigationMenuItem>
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/admin/products" className={linkClass("/")}>
            Admin
          </Link>
        </NavigationMenuItem>
        

        <NavigationMenuItem>
          <Link href="/products" className={linkClass("/products")}>
            Products
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/cart" className={linkClass("/cart")}>
            Cart
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}