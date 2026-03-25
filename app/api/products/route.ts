import { getDb } from "@/lib/mongodb/mongodb";
export async function GET(){
    try{
        const db = await getDb();
        const collection = db.collection("products");
        const products =  await collection.find({},).project({
          _id:0,
          title:1,
          price:1,
          category:1,
          image:1,
          id:1,
          rating:1,
        }).toArray();
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