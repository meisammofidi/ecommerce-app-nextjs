import { NextRequest } from "next/server";
import { connectToDb } from "../../db";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const productId = params.id;
  const { db } = await connectToDb();
  const product = await db.collection("products").findOne({ id: productId });

  if (!product) {
    return new Response("Product not found!", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
