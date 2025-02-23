import ProductCard from "../../components/Home/ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max",
    image: "https://example.com/iphone15pro.jpg",
    price: 1199,
    discountPrice: 1050,
    ratings: 4.9,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    image: "https://example.com/sony-wh1000xm5.jpg",
    price: 399,
    discountPrice: 308,
    ratings: 4.7,
  },
  {
    id: 3,
    name: "Dell XPS 15 Laptop",
    image: "https://example.com/dell-xps15.jpg",
    price: 1699,
    ratings: 4.8,
  },
  {
    id: 4,
    name: 'Samsung 65" QLED 4K Smart TV',
    image: "https://example.com/samsung-qled65.jpg",
    price: 1299,
    ratings: 4.6,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    image: "https://example.com/apple-watch9.jpg",
    price: 429,
    ratings: 4.7,
  },
];
const AllProducts = () => {
  return (
    <div className="lg:px-20 px-10 py-10">
      <h1 className="text-3xl font-semibold ">All Products</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 h-full mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
