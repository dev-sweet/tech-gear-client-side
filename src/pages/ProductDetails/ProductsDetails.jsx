import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  //   const product = useLoaderData();
  const product = {
    id: 1,
    name: "T-Shirt",
    price: 500,
    description: "A premium quality cotton t-shirt for ultimate comfort.",
    image: "https://via.placeholder.com/500x500.png?text=T-Shirt",
  };
  console.log(product);
  if (!product) {
    return (
      <h2 className="text-center text-2xl font-semibold text-red-500">
        Product not found
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.img}
            alt={product.title}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-3">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mt-4">
            ৳{product.price}
          </p>

          {/* Buy Now Button */}
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
