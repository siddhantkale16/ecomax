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
          <Link href="/admin/products" className={linkClass("/admin/products")}>
            Admin
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/products" className={linkClass("/products")}>
            Products
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/cart" className="relative">
            <span className={linkClass("/cart")}>Cart</span>

            {/* Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}