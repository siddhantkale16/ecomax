"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

      setMessage("Product successfully saved.");

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
      setMessage("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-700 p-6 md:p-12">
      <div className="w-full max-w-2xl glass-card rounded-[3rem] p-10 md:p-14 shadow-2xl border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32"></div>
        
        <h1 className="text-4xl font-black text-zinc-100 mb-10 text-center tracking-tighter">
          {titleText}.
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[12px] font-black text-slate-200 uppercase tracking-[0.3em] ml-2">Product Name</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[12px] font-black text-slate-200 uppercase tracking-[0.3em] ml-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product..."
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl px-5 py-4 min-h-37.5 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price */}
            <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-200 uppercase tracking-[0.3em] ml-2">Price ($)</label>
                <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="text-[12px] font-black text-slate-200 uppercase tracking-[0.3em] ml-2">Category</label>
                <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                required
                />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-[12px] font-black text-slate-200 uppercase tracking-[0.3em] ml-2">Image URL</label>
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://assets.ecomax.com/image.jpg"
              required
            />
          </div>

          {/* Submit */}
          <div className="mt-10 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-primary hover:bg-indigo-600 text-white font-black text-lg rounded-xl shadow-indigo-glow transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
            >
              {isSubmitting
                ? "SAVING..."
                : initialData
                ? "UPDATE PRODUCT"
                : "ADD PRODUCT"}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <p className={`text-center mt-6 font-bold text-xs uppercase tracking-widest ${message.includes('success') ? 'text-primary' : 'text-zinc-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}