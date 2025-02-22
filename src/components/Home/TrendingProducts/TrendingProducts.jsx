import { Link } from "react-router-dom";
import banner from "../../../assets/home/porto43-banner-5.png";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../ProductCard/ProductCard";
const TrendingProducts = () => {
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
  ];
  return (
    <div className="lg:p-20 p-10">
      <div className="lg:flex">
        <div className="bg-[#efedeb] font-bold p-12 text-center">
          <h2 className="text-4xl font-semibold mb-8">Top of Mind</h2>
          <img className="mx-auto" src={banner} alt="" />
          <h3 className="text-3xl font-semibold">Up to 30% OFF</h3>
          <button className="mt-3 border-b border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
            Shop Now
          </button>
        </div>
        <div className="w-full py-5 pl-5">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-2xl font-bold">Trending Products</h3>
            </div>

            <div>
              <Link
                to="products"
                className="text-blue-600 font-semibold text-l flex items-center gap-1"
              >
                VIEW ALL
                <FaChevronRight />
              </Link>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 mt-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
