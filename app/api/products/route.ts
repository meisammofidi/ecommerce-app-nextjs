import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();
  const products = await db.collection("products").find().toArray();
  return new Response(JSON.stringify(products), {
    statusText: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type productBody = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
};

export async function POST(request: Request) {
  const body: productBody = await request.json();
  const { db } = await connectToDb();
  const result = await db.collection("products").insertOne(body);
  return new Response(JSON.stringify(result), {
    statusText: "Created",
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
