import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  IoBagCheckOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiFillProduct, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegEnvelope, FaUsers } from "react-icons/fa";
import {
  MdChecklistRtl,
  MdEditNote,
  MdMovieEdit,
  MdOutlineCreate,
  MdOutlineDarkMode,
  MdOutlineRateReview,
} from "react-icons/md";
import { ImList } from "react-icons/im";
import { useState } from "react";
import logo from "../assets/logo.png";
import useAdmin from "../hooks/useAdmin";
import { Badge } from "@mui/material";
import { FaRegMessage } from "react-icons/fa6";

const drawerWidth = 240;

function DashboardLayout() {
  const [isAdmin] = useAdmin();
  const location = useLocation();
  const path = location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="text-white">
      <div className="text-right">
        <Link to="/">
          <img className="h-[100px] w-[100px] ml-2" src={logo} alt="" />
        </Link>
        <Divider className="bg-gray-500"></Divider>
      </div>
      {isAdmin ? (
        <List>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("adminHome") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/adminHome"
            >
              <div className="flex items-center gap-3">
                <IoHomeOutline className="text-xl" />
                <ListItemText>Admin Home</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("manageOrders") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/manageOrders"
            >
              <div className="flex items-center gap-3">
                <ImList className="text-lg" />

                <ListItemText>Manage Orders</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("addProduct") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/addProduct"
            >
              <div className="flex items-center gap-3">
                <IoMdAdd className="text-xl" />
                <ListItemText>Add Product</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("manageProducts") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/manageProducts"
            >
              <div className="flex items-center gap-2">
                <MdEditNote className="text-2xl" />

                <ListItemText>Manage Products</ListItemText>
              </div>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("manageUsers") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/manageUsers"
            >
              <div className="flex items-center gap-3">
                <FaUsers className="text-xl" />

                <ListItemText>Manage Users(10)</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("createBlog") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/createBlog"
            >
              <div className="flex items-center gap-3">
                <MdOutlineCreate className="text-xl" />

                <ListItemText>Create A Blog</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm hover:bg-gray-500${
                path.includes("manageBlogs") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/manageBlogs"
            >
              <div className="flex items-center gap-3">
                <MdMovieEdit className="text-xl" />

                <ListItemText>Manage Blogs</ListItemText>
              </div>
            </Link>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm ${
                path.includes("userHome") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/userHome"
            >
              <div className="flex items-center gap-3">
                <IoHomeOutline className="text-xl" />
                <ListItemText>User Home</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm ${
                path.includes("cart") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/cart"
            >
              <div className="flex items-center gap-3">
                <IoBagCheckOutline className="text-xl" />

                <ListItemText>My Cart </ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm ${
                path.includes("wishlist") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/wishlist"
            >
              <div className="flex items-center gap-3">
                <MdChecklistRtl className="text-xl" />

                <ListItemText>My Wishlist</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm ${
                path.includes("paymentHistory") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/paymentHistory"
            >
              <div className="flex items-center gap-3">
                <AiOutlineShoppingCart className="text-xl" />

                <ListItemText>My Orders</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              onClick={handleDrawerClose}
              className={`w-full mx-1 px-5 py-2 rounded-sm ${
                path.includes("addReview") &&
                "bg-[#00081c] text-gray-400 shadow shadow-[#002c9b] border border-[#002c9b]"
              }`}
              to="/dashboard/addReview"
            >
              <div className="flex items-center gap-3">
                <MdOutlineRateReview className="text-xl" />

                <ListItemText>Review Us</ListItemText>
              </div>
            </Link>
          </ListItem>
        </List>
      )}

      <br />
      <Divider className="bg-gray-500" />
      <br />
      <List>
        <ListItem disablePadding>
          <Link className="w-full px-5 mb-3" to="/">
            <div className="flex items-center gap-3">
              <IoHomeOutline className="text-xl" />

              <ListItemText>Home</ListItemText>
            </div>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link className="w-full px-5 mb-3" to="/products">
            <div className="flex items-center gap-3">
              <AiFillProduct />

              <ListItemText>Shop</ListItemText>
            </div>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link className="w-full px-5" to="/contact">
            <div className="flex items-center gap-3">
              <FaRegEnvelope className="text-xl" />

              <ListItemText>Contact</ListItemText>
            </div>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },

          ml: { sm: `${drawerWidth}px` },
          background: "rgba(227, 227, 227, 0.77)!important",
          boxShadow: "1px 1px 1px 1px rgb(241 241 241)",
        }}
      >
        <Toolbar
          sx={{
            border: 0,
            width: "100%",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "black", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between w-full gap-5">
            <div className="flex items-center rounded w-3/4 border-1 border-[#000551] px-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-gray-600 placeholder:text-gray-700 py-1 md:py-2 px-8  focus:outline-none"
              />
              <button className="text-[#07174e] cursor-pointer">
                <IoSearch className="text-2xl" />
              </button>
            </div>
            <div className="flex items-center justify-end md:gap-3 gap-1">
              <Badge
                sx={{
                  background: "#dfdfdf",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <MdOutlineDarkMode className="text-gray-700 text-xl" />
              </Badge>
              <Badge
                sx={{
                  background: "#dfdfdf",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                badgeContent={"0"}
                color="success"
              >
                <FaRegMessage className="text-gray-700 text-xl" />
              </Badge>

              <Badge
                sx={{
                  background: "#dfdfdf",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                badgeContent={"0"}
                color="primary"
              >
                <IoNotificationsOutline className="text-gray-700 text-xl" />
              </Badge>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#07174e",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "#07174e",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <div className="md:mt-16 mt-10">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
