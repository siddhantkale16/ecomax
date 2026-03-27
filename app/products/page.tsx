import { Product } from "@/types/Product";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import Link from "next/link";

export default async function ProductsPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ category?: string, query?: string }> 
}) {
  const { category, query: rawQuery } = await searchParams;
  const query = rawQuery?.toLowerCase() || "";
  
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  let filteredProducts = products;

  // Category Filtering
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search Filtering
  if (query) {
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
    );
  }

  const categories = ["all", ...new Set(products.map(p => p.category.toLowerCase()))];

  return (
    <div className="min-h-screen bg-zinc-700 p-6 md:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-zinc-100 tracking-tighter">All Products.</h1>
            <p className="text-zinc-500 font-medium text-lg max-w-md">Discover our premium range of essential items.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}${query ? `&query=${query}` : ''}`}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  (category === cat || (!category && cat === "all"))
                    ? "bg-primary border-primary text-white shadow-indigo-glow"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-700"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Restore Search Bar */}
        <div className="mb-16">
            <SearchBar defaultValue={query} />
        </div>

        {/* Results Grid - 3 columns, square cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id as unknown as string} productData={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-600">
            <span className="text-8xl font-black opacity-10 mb-4 tracking-tighter text-zinc-400">NO RESULTS.</span>
            <p className="text-lg font-bold">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}