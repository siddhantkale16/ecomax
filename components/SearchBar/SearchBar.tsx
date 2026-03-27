"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = ({defaultValue}:{defaultValue:string})=>{
     const [query,setQuery]  = useState<string>(defaultValue);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  const params = new URLSearchParams(searchParams.toString());
    params.set("query", query); 
 router.push(`/products?${params.toString()}`);
};

    return(<section id="searchbar" className="h-1/4 flex justify-center items-center">
            <div className="w-1/3 ">
            <form onSubmit={handleSearch} className="flex gap-5">
                <Input type="text" onChange={(e)=>{
                    setQuery(e.target.value);
                }}
                value={query}
                placeholder="search for products" className="text-zinc-200 placeholder:text-zinc-400 p-7 bg-zinc-700"/>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 p-7"><Search/></Button>
                </form>
            </div>
            </section>)
}