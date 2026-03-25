import { CartButton } from "@/components/CartButton/CartButton";
import { Product } from "@/types/Product";
import Image from "next/image";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: "no-store" });
  const product: Product = await res.json();

  return (
    // 1. min-h-screen ensures it centers vertically on the whole page if there's little content
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full p-4">
      
      {/* 2. Added max-w-6xl to prevent the section from becoming too wide and items-center for vertical alignment */}
      <section className="w-9/10 flex flex-col md:flex-row items-center justify-center mx-auto gap-10  bg-white dark:bg-gray-800 p-8">
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-96 relative">
          <Image
            src={product.image}
            alt={product.title + " image"}
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center w-full md:w-1/2">
          {/* Category Chip */}
          <span className="inline-block bg-emerald-400 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-3xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
            {product.rating ? (
              <p className="text-yellow-500 text-lg">
                ⭐ {product.rating.rate} <span className="text-gray-400 text-sm">({product.rating.count} reviews)</span>
              </p>
            ):"Not Rated"}
          </div>

          
          <div className="flex justify-start w-1/3">
            <CartButton />
          </div>
        </div>
      </section>
    </div>
  );
}

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return products.map((product: { _id: string }) => ({
    id: product._id.toString(),
  }));
};