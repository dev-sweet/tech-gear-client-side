import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet } from "react-router-dom";
import { IoBagCheckOutline, IoHomeOutline } from "react-icons/io5";
import { IoIosMenu, IoMdAdd } from "react-icons/io";
import { AiFillProduct, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegEnvelope, FaUsers } from "react-icons/fa";
import {
  MdChecklistRtl,
  MdEditNote,
  MdOutlineRateReview,
} from "react-icons/md";
import { ImList } from "react-icons/im";
import { useState } from "react";
import logo from "../assets/logo.png";
import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
const drawerWidth = 240;

function DashboardLayout() {
  const [isAdmin] = useAdmin();

  const { user } = useAuth();
  console.log(user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="text-white">
      {/* <Toolbar /> */}
      <div className="text-right">
        <img className="h-[100px] w-[100px] ml-2" src={logo} alt="" />
      </div>
      {isAdmin ? (
        <List>
          <ListItem disablePadding>
            <Link className="w-full px-5 mb-3" to="/dashboard">
              <div className="flex items-center gap-3">
                <IoHomeOutline className="text-xl" />
                <ListItemText>Admin Home</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 mb-3" to="/dashboard/addProduct">
              <div className="flex items-center gap-3">
                <IoMdAdd className="text-xl" />
                <ListItemText>Add Product</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 mb-3" to="/dashboard/manageProducts">
              <div className="flex items-center gap-2">
                <MdEditNote className="text-2xl" />

                <ListItemText>Manage Products</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 mb-3" to="/dashboard/manageOrders">
              <div className="flex items-center gap-3">
                <ImList className="text-lg" />

                <ListItemText>Manage Orders</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard/manageUsers">
              <div className="flex items-center gap-3">
                <FaUsers className="text-xl" />

                <ListItemText>Manage Users</ListItemText>
              </div>
            </Link>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard">
              <div className="flex items-center gap-3">
                <IoHomeOutline className="text-xl" />
                <ListItemText>User Home</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard/cart">
              <div className="flex items-center gap-3">
                <IoBagCheckOutline className="text-xl" />

                <ListItemText>My Cart </ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard/wishlist">
              <div className="flex items-center gap-3">
                <MdChecklistRtl className="text-xl" />

                <ListItemText>My Wishlist</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard/paymentHistory">
              <div className="flex items-center gap-3">
                <AiOutlineShoppingCart className="text-xl" />

                <ListItemText>My Orders</ListItemText>
              </div>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link className="w-full px-5 my-1" to="/dashboard/addReview">
              <div className="flex items-center gap-3">
                <MdOutlineRateReview className="text-xl" />

                <ListItemText>Add a Review</ListItemText>
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
        </ListItem>{" "}
        <ListItem disablePadding>
          <Link className="w-full px-5 mb-3" to="/products">
            <div className="flex items-center gap-3">
              <IoIosMenu className="text-xl" />

              <ListItemText>Menu</ListItemText>
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
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            background: "white",
            boxShadow: "none",

            display: { lg: "none", md: "none", sm: "none" },
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
          onTransitionEnd={handleDrawerTransitionEnd}
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
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
