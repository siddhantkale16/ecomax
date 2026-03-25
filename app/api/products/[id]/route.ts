import { getDb } from "@/lib/mongodb/mongodb";
import { NextRequest } from "next/server";
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}){
    try{
        const {id} = await params 
        const numId = Number(id);
        const db = await getDb();
        const collection = db.collection("products");
        const products =   await collection.findOne({id:numId},{
            projection:{
          _id:0,
          title:1,
          price:1,
          category:1,
          description:1,
          image:1,
          id:1,
          rating:1,
        }})
        return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    }
    catch(err:any){
       return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
    }
}