import { getDb } from "@/lib/mongodb/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { discount } = await req.json();

    if (discount === undefined || discount < 0 || discount > 100) {
      return new Response(
        JSON.stringify({ error: "Discount must be between 0 and 100" }),
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("products");
    const id = (await params).id
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { discount } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Discount updated successfully" }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}