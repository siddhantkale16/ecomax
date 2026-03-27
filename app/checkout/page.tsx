"use client"
import { useCart } from "@/context/CartContext"
import { useDiscount } from "@/context/DiscountContext"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ObjectId } from "mongodb"
import { Check, ArrowRight, CreditCard, Truck, Loader2, Package, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  _id: ObjectId
  title: string
  price: number
  image: string
  discount?: number
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { flatDiscount } = useDiscount()
  const [products, setProducts] = useState<Product[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId] = useState(() => Math.random().toString(36).substring(2, 11).toUpperCase())

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
    if (fullName.trim().length < 3) newErrors.fullName = "Full name required"
    if (!address.trim()) newErrors.address = "Address required"
    if (!city.trim()) newErrors.city = "City required"
    if (!/^\d{5,6}$/.test(pin)) newErrors.pin = "Invalid PIN"

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) newErrors.cardNumber = "Invalid Card"
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "MM/YY"
      if (!/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsProcessing(true)
    setSummary({
      itemCount: totals.count,
      total: totals.total,
      address: `${address}, ${city}`
    })

    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      setOrderPlaced(true)
    }, 1500)
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 bg-zinc-800 animate-in fade-in zoom-in duration-500">
        <div className="relative mb-10">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-150 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-primary text-white shadow-indigo-glow-strong border-4 border-white/20">
                <Check className="w-16 h-16" strokeWidth={4} />
            </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-black mb-4 text-zinc-100 tracking-tighter">
          Order Placed!
        </h2>
        <p className="text-zinc-500 mb-12 text-lg font-medium">Thank you for your order. We are preparing it for shipment.</p>
        
        <div className="max-w-lg w-full glass-card border-primary/20 rounded-[3rem] p-10 shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
            
            <div className="flex justify-between items-center pb-8 border-b border-zinc-900 mb-8">
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-1">Order ID</p>
                    <p className="text-3xl font-black tracking-widest text-primary font-mono">{orderId}</p>
                </div>
                <div className="px-5 py-2 bg-primary/10 rounded-full border border-primary/20">
                    <span className="text-primary font-black text-xs uppercase tracking-widest">Processing</span>
                </div>
            </div>

            <div className="space-y-6 text-left mb-8">
                <div className="flex items-center gap-4 text-zinc-400">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <p className="font-bold text-base">{summary.itemCount} Items</p>
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                    <Truck className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-base font-medium">Delivering to <span className="text-zinc-100 font-bold">{summary.address}</span></p>
                </div>
            </div>

            <p className="text-zinc-600 text-xs font-medium italic tracking-wide">
                Thanks for shopping with EcoMax!
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/products" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-10 py-7 bg-primary hover:bg-indigo-600 text-white rounded-2xl text-lg font-black shadow-indigo-glow transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                    Store <ArrowRight size={20} />
                </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-10 py-7 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl text-lg font-black hover:bg-zinc-800 transition-all">
                    Dismiss
                </Button>
            </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 bg-zinc-800">
        <h2 className="text-4xl font-black mb-8 text-zinc-100 tracking-tight">Your Cart is Empty.</h2>
        <Link href="/products">
            <Button className="px-10 py-6 bg-primary hover:bg-indigo-600 text-white rounded-2xl font-black shadow-indigo-glow transition-all">
                Return to Shop
            </Button>
        </Link>
      </div>
    )

  return (
    <div className="w-full min-h-screen bg-zinc-800 p-6 md:p-12 lg:p-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <Link href="/cart" className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-100 transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tighter">Checkout.</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Form Column */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <form onSubmit={handleSubmit} className="glass-card border-zinc-800/50 rounded-[2.5rem] p-10 shadow-2xl space-y-12">
                    <div>
                        <h3 className="text-2xl font-black text-zinc-100 mb-2">Shipping Details.</h3>
                        <p className="text-zinc-500 font-medium text-sm">Enter your delivery information below.</p>
                    </div>
                    
                    <div className="flex p-2 bg-zinc-900 rounded-[1.25rem] border border-zinc-800 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black transition-all cursor-pointer ${paymentMethod === "card" ? "bg-primary text-white shadow-indigo-glow" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <CreditCard size={18} /> Credit Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod("cod")}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-black transition-all cursor-pointer ${paymentMethod === "cod" ? "bg-primary text-white shadow-indigo-glow" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <Truck size={18} /> Cash On Delivery
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                                {errors.fullName && <p className="text-red-500 text-[10px] font-bold ml-2 underline">{errors.fullName}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Address Line</label>
                                <input type="text" placeholder="Street, building etc" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                                {errors.address && <p className="text-red-500 text-[10px] font-bold ml-2 underline">{errors.address}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">City</label>
                                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Region/State</label>
                                <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">PIN Code</label>
                                <input type="text" placeholder="000000" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                                {errors.pin && <p className="text-red-500 text-[10px] font-bold ml-2 underline">{errors.pin}</p>}
                            </div>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="pt-8 border-t border-zinc-900 space-y-6 mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Secure Card Number</label>
                                    <div className="relative">
                                        <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full h-14 px-5 pl-14 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-mono" />
                                        <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700" size={24} />
                                    </div>
                                    {errors.cardNumber && <p className="text-red-500 text-[10px] font-bold ml-2 underline">{errors.cardNumber}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">Expiry Date</label>
                                        <input type="text" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-center" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-2">CVV Security</label>
                                        <input type="password" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-full h-14 px-5 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-center" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-6 bg-primary hover:bg-indigo-600 text-white font-black text-lg rounded-xl shadow-indigo-glow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 flex items-center justify-center gap-4"
                    >
                        {isProcessing ? "SAVING..." : "PLACE ORDER"}
                        {!isProcessing && <ArrowRight size={28} />}
                    </Button>
                </form>
            </div>

            {/* Selection View Column */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="glass-card border-zinc-800/50 rounded-[2.5rem] p-10 shadow-2xl h-fit sticky top-32">
                    <h2 className="text-2xl font-black mb-10 text-zinc-100 flex items-center gap-3">
                        <Package className="text-primary" /> Order Details.
                    </h2>

                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                        {products.map((product) => {
                            const quantity = cart.find((c) => c.id === product._id)?.quantity || 0
                            const productDiscount = product.discount || 0
                            const discountFactor = (1 - productDiscount / 100) * (1 - flatDiscount / 100)
                            const finalPrice = product.price * discountFactor

                            return (
                                <div key={product._id as unknown as string} className="flex items-center gap-5 py-4 border-b border-zinc-900 last:border-0 group">
                                    <div className="w-20 h-20 relative shrink-0 bg-white border border-zinc-100 rounded-2xl p-3 shadow-inner group-hover:scale-105 transition-transform">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-zinc-100 line-clamp-1 italic">{product.title}</h3>
                                        <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">QUANTITY {quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-zinc-100 text-lg tracking-tighter">${(finalPrice * quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="mt-10 pt-10 border-t-2 border-dashed border-zinc-900 space-y-4">
                        <div className="flex justify-between text-zinc-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                            <span>SUBTOTAL SKU</span>
                            <span className="text-zinc-400 font-mono">${products.reduce((acc, p) => acc + (p.price * (cart.find(c => c.id === p._id)?.quantity || 0)), 0).toFixed(2)}</span>
                        </div>
                        {flatDiscount > 0 && (
                            <div className="flex justify-between text-primary font-black text-[10px] uppercase tracking-[0.2em]">
                                <span>DISCOUNT (-{flatDiscount}%)</span>
                                <span>APPLIED</span>
                            </div>
                        )}
                        <div className="flex flex-col gap-1 pt-6">
                             <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-[0.3em]">Total Price</span>
                            <div className="flex justify-between items-baseline">
                                <span className="text-5xl font-black text-zinc-100 tracking-tighter">${totals.total.toFixed(2)}</span>
                                <span className="text-zinc-600 text-[10px] font-bold uppercase">USD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}