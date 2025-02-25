import { Link } from "react-router-dom";
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User logout successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    });
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
        {user ? (
          <>
            <li className="mt-5">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="mt-5">
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
        <button className="cursor-pointer">
          <Badge badgeContent={4} color="primary">
            <FaRegHeart />
          </Badge>
        </button>
        <button className="cursor-pointer">
          <Badge badgeContent={4} color="primary">
            <RiShoppingBagLine />
          </Badge>
        </button>
        <Link to="/profile">
          <CiUser />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
