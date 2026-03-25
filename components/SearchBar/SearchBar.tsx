"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
export const SearchBar = ()=>{
     const [query,setQuery]  = useState<string>("");
    return(<section id="searchbar" className="h-1/4 flex justify-center items-center">
            <div className="w-1/3 flex gap-5">
                <Input type="text" onChange={(e)=>{
                    setQuery(e.target.value);
                }}
                placeholder="search for products" className="text-slate-200 placeholder:text-slate-400 p-7 bg-slate-700"/>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 p-7"><Search/></Button>
            </div>
            </section>)
}