import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
const tabs = [
  { id: "all", label: "All" },
  { id: "laptop", label: "Laptop" },
  {
    id: "phone",
    label: "Phone",
  },
  { id: "gaming", label: "Gaming" },
  { id: "music", label: "Music" },
];
const Products = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  //   const [products, setProducts] = useState(null);
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

  const handleClick = (id) => {
    setActiveTab(id);
    // setProducts("");
  };
  return (
    <div className="mx-auto lg:px-20 px-10 mt-5">
      <div className="flex lg:space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`py-2 px-4 transition-all hover:cursor-pointer text-sm xsm:text-xsm font-semibold ${
              activeTab === tab.id
                ? "bg-gray-800 border-b-2 text-white font-semibold"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 p-2">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 h-full">
          {products.map((product) => (
            <ProductCard
              className="h-full "
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
