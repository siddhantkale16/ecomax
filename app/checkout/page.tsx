"use client"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ObjectId } from "mongodb"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  _id: ObjectId
  title: string
  price: number
  image: string
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [fullName, setFullName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [errors, setErrors] = useState<{[key:string]: string}>({})

  useEffect(() => {
    async function fetchCartProducts() {
      const res = await fetch("http://localhost:3000/api/products")
      const allProducts: Product[] = await res.json()
      const cartProducts = allProducts.filter((p: Product) =>
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

  const validateForm = () => {
    const newErrors: {[key:string]: string} = {}

    if (fullName.trim().length < 3) newErrors.fullName = "Full name must be at least 3 characters"
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) newErrors.cardNumber = "Card number must be 16 digits"
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be MM/YY"
    if (!/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <div className="flex items-center justify-center w-28 h-28 mb-6 rounded-full bg-emerald-500 text-white text-6xl shadow-lg">
          <Check className="w-12 h-12" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">
          Thank you!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg md:text-xl">
          Your order has been placed successfully.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transform transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <div className="text-7xl mb-6 ">🛒</div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg md:text-xl">
          Looks like you haven't added any products yet.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transform transition"
        >
          Start Shopping
        </Link>
      </div>
    )

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center md:text-left">
        Checkout
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products Summary */}
        <div className="flex-1 space-y-6">
          {products.map((product) => {
            const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
            return (
              <div
                key={product._id as unknown as string}
                className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02]"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="object-contain rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg md:text-xl line-clamp-2">{product.title}</h3>
                  <p className="text-green-600 font-bold text-md mt-1">${product.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mt-1">Quantity: {quantity}</p>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mt-1">
                    Subtotal: ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Form */}
        <div className="w-full lg:w-2/5 p-6 bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl flex flex-col gap-6">
          <h3 className="text-2xl font-extrabold mb-2">Payment Details</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm w-full"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm w-full"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[120px]">
                <input
                  type="text"
                  placeholder="Expiry MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm w-full"
                />
                {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
              </div>
              <div className="flex-1 min-w-[80px]">
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-sm w-full"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-emerald-400 hover:bg-emerald-600 text-white font-extrabold rounded-xl hover:scale-105 transform transition shadow-lg"
            >
              Place Order
            </Button>
          </form>

          <div className="mt-4 text-gray-500 dark:text-gray-400 text-lg md:text-xl">
            Total: <span className="font-bold text-gray-800 dark:text-gray-100">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}