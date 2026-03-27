import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFoundPage(){
    return (
        <div className="w-full flex flex-col justify-center items-center h-[90vh] gap-15">
            <h1 className="text-6xl text-gray-800">Product Not Found </h1>
            <Link href={"/"} ><Button className="bg-amber-400 p-6">Return Home</Button></Link>
        </div>
    )
}