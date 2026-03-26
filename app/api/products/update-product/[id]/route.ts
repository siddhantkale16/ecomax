import { getDb } from "@/lib/mongodb/mongodb";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { _id, ...rest } = body;

    const updatedProduct = {
      ...rest,
      price: Number(rest.price),
    };

    const db = await getDb();
    const collection = db.collection("products");

    const res = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updatedProduct }
    );

    if (res.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Product updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}