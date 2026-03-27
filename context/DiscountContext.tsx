"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DiscountContextType {
  flatDiscount: number;
  setFlatDiscount: (value: number) => void;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
  const [flatDiscount, setFlatDiscountState] = useState<number>(0);

  useEffect(() => {
    const savedDiscount = localStorage.getItem("ecoMaxFlatDiscount");
    if (savedDiscount) {
      setFlatDiscountState(Number(savedDiscount));
    }
  }, []);

  const setFlatDiscount = (value: number) => {
    setFlatDiscountState(value);
    localStorage.setItem("ecoMaxFlatDiscount", value.toString());
  };

  return (
    <DiscountContext.Provider value={{ flatDiscount, setFlatDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (!context) throw new Error("useDiscount must be used within DiscountProvider");
  return context;
};