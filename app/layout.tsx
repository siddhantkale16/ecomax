import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Footer, Navbar } from "@/components/index"
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });


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
      <body className={`${poppins.className} min-h-full flex flex-col`}>
         <CartProvider>
        <Navbar />
        <main className="flex-1 pt-20">
        {children}
        </main>
        <Footer/>
        </CartProvider>
        </body>

        
    </html>
  );
}
