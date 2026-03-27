"use client";
import { useDiscount } from "@/context/DiscountContext";

interface ProductPriceProps {
  basePrice: number;
  productDiscount?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const ProductPrice = ({
  basePrice,
  productDiscount = 0,
  className = "",
  size = "md",
}: ProductPriceProps) => {
  const { flatDiscount } = useDiscount();
  const globalDiscount = flatDiscount || 0;
  
  const discountFactor = (1 - productDiscount / 100) * (1 - globalDiscount / 100);
  const finalPrice = basePrice * discountFactor;
  const hasAnyDiscount = productDiscount > 0 || globalDiscount > 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  };

  const oldSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-lg",
  };

  return (
    <div className={`flex flex-col items-start leading-tight ${className}`}>
      {hasAnyDiscount && (
        <span className={`${oldSizeClasses[size]} text-red-500 line-through opacity-70`}>
          ${basePrice.toFixed(2)}
        </span>
      )}
      <span className={`${sizeClasses[size]} text-amber-600 font-extrabold`}>
        ${finalPrice.toFixed(2)}
      </span>
    </div>
  );
};
