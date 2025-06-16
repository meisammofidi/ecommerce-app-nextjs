import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">My Store</div>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <Link href="/checkout" className="hover:underline">
              Checkout
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}
