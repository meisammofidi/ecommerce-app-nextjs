"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./product-data";

export default function ProductsList({
  products,
  initialCartProducts = [],
}: {
  products: Product[];
  initialCartProducts: Product[];
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  async function addProductToCart(productId: string) {
    const response = await fetch(`http://localhost:3000/api/users/1/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }
  async function removeProductFromCart(productId: string) {
    const response = await fetch(`http://localhost:3000/api/users/1/cart`, {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }

  function productIsInCart(productId: string) {
    return cartProducts.some((product) => product.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="block border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-centermb-4 h-48 relative">
            <Image
              src={`/${product.imageUrl}`}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p>Price: ${product.price.toFixed(2)}</p>
          {productIsInCart(product.id) ? (
            <button
              className="bg-blue-500 text-white px-4 py-2  mb-5 rounded"
              onClick={(e) => {
                e.preventDefault();
                removeProductFromCart(product.id);
              }}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2  mb-5 rounded"
              onClick={(e) => {
                e.preventDefault();
                addProductToCart(product.id);
              }}
            >
              Add to Cart
            </button>
          )}
        </Link>
      ))}
    </div>
  );
}
