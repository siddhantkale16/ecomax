"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ProductForm({
  initialData,
  onSubmit,
  titleText = "Add Product",
}: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Prefill in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await onSubmit(formData);

      setMessage("Successfully Added Product!");

      // Reset only if it's ADD mode
      if (!initialData) {
        setFormData({
          title: "",
          description: "",
          image: "",
          price: "",
          category: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
          {titleText}
        </h1>

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

          {/* Submit */}
          <div className="mt-4 text-center">
            <Button
              type="submit"
              className={`w-full bg-emerald-400 hover:bg-emerald-600 text-white font-semibold p-6 rounded-lg transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                ? "Update Product"
                : "Add Product"}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-center mt-4 font-semibold text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}