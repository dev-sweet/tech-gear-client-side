import { useAuth } from "../../../hooks/useAuth";
import { GrDeliver } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { FaRegEdit, FaRegUser, FaStar } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { IoMdWallet } from "react-icons/io";
import { IoBagCheck } from "react-icons/io5";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <div>
        <h2 className="text-3xl">
          Hello, Welcome {user?.displayName ? user?.displayName : "Back"}
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 mt-5">
          <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r from-[#731a4a] to-[#07174e] py-10 px-5 rounded text-white">
            <span>
              <FcShipped className="text-5xl" />
            </span>
            <div className="font-bold">
              <h2 className="text-3xl">0</h2>
              <p className="text-xl">Delivered</p>
            </div>
          </div>

          <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r from-purple-500 to-indigo-700 py-10 px-5 rounded text-white">
            <span>
              <GrDeliver className="text-5xl" />
            </span>
            <div className="font-bold">
              <h2 className="text-3xl">0</h2>
              <p className="text-xl">Shipped</p>
            </div>
          </div>
          <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r   from-teal-400 to-cyan-500 py-10 px-5 rounded text-white">
            <span>
              <MdOutlinePendingActions className="text-5xl" />
            </span>
            <div className="font-bold">
              <h2 className="text-3xl">5</h2>
              <p className="text-xl">Pending</p>
            </div>
          </div>
          <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r  from-orange-500 to-red-600 py-10 px-5 rounded text-white">
            <span>
              <ImCancelCircle className="text-5xl" />
            </span>
            <div className="font-bold">
              <h2 className="text-3xl">0</h2>
              <p className="text-xl">Canceled</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col pt-3 gap-3">
        <div className="lg:w-[50%] w-full p-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg rounded-xl">
          <div className="text-right">
            <button className="text-3xl hover:cursor-pointer">
              <FaRegEdit />
            </button>
          </div>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-40 h-40 rounded-full border border-[#]">
              <img
                src={
                  user?.photURL
                    ? user?.photoURL
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="mx-auto  w-40 h-40 rounded-full"
              />
            </div>
            <div>
              <p className="text-gray-100">{user.email}</p>
            </div>
          </div>
          <div className="mt-10 w-[350px] mx-auto">
            <p className="text-white mb-2 flex justify-between">
              <strong>Name:</strong>
              <span> {user?.displayName}</span>
            </p>
            <p className="text-white mb-2 flex justify-between">
              <strong>Phone:</strong>
              <span> {user.phone ? user.phone : "Not Added"}</span>
            </p>
            <p className="text-whie mb-2 flex justify-between">
              <strong>Address:</strong>{" "}
              <span>{user.address ? user.address : "Not Added"}</span>
            </p>
            <p className="text-white">
              <strong>Other Info:</strong> <span>{user.others}</span>
            </p>
          </div>
        </div>
        <div className="lg:w-[50%] w-full p-10  bg-gradient-to-r bg-gradient-to-r from-[#07174e] to-[#731a4a]	 shadow shadow-lg rounded-lg">
          <h2 className="text-3xl text-white">Your Activities</h2>
          <div className="pt-5">
            <h3 className="text-2xl text-[#22c55e] font-bold flex gap-3 my-3">
              <BsCartCheck />
              <span> Orders : 10</span>
            </h3>

            <h3 className="text-2xl text-[#3b82f6] font-bold flex gap-3 my-3">
              <IoMdWallet />

              <span> Payment : 10</span>
            </h3>
            <h3 className="text-2xl text-[#f59e0b] font-bold flex gap-3 my-3">
              <FaStar />

              <span> Reviews : 10</span>
            </h3>
            <h3 className="text-2xl text-[#a855f7] font-bold flex gap-3 my-3">
              <IoBagCheck />

              <span> Cart : 10</span>
            </h3>
            <h3 className="text-2xl text-[#ef4444] font-bold flex gap-3 my-3">
              <BsCartCheck />
              <span> Wishlist : 10</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
