import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { Avatar, Badge, Box, Drawer } from "@mui/material";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { RiShoppingBagLine } from "react-icons/ri";
import { useAuth } from "../../../hooks/useAuth";
import { PiSignOutBold } from "react-icons/pi";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import Swal from "sweetalert2";
import "./Navbar.css";
import useWishlist from "../../../hooks/useWishlist";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const [isAdmin] = useAdmin();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // console.log(user.photoURL);
  const location = useLocation();
  const path = location.pathname;

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "User logout successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  const DrawerList = (
    <Box
      className="bg-gray-300 h-full shadow shadow-lg"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <ul className="mt-1 px-2">
        <li>
          <Link className="text-right" to="/">
            <img className="w-24" src={logo} alt="" />
          </Link>
        </li>
        <li>
          <Link
            className={`mt-2 w-full block px-8 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/" && "bg-[#07174e] text-gray-100"
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-8 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/products" && "bg-[#07174e] text-gray-100"
            }`}
            to="/products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-8 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/about" && "bg-[#07174e] text-gray-100"
            }`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-8 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/contact" && "bg-[#07174e] text-gray-100"
            }`}
            to="/contact"
          >
            Contact
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link
                className={`w-full block px-8 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              className="w-full block px-8 py-2 rounded-sm hover:bg-[#07174e] hover:text-gray-100 flex items-center gap-1 font-smibold cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </Box>
  );
  return (
    <div className="flex items-center justify-between nav-bg lg:px-20 px-10">
      {
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      }
      <div className="flex">
        <button
          className="cursor-pointer text-3xl lg:hidden"
          onClick={toggleDrawer(true)}
        >
          <span>
            <IoMdMenu className="text-white" />
          </span>
        </button>

        <Link to="/">
          <img className="w-24" src={logo} alt="" />
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex gap-5 font-semibold text-gray-400">
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#00b6ef] hover:text-[#00b6ef] ${
                path === "/" &&
                "border-b-2 border-[#00b6ef] text-[#00b6ef] font-bold"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#00b6ef] hover:text-[#00b6ef] ${
                path.includes("/products") &&
                "border-b-2 border-[#00b6ef] text-[#00b6ef] font-bold"
              }`}
              to="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2  hover:border-[#00b6ef] hover:text-[#00b6ef] ${
                path === "/about" &&
                "border-b-2 border-[#00b6ef] text-[#00b6ef] font-bold"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#00b6ef] hover:text-[#00b6ef] ${
                path === "/contact" &&
                "border-b-2 border-[#00b6ef] text-[#00b6ef] font-bold"
              }`}
              to="/contact"
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className="hover:text-blue-500 hover:border-b-2 hover:border-[#00b6ef] hover:text-[#00b6ef]"
                  to={`/dashboard/${isAdmin ? "adminHome" : "userHome"}`}
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-5 text-2xl font-semibold text-gray-200">
        <Link to="/dashboard/wishlist" className="cursor-pointer">
          <Badge badgeContent={wishlist?.length} color="error">
            <FaRegHeart />
          </Badge>
        </Link>
        <Link to="/dashboard/cart" className="cursor-pointer">
          <Badge badgeContent={cart?.length} color="info">
            <RiShoppingBagLine />
          </Badge>
        </Link>
        <button
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          onMouseEnter={() => setIsOpenProfile(true)}
          onMouseLeave={() => setIsOpenProfile(false)}
          className={"user-icon flex gap-1 items-center cursor-pointer"}
        >
          <Avatar alt="Profile Avatar" src={user?.photoURL || ""} />
          <span className="flex items-center text-sm">
            {user?.displayName.split(" ")[0]} <IoChevronDown />{" "}
          </span>

          <div className={`user-menu  ${isOpenProfile && "user-icon-active"}`}>
            <p className="text-sm">
              Welcome
              {user?.displayName ? "," + user?.displayName.split(" ")[0] : ""}
            </p>

            <ul className="mt-5 text-[16px]">
              {user?.email ? (
                <>
                  <li>
                    <Link
                      className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-300 px-2 py-1"
                      to="/dashboard"
                    >
                      <CgProfile className="text-2xl" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-300 px-2 py-1"
                      to="/dashboard"
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                      My Orders
                    </Link>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-300 px-2 py-1 cursor-pointer"
                    >
                      <MdLogout className="text-2xl" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-300 px-2 py-1"
                    to="/login"
                  >
                    <FaRegUser />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
