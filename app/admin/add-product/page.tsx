"use client"
import ProductForm from "@/components/ProductForm/ProductForm";

export default function AddProductPage() {
  const handleAdd = async (formData: any) => {
    const res = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed");
  };

  return <ProductForm onSubmit={handleAdd} titleText="Add Product" />;
}