"use client"
import { useCart } from "@/context/CartContext"
import { useDiscount } from "@/context/DiscountContext"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ObjectId } from "mongodb"
import { Check, ArrowRight, CreditCard, Truck, Loader2, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  _id: ObjectId
  title: string
  price: number
  image: string
  discount?: number
}

const inputClass = "p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-600 transition shadow-sm w-full cursor-text"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { flatDiscount } = useDiscount()
  const [products, setProducts] = useState<Product[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId] = useState(() => Math.random().toString(36).substring(2, 11).toUpperCase())

  // Order Summary State (to persist after cart is cleared)
  const [summary, setSummary] = useState({
    itemCount: 0,
    total: 0,
    address: ""
  })

  const [fullName, setFullName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pin, setPin] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card")
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

  const totals = useMemo(() => {
    let count = 0;
    const total = products.reduce((sum, product) => {
      const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
      count += quantity
      const productDiscount = product.discount || 0
      const discountFactor = (1 - productDiscount / 100) * (1 - flatDiscount / 100)
      const finalPrice = product.price * discountFactor
      return sum + finalPrice * quantity
    }, 0)
    return { count, total }
  }, [products, cart, flatDiscount])

  const validateForm = () => {
    const newErrors: {[key:string]: string} = {}
    if (fullName.trim().length < 3) newErrors.fullName = "Full name must be at least 3 characters"
    if (!address.trim()) newErrors.address = "Address is required"
    if (!city.trim()) newErrors.city = "City is required"
    if (!/^\d{5,6}$/.test(pin)) newErrors.pin = "PIN must be 5-6 digits"

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) newErrors.cardNumber = "Card number must be 16 digits"
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "Expiry must be MM/YY"
      if (!/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    // Capture summary before clearing cart
    setSummary({
      itemCount: totals.count,
      total: totals.total,
      address: `${address}, ${city}`
    })

    // Simulate processing
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      setOrderPlaced(true)
    }, 1500)
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-16 animate-in fade-in zoom-in duration-500">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-600/10 blur-2xl rounded-full scale-125"></div>
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-amber-600 text-white shadow-xl shadow-amber-600/30">
                <Check className="w-12 h-12" strokeWidth={4} />
            </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
          Order Success!
        </h2>
        
        <div className="max-w-md w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl mb-10">
            <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-gray-700 mb-6">
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Order ID</p>
                    <p className="text-xl font-black tracking-wider text-amber-600">#{orderId}</p>
                </div>
                <div className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-100 dark:border-amber-900/40">
                    <span className="text-amber-700 dark:text-amber-400 font-bold text-xs uppercase">Processing</span>
                </div>
            </div>

            <div className="space-y-4 text-left mb-6">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    <p className="font-bold text-sm">{summary.itemCount} Items Purchased</p>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-sm">Shipping to <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{summary.address}</span></p>
                </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed italic">
                Thank you for choosing EcoMax.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            <Link
                href="/products"
                className="px-8 py-4 bg-amber-600 text-white rounded-xl text-md font-black shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
                Continue Shopping <ArrowRight size={18} />
            </Link>
            <Link
                href="/"
                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-xl text-md font-black hover:bg-gray-200 dark:hover:bg-gray-600 transition active:scale-[0.98] cursor-pointer"
            >
                Home
            </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
        <h2 className="text-3xl font-black mb-4">Empty Bag.</h2>
        <Link href="/products" className="px-8 py-3 bg-amber-600 text-white rounded-xl font-black shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition cursor-pointer">
          Explore Store
        </Link>
      </div>
    )

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-black tracking-tight mb-8">
          Checkout.
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Summary Column */}
        <div className="w-full lg:flex-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Package className="text-amber-600" /> Items
            </h2>

            <div className="space-y-4 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
              {products.map((product) => {
                const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
                const productDiscount = product.discount || 0
                const discountFactor = (1 - productDiscount / 100) * (1 - flatDiscount / 100)
                const finalPrice = product.price * discountFactor

                return (
                  <div key={product._id as unknown as string} className="flex items-center gap-4 py-2 border-b border-gray-50 dark:border-gray-700/30 last:border-0">
                    <div className="w-16 h-16 relative shrink-0 bg-white border border-gray-100 rounded-xl p-2 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1 text-sm">{product.title}</h3>
                      <p className="text-amber-600 text-[10px] font-black uppercase">Qty {quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 dark:text-white">${(finalPrice * quantity).toFixed(2)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-100 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                <span>Items Subtotal</span>
                <span>${products.reduce((acc, p) => acc + (p.price * (cart.find(c => c.id === p._id)?.quantity || 0)), 0).toFixed(2)}</span>
              </div>
              {flatDiscount > 0 && (
                <div className="flex justify-between text-amber-600 font-black text-[10px] uppercase tracking-widest">
                  <span>EcoMax Special (-{flatDiscount}%)</span>
                  <span>Applied</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-4">
                <span className="text-gray-900 dark:text-white font-black text-2xl tracking-tighter">${totals.total.toFixed(2)}</span>
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Payable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="w-full lg:w-105">
          <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl space-y-8">
            <h3 className="text-xl font-black">Delivery Details.</h3>
            
            <div className="flex p-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black transition-all cursor-pointer ${paymentMethod === "card" ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" : "text-gray-400 hover:text-gray-600"}`}
              >
                <CreditCard size={16} /> Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-black transition-all cursor-pointer ${paymentMethod === "cod" ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Truck size={16} /> Cash
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Name</label>
                <input type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
                {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                <input type="text" placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
                {errors.address && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                  <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
                  {errors.city && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.city}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PIN</label>
                  <input type="text" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} className={inputClass} />
                  {errors.pin && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.pin}</p>}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={inputClass} />
                    {errors.cardNumber && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expiry</label>
                      <input type="text" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className={inputClass} />
                      {errors.expiry && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.expiry}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                      <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} className={inputClass} />
                      {errors.cvv && <p className="text-red-500 text-[10px] mt-1 font-bold ml-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full py-8 bg-amber-600 hover:bg-amber-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-amber-600/20 transition active:scale-[0.98] disabled:opacity-70 cursor-pointer"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Place Order <ArrowRight size={20} />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}