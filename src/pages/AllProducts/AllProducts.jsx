import { useEffect, useState } from "react";
import ProductCard from "../../components/Home/ProductCard/ProductCard";
import { IoSearch } from "react-icons/io5";
import TrendingProducts from "../../components/Home/TrendingProducts/TrendingProducts";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import axios from "axios";
import ProductLoadingSkeleton from "../../components/Shared/ProductLoadingSkeleton/ProductLoadingSkeleton";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({ search: "" });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSort = (e) => {
    const sortItem = e.target.value.split(",");
    setQuery({ ...query, sortBy: sortItem[0], order: sortItem[1] });
  };

  const handleMinPrice = (e) => {
    setQuery({ ...query, minPrice: e.target.value });
  };
  const handleMaxPrice = (e) => {
    setQuery({ ...query, maxPrice: e.target.value });
  };

  const handleCategory = (e) => {
    setQuery({ ...query, category: e.target.value });
  };

  const handleSearch = () => {
    setQuery({ ...query, search: searchText });
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setQuery({ ...query, search: e.target.value });
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
    <div className="">
      <div className="flex md:flex-row flex-col items-center justify-between bg-gray-200 py-5 md:px-20 px-10 gap-5">
        <div className="order-2 md:order-1 flex justify-s md:gap-5 gap-1 flex-wrap">
          <div>
            <label htmlFor="">Sort By</label> <br />
            <select
              onChange={handleSort}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] md:py-3 md:px-5 p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value="name,asc">Name (A-Z)</option>
              <option value="name,desc">Name (Z-A)</option>
              <option value="sellPrice,asc">Price (Low &gt; High) </option>
              <option value="sellPrice,desc">Price (High &gt; Low) </option>
            </select>
          </div>
          <div>
            <label htmlFor="">Min Price</label> <br />
            <select
              onChange={handleMinPrice}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] md:py-3 md:px-5 p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
              <option value={5000}>5000</option>
              <option value={10000}>10000</option>
              <option value={20000}>20000</option>
              <option value={50000}>50000</option>
              <option value={100000}>100000</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Max Price</label> <br />
            <select
              onChange={handleMaxPrice}
              defaultValue=""
              className="border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480] md:py-3 md:px-5 p-1"
            >
              <option value="" disabled={true}>
                Select
              </option>
              <option value={100}>100</option>
              <option value={500}>500</option>
              <option value={1000}>1000</option>
              <option value={2000}>2000</option>
              <option value={5000}>5000</option>
              <option value={10000}>10000</option>
              <option value={20000}>20000</option>
              <option value={50000}>50000</option>
              <option value={100000}>100000</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Category:</label> <br />
            <select
              onChange={handleCategory}
              className="select border-2 border-gray-400 focus:border-[#2b4190]  outline-none md:py-3 md:px-5 p-1 focus:border-2"
              defaultValue=""
            >
              <option value="">All</option>
              <option value="laptop">Laptop</option>
              <option value="phone">phone</option>
              <option value="earbuds">Earbuds</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="camera">Camera</option>
              <option value="smartwatch">Smartwatch</option>
              <option value="tablet">Tablet</option>
              <option value="drone">Drone</option>
              <option value="speaker">Speaker</option>
            </select>
          </div>
        </div>
        <form
          className="order-1 md:order-2 w-full md:w-80"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex items-center rounded-lg  w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearchInput}
              // value={searchText}
              className="w-full py-3 px-8 border-2 border-[#000f444f]  focus:outline-none focus:border-[#000f4480]"
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-4 py-3 bg-[#07174e] border-2 border-[#07174e] text-white cursor-pointer hover:text-gray-200"
            >
              <IoSearch className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
      <div className="md:px-20 px-10">
        <h2 className="text-3xl pt-5 font-semibold">
          {!searchText && "All Products"}
        </h2>
        {searchText ? (
          <p className="text-lg font-bold">Showing result for {searchText}</p>
        ) : (
          ""
        )}
        {Object.keys(query).length > 0 && products.length > 0 && (
          <p className="text-lg mt-2 font-semibold">
            Total Found Products: {products.length}
          </p>
        )}
        {products.length < 1 && !loading && (
          <p className="text-lg mt-2 font-semibold">
            Do not matches any products
          </p>
        )}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 h-full mt-10">
          {loading ? (
            <>
              <ProductLoadingSkeleton />
              <ProductLoadingSkeleton />
              <ProductLoadingSkeleton />
              <ProductLoadingSkeleton />
              <ProductLoadingSkeleton />
            </>
          ) : (
            products?.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
                isWishlisted={true}
                index={i}
              />
            ))
          )}
        </div>
      </div>
      <TrendingProducts />
      <Newsletter />
    </div>
  );
};

export default AllProducts;
