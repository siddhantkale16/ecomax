"use client"
import { useCart } from "@/context/CartContext"
import { useDiscount } from "@/context/DiscountContext"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ObjectId } from "mongodb"
import { ProductPrice } from "@/components/ProductPrice"

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
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg md:text-xl">
          Looks like you haven't added any products yet.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-amber-600 text-white rounded-lg text-lg font-semibold hover:bg-amber-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    )

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Your Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products List */}
        <div className="flex-1 space-y-6">
          {products.map((product) => {
            const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
            const productDiscount = product.discount || 0
            // We use ProductPrice here for display consistency
            
            return (
              <div
                key={product._id as unknown as string}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
                  <div className="mt-1">
                    <ProductPrice basePrice={product.price} productDiscount={productDiscount} size="lg" />
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1 border border-gray-100 dark:border-gray-600">
                  <button
                    onClick={() =>
                      quantity <= 1
                        ? removeFromCart(product._id)
                        : updateQuantity(product._id, quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => addToCart(product._id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded shadow-sm hover:bg-amber-700 transition cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary / Checkout Panel */}
        <div className="w-full lg:w-1/3 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6 h-fit sticky top-24">
          <h3 className="text-2xl font-bold">Order Summary</h3>
          
          <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Total Items:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            {flatDiscount > 0 && (
              <div className="flex justify-between text-amber-700">
                <span>EcoMax Special:</span>
                <span className="font-bold">-{flatDiscount}%</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span>Total Price:</span>
              <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/checkout" className="w-full">
              <button className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition shadow-lg shadow-amber-600/20 active:scale-[0.98]">
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={clearCart}
              className="w-full py-3 bg-white dark:bg-gray-800 text-red-500 font-semibold rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition active:scale-[0.98]"
            >
              Clear Cart
            </button>
          </div>

          <Link href="/products" className="text-center text-amber-600 text-sm font-semibold hover:underline mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}