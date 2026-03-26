"use client";
import ProductForm from "@/components/ProductForm/ProductForm";

export default function ProductFormClient({ initialData, productId }: {initialData:any,productId:any}) {
  const handleEdit = async (formData: any) => {
    const res = await fetch(`/api/products/update-product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Failed to update product");
  };

  return <ProductForm initialData={initialData} onSubmit={handleEdit} titleText="Edit Product" />;
}