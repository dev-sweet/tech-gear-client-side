import { Link } from "react-router-dom";

const Wishlist = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
          alt="Empty Wishlist"
          className="w-40 h-40"
        />

        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-2">Start adding your favorite items!</p>

        <Link
          to="/products"
          className="mt-6 px-6 py-3 bg-[#07174e] text-white text-lg font-medium rounded-lg shadow-md hover:bg-[#242283] transition cursor-pointer"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
