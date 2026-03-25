"use client"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ObjectId } from "mongodb"

interface Product {
  _id: ObjectId
  title: string
  price: number
  image: string
}

export default function CartPage() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
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
    return sum + product.price * quantity
  }, 0)

  if (cart.length === 0)
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="text-6xl mb-6 animate-bounce">🛒</div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Your cart is empty
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg md:text-xl">
        Looks like you haven't added any products yet.
      </p>
      <Link
        href="/products"
        className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-emerald-600 transition"
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
            return (
              <div
                key={product._id as unknown as string}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
                  <p className="text-green-600 font-bold text-md mt-1">${product.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mt-1">Subtotal: ${(product.price * quantity).toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center gap-2">
                      <button
                    onClick={() => addToCart(product._id, 1)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  
                  <span className="font-medium">{quantity}</span>
                <button
                    onClick={() =>
                      quantity <= 1
                        ? removeFromCart(product._id)
                        : updateQuantity(product._id, quantity - 1)
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    -
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary / Checkout Panel */}
        <div className="w-full lg:w-1/3 p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6">
          <h3 className="text-2xl font-semibold">Order Summary</h3>
          <div className="flex justify-between text-lg">
            <span>Total Items:</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition">
            Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Clear Cart
          </button>

          <Link href="/products" className="text-center text-emerald-500 underline mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}