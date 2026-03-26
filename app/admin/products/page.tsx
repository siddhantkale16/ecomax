import Link from "next/link";
import { Product } from "@/types/Product";
import { AdminProductCard } from "@/components/AdminProductCard/AdminProductCard";

export default async function AdminProductsPage() {
  const res = await fetch("http://localhost:3000/api/admin/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  return (
    <section id="products" className="mt-10 w-full flex flex-col items-center">
      {/* Add Product Button */}
      <div className="w-2/3 mb-6 flex justify-center">
        <Link href="/admin/add-product">
          <button className="bg-emerald-400 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <AdminProductCard key={product._id as unknown as string} productData={product} />
        ))}
      </div>
    </section>
  );
}