"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { FlatDiscountModal } from "../FlatDiscountModal/FlatDiscountModal";

export const FlatDiscountButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-zinc-900 border border-zinc-800 hover:border-primary/50 text-primary rounded-2xl p-4 transition-all flex items-center justify-center shadow-lg hover:shadow-indigo-glow group"
        title="Global Discount"
      >
        <Tag size={28} className="group-hover:scale-110 transition-transform" />
      </button>

      {isModalOpen && <FlatDiscountModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};