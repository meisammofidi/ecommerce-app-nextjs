import { NextRequest } from "next/server";
import { connectToDb } from "@/app/api/db";

type shopingCart = {
  userId: string;
  cartIds: string[];
};

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const userId = params.id;
  const { db } = await connectToDb();
  const userCart = await db
    .collection("carts")
    .findOne<shopingCart>({ userId });

  if (!userCart) {
    return new Response("Cart not found!", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartIds = userCart?.cartIds || [];
  const userShoppingCart = await db
    .collection("products")
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(JSON.stringify(userShoppingCart), {
    statusText: "OK",
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

type CartBody = {
  productId: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const userId = params.id;
  const body: CartBody = await request.json();

  const { db } = await connectToDb();
  const updatedCart = await db.collection("carts").findOneAndUpdate(
    { userId },
    {
      $addToSet: { cartIds: body.productId },
    },
    { upsert: true, returnDocument: "after" }
  );

  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart?.cartIds } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    statusText: "OK",
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const userId = params.id;
  const body: CartBody = await request.json();
  const productId = body.productId;

  const { db } = await connectToDb();

  const updatedCart = await db
    .collection("carts")
    .findOneAndUpdate(
      { userId },
      { $pull: { cartIds: productId } as any },
      { returnDocument: "after" }
    );

  // If the cart is not found, return 404
  if (!updatedCart) {
    return new Response("Cart not found!", {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Fetch the updated products in the cart
  const cartProducts = await db
    .collection("products")
    .find({ id: { $in: updatedCart.cartIds || [] } })
    .toArray();

  return new Response(JSON.stringify(cartProducts), {
    status: 203,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
