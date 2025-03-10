import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { CiUser } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { Badge, Box, Drawer } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { useAuth } from "../../../hooks/useAuth";
import { PiSignOutBold } from "react-icons/pi";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
      <ul className="mt-1 px-5 text-center">
        <li>
          <Link className="text-right" to="/">
            <img className="w-24" src={logo} alt="" />
          </Link>
        </li>
        <li>
          <Link
            className={`mt-2 w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/" && "bg-[#07174e] text-gray-100"
            }`}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/products" && "bg-[#07174e] text-gray-100"
            }`}
            to="/products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
              path === "/about" && "bg-[#07174e] text-gray-100"
            }`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 ${
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
                className={`w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="w-full block px-15 py-2 rounded-sm hover:bg-[#07174e]  hover:text-gray-100 flex items-center gap-1 font-smibold cursor-pointer"
              >
                <PiSignOutBold />

                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </Box>
  );
  return (
    <div className="flex items-center justify-between bg-[#dfe0ff] lg:px-20 px-10">
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
            <IoMdMenu />
          </span>
        </button>

        <Link to="/">
          <img className="w-24" src={logo} alt="" />
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex gap-5 font-semibold text-gray-600">
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#0027af] hover:text-[#0027af] ${
                path === "/" &&
                "border-b-2 border-[#0027af] text-[#0027af] font-bold"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#0027af] hover:text-[#0027af] ${
                path === "/products" &&
                "border-b-2 border-[#0027af] text-[#0027af] font-bold"
              }`}
              to="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#0027af] hover:text-[#0027af] ${
                path === "/about" &&
                "border-b-2 border-[#0027af] text-[#0027af] font-bold"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text hover:border-b-2 hover:border-[#0027af] hover:text-[#0027af] ${
                path === "/contact" &&
                "border-b-2 border-[#0027af] text-[#0027af] font-bold"
              }`}
              to="/contact"
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-1 font-smibold cursor-pointer"
                >
                  <PiSignOutBold />

                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-5 text-2xl font-bold">
        <Link to="/dashboard/wishlist" className="cursor-pointer">
          <Badge badgeContent={3} color="primary">
            <FaRegHeart />
          </Badge>
        </Link>
        <Link to="/dashboard/cart" className="cursor-pointer">
          <Badge badgeContent={cart?.length} color="primary">
            <RiShoppingBagLine />
          </Badge>
        </Link>
        <Link to="/profile">
          <CiUser />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
