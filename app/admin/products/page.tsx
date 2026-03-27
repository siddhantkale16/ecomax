import Link from "next/link";
import { Product } from "@/types/Product";
import { AdminProductCard } from "@/components/AdminProductCard/AdminProductCard";
import { Plus } from "lucide-react"; // For Add Product icon
import { FlatDiscountButton } from "@/components/FlatDiscountButton/FlatDiscountButton";

export default async function AdminProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  return (
    <section id="products" className="m-10 w-full flex flex-col items-center">
      {/* Add Product Button (now circular icon) */}
      <div className="w-2/3 mb-6 flex gap-5 justify-end">
        <Link href="/admin/add-product">
          <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full p-4 transition shadow-lg shadow-amber-600/20 active:scale-[0.95]">
            <Plus size={36} />
          </button>
        </Link>
        <FlatDiscountButton/>
      </div>

      {/* Products Grid */}
      {products.length ? (
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <AdminProductCard key={product._id as unknown as string} productData={product} />
          ))}
        </div>
      ) : (
        <div className="text-gray-800 flex justify-center w-full items-center text-xl">
          <p>No Added Products.</p>
        </div>
      )}
    </section>
  );
}