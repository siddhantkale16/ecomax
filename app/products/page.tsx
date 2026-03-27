import { ProductCard } from "@/components/ProductCard/ProductCard";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Product } from "@/types/Product";
import Link from "next/link";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ query?: string; category?: string }> }) {
  const search = await searchParams;
  const query = search.query || "";
  const selectedCategory = search.category || "All";
  console.log(selectedCategory);

  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  const categories = ['All', "Men's clothing", "Women's Clothing", 'Electronics', 'Jewelery'];

  
  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() ===(selectedCategory.toLowerCase());
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="p-8">
      <SearchBar defaultValue={query} />

      
      <div className="flex gap-8 mt-3  justify-center">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <Link
              key={cat}
              href={`/products?query=${encodeURIComponent(query)}${cat !== 'All' ? `&category=${cat.toLowerCase()}` : ''}`}
              className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap
                ${isActive ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20' : 'bg-white text-gray-700 border-gray-700 hover:bg-amber-600 hover:text-white transition'}`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Products Grid */}
      <section id="products" className="mt-6 flex justify-center w-full">
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id as unknown as string} productData={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}