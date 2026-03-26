import { getDb } from "@/lib/mongodb/mongodb";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}){
    try{
        const {id} = await params 
        
        const db = await getDb();
        const collection = db.collection("products");
        const products =   await collection.findOne({_id:new ObjectId(id)},{
            projection:{
          _id:1,
          title:1,
          price:1,
          category:1,
          description:1,
          image:1,
         
          rating:1,
        }})
        if(!products){
          return new Response(JSON.stringify({ error: "Product Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
        }
          )}
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

export async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}){
   try{
        const {id} = await params 
        const db = await getDb();
        const collection = db.collection("products");
        const products =   await collection.deleteOne({_id:new ObjectId(id)});
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