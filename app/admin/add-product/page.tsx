"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();
      console.log("Product added:", data);

      // Show success message
      setSuccessMessage("✅ Product added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      setSuccessMessage("❌ Failed to add product. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows={4}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter product category"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <Button
              type="submit"
              className={`w-full bg-emerald-400 hover:bg-emerald-600 text-white font-semibold p-6 rounded-lg transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting} // disables while submitting
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </Button>
          </div>

          {/* Success / Error Message */}
          {successMessage && (
            <p className="text-center mt-4 font-semibold text-gray-700">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}