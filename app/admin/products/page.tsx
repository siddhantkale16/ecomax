import Link from "next/link";
import { Product } from "@/types/Product";
import { AdminProductCard } from "@/components/AdminProductCard/AdminProductCard";
import { Plus, Package } from "lucide-react";
import { FlatDiscountButton } from "@/components/FlatDiscountButton/FlatDiscountButton";

export default async function AdminProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  return (
    <section id="admin-products" className="min-h-screen bg-zinc-800 p-10 flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-4xl font-black text-zinc-100 tracking-tighter">Admin Inventory.</h1>
        
        <div className="flex gap-4">
          <Link href="/admin/add-product">
            <button className="bg-primary hover:bg-indigo-600 text-white rounded-2xl p-4 transition shadow-indigo-glow hover:shadow-indigo-glow-strong hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer">
              <Plus size={24} />
              <span className="font-black pr-2 uppercase tracking-tight text-sm">Add Product</span>
            </button>
          </Link>
          <FlatDiscountButton/>
        </div>
      </div>

      {/* Grid updated to 3 columns as per feedback */}
      {products.length ? (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <AdminProductCard key={product._id as unknown as string} productData={product} />
          ))}
        </div>
      ) : (
        <div className="text-zinc-500 flex flex-col items-center justify-center py-20 w-full glass-card rounded-[2rem] border-dashed border-zinc-800">
          <Package size={48} className="mb-4 opacity-20" />
          <p className="text-xl font-medium text-zinc-400 font-bold">No items in database.</p>
        </div>
      )}
    </section>
  );
}