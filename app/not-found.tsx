import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFoundPage(){
    return (
        <div className="w-full flex flex-col justify-center items-center h-[90vh] gap-15">
            <h1 className="text-6xl text-gray-800">Product Not Found </h1>
            <Link href={"/"} >
              <Button className="bg-primary hover:bg-indigo-600 text-white px-8 py-6 rounded-2xl shadow-indigo-glow transition-all hover:scale-105 active:scale-95 font-bold">
                Return to Base
              </Button>
            </Link>
        </div>
    )
}