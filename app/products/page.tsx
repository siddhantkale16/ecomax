import { ProductCard } from "@/components/ProductCard/ProductCard";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Product } from "@/types/Product";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
  const products: Product[] = await res.json();

  return (
    <div className="p-30">
      <SearchBar />
      <section id="products" className="mt-30 flex justify-center w-full">
        <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id as unknown as string} productData={product} />
          ))}
        </div>
      </section>
    </div>
  );
}