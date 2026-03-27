import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Footer, Navbar } from "@/components/index"
import { CartProvider } from "@/context/CartContext";
import { DiscountProvider } from "@/context/DiscountContext";

const font = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ecomax – Your One-Stop Online Store",
  description: "Shop the latest products at Ecomax. Quality, variety, and fast delivery at your fingertips.",
  keywords: ["Ecomax", "Online Store", "E-commerce", "Shop Online", "Buy Products"],
  authors: [{ name: "Ecomax Team" }],
  icons: {
    icon: "/favicon.ico", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <body className={`${font.className} min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
         <CartProvider>
          <DiscountProvider>
        <Navbar />
        <main className="flex-1 pt-20">
        {children}
        </main>
        <Footer/>
        </DiscountProvider>
        </CartProvider>
        </body>

        
    </html>
  );
}
