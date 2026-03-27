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
        className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-full p-5 transition flex items-center justify-center"
      >
        <Tag size={28} />
      </button>

      {isModalOpen && <FlatDiscountModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};