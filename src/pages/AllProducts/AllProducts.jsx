import { useEffect, useState } from "react";
import ProductCard from "../../components/Home/ProductCard/ProductCard";
import { IoSearch } from "react-icons/io5";
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
const AllProducts = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [query, setQuery] = useState({ category: "", limit: 12 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClick = async (id) => {
    setQuery({ ...query, category: id });
    setActiveTab(id);
  };

  const handleSearch = () => {
    setLoading(true);
    axios
      .get("http://localhost:5050/products", {
        params: { searchText },
      })
      .then((res) => {
        console.log("hanldeSearch", res.data);
        setProducts(res.data);
        setLoading(false);
      });
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
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
    <div className="lg:px-20 px-10 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold ">All Products</h1>
        <div className="relative flex items-center rounded-lg  w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchInput}
            className="w-full py-3 px-8 border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480]"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-3 bg-[#07174e] border-2 border-[#07174e] text-white cursor-pointer hover:text-gray-200"
          >
            <IoSearch className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex lg:space-x-2 pt-8">
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
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 h-full mt-10">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
