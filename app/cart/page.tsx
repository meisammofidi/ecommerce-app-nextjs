import ShoppingCartList from "./ShoppingCartList";

export default async function CartPage() {
  const userCarts = await fetch("http://localhost:3000/api/users/1/cart", {
    cache: "no-cache",
  });
  const carts = await userCarts.json();

  return <ShoppingCartList initialCartProducts={carts} />;
}
