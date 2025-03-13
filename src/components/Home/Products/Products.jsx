import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";

const tabs = [
  { id: "", label: "All" },
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
  const [query, setQuery] = useState({ category: "", limit: 12 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClick = async (id) => {
    setQuery({ ...query, category: id });
    setActiveTab(id);
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://tech-gear-server.onrender.com/products", {
        params: query,
      })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
  }, [query]);

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
          {products?.map((product) => (
            <ProductCard
              loading={loading}
              className="h-full "
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
