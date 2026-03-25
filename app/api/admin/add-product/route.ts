import { getDb } from "@/lib/mongodb/mongodb";
import { NextRequest } from "next/server";
export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const product = {...body,price:Number(body.price)}
        const db = await getDb();
        const collection = db.collection("products");
        const res =  await collection.insertOne({...product,adminAdded:true});
        return new Response(JSON.stringify({message:"Product Added Successfully"}), {
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