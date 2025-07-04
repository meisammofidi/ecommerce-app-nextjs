import NotFound from "@/app/not-found";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`
  );
  const product = await response.json();
  if (!product) return <NotFound />;

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-6 md:mb-0 md:mr-8">
        <img
          src={`/${product.imageUrl}`}
          alt={product.name}
          className="w-full h-auto rounded shadow-md"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">${product.price}</p>
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

