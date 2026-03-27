"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/context/CartContext"

export function Navbar() {
  const pathname = usePathname()
  const { cart } = useCart()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const linkClass = (path: string) =>
    `transition-all duration-200 text-lg font-medium ${
      pathname === path
        ? "text-primary"
        : "text-zinc-400 hover:text-zinc-100"
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-primary transition-colors">
              Eco<span className="text-primary">Max</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8 h-full">
            <NavigationMenu className="h-full">
              <NavigationMenuList className="flex items-center gap-8 h-full">
                <NavigationMenuItem className="flex items-center h-full">
                  <Link href="/" className={linkClass("/")}>
                    Home
                  </Link>
                </NavigationMenuItem>
 
                <NavigationMenuItem className="flex items-center h-full">
                  <Link href="/admin/products" className={linkClass("/admin/products")}>
                    Admin
                  </Link>
                </NavigationMenuItem>
 
                <NavigationMenuItem className="flex items-center h-full">
                  <Link href="/products" className={linkClass("/products")}>
                    Products
                  </Link>
                </NavigationMenuItem>
 
                <NavigationMenuItem className="flex items-center h-full">
                    <Link href="/cart" className="flex items-center relative group/cart">
                        <span className={linkClass("/cart")}>Cart</span>
                        {/* Badge */}
                        {totalItems > 0 && (
                        <span className="absolute -top-1 -right-3 bg-primary text-white text-[9px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full shadow-indigo-glow border border-zinc-950">
                            {totalItems}
                        </span>
                        )}
                    </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}