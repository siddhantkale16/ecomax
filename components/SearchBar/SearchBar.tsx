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

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set("query", query);
        } else {
            params.delete("query");
        }
        router.push(`/products?${params.toString()}`);
    };

    return(
    <section id="searchbar" className="w-full flex justify-center py-6">
            <div className="w-full max-w-2xl">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <Input 
                            type="text" 
                            onChange={(e)=>{
                                setQuery(e.target.value);
                            }}
                            value={query}
                            placeholder="Search products..." 
                            className="w-full h-14 pl-12 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-2xl focus:ring-primary/20 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                    </div>
                    <Button type="submit" className="h-14 px-8 bg-primary hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-indigo-glow transition-all active:scale-95">
                        Search
                    </Button>
                </form>
            </div>
    </section>
    )
}