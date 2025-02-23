import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { Box, Drawer } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ul className="p-10">
        <li className="mt-2">
          <Link to="/">Home</Link>
        </li>
        <li className="mt-5">
          <Link to="/products">Products</Link>
        </li>
        <li className="mt-5">
          <Link to="/about">About</Link>
        </li>
        <li className="mt-5">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </Box>
  );
  return (
    <div className="flex items-center justify-between bg-gray-200 lg:px-20 px-10">
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
        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-5 text-2xl font-bold">
        <Link to="/wishlist">
          <CiHeart />
        </Link>
        <Link to="/cart">
          <IoBagOutline />
        </Link>
        <Link to="/profile">
          <CiUser />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
