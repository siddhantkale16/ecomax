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
  const hasAnyDiscount = (productDiscount > 0 || globalDiscount > 0) && finalPrice < basePrice;

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
    <div className={`flex flex-row items-baseline gap-2 leading-none ${className}`}>
      <span className={`${sizeClasses[size]} text-indigo-400 dark:text-indigo-300 font-bold tracking-tight`}>
        ${finalPrice.toFixed(2)}
      </span>

      {hasAnyDiscount && (
        <span className={`${oldSizeClasses[size]} text-zinc-500 line-through decoration-zinc-200`}>
          ${basePrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};