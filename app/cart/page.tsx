"use client"
import { useCart } from "@/context/CartContext"
import { useDiscount } from "@/context/DiscountContext"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ObjectId } from "mongodb"
import { ProductPrice } from "@/components/ProductPrice"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft, Trash2, X } from "lucide-react"

interface Product {
  _id: ObjectId
  title: string
  price: number
  image: string
  discount?: number
}

export default function CartPage() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { flatDiscount } = useDiscount()
  const [products, setProducts] = useState<Product[]>([])

  // Fetch product info
  useEffect(() => {
    async function fetchCartProducts() {
      const res = await fetch("http://localhost:3000/api/products")
      const allProducts: Product[] = await res.json()
      const cartProducts = allProducts.filter((p) =>
        cart.some((c) => c.id === p._id)
      )
      setProducts(cartProducts)
    }
    fetchCartProducts()
  }, [cart])

  const totalPrice = products.reduce((sum, product) => {
    const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
    const productDiscount = product.discount || 0
    const discountFactor = (1 - productDiscount / 100) * (1 - flatDiscount / 100)
    const finalPrice = product.price * discountFactor
    return sum + finalPrice * quantity
  }, 0)

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-zinc-800">
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
            <ShoppingBag className="w-20 h-20 text-zinc-700 relative z-10" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100 tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-zinc-500 mb-8 text-lg md:text-xl font-medium max-w-md">
          Looks like you haven't added anything yet. Browse our products to find what you need.
        </p>
        <Link href="/products">
          <Button className="px-10 py-7 bg-primary hover:bg-indigo-600 text-white rounded-2xl text-lg font-bold shadow-indigo-glow transition-all hover:scale-105 active:scale-95">
            Start Shopping
          </Button>
        </Link>
      </div>
    )

  return (
    <div className="w-full min-h-screen bg-zinc-800 p-6 md:p-12 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <Link href="/products" className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tighter">Shopping Cart.</h1>
        </div>
 
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Products List */}
          <div className="w-full lg:w-1/2 space-y-6">
            {products.map((product) => {
              const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
              const productDiscount = product.discount || 0
              
              return (
                <div
                  key={product._id as unknown as string}
                  className="glass-card flex items-center gap-6 p-6 rounded-[2rem] shadow-indigo-glow hover:shadow-indigo-glow-strong transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="w-24 h-24 relative flex-shrink-0 bg-white rounded-2xl p-3 shadow-inner group-hover:scale-105 transition-transform">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-zinc-100 line-clamp-1 truncate">{product.title}</h3>
                    <div className="mt-1">
                      <ProductPrice basePrice={product.price} productDiscount={productDiscount} size="md" />
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <button 
                        onClick={() => removeFromCart(product._id)}
                        className="text-zinc-600 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                    
                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner">
                        <button
                            onClick={() =>
                                quantity <= 1
                                    ? removeFromCart(product._id)
                                    : updateQuantity(product._id, quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-zinc-800 text-zinc-100 rounded-lg hover:bg-zinc-700 transition"
                        >
                            -
                        </button>
                        <span className="font-bold text-lg text-zinc-100 w-6 text-center">{quantity}</span>
                        <button
                            onClick={() => addToCart(product._id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg shadow-indigo-glow hover:bg-indigo-600 transition"
                        >
                            +
                        </button>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {cart.length > 0 && (
                <button
                    onClick={clearCart}
                    className="flex items-center gap-2 text-zinc-600 hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-[10px] ml-4 py-2"
                >
                    <Trash2 size={12} />
                    Clear Cart
                </button>
            )}
          </div>

          {/* Summary / Checkout Panel */}
          <div className="w-full lg:w-1/2 glass-card p-10 rounded-[2.5rem] shadow-indigo-glow-strong flex flex-col gap-8 h-fit lg:sticky lg:top-32 border-primary/10">
            <h3 className="text-2xl font-black text-zinc-100 tracking-tight">Order Summary.</h3>
            
            <div className="space-y-4 pb-8 border-b border-zinc-900">
              <div className="flex justify-between text-zinc-500 font-bold text-sm tracking-wide uppercase">
                <span>Total Items</span>
                <span className="text-zinc-100">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              
              {flatDiscount > 0 && (
                <div className="flex justify-between text-primary font-black text-sm tracking-wide uppercase">
                  <span>Discount</span>
                  <span>-{flatDiscount}%</span>
                </div>
              )}

              <div className="flex justify-between items-end pt-6">
                <div className="flex flex-col">
                    <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Subtotal</span>
                    <span className="text-4xl font-black text-zinc-100 tracking-tighter">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/checkout" className="w-full">
                <Button className="w-full py-6 bg-primary hover:bg-indigo-600 text-white font-black text-lg rounded-xl shadow-indigo-glow transition-all hover:scale-[1.02] active:scale-95">
                  Checkout Now
                </Button>
              </Link>
              
              <Link href="/products" className="text-center text-zinc-500 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] mt-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}