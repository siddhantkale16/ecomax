
import ProductFormClient from "@/components/ProductForm/ProductFormClient";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: {params:Promise<{id:string}>}) {
  const {id} =  await params;

   const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if(!res.ok){
     notFound();
  }
const product = await res.json();
  return <ProductFormClient initialData={product} productId={product._id} />;
}