import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Cart from "../pages/Dashboard/Cart/Cart";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import AdminRoute from "./AdminRoute";
import AddProduct from "../pages/Dashboard/AddProduct/AddProduct";

import EditProduct from "../pages/Dashboard/EditProduct/EditProduct";
import axios from "axios";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Wishlist from "../pages/Dashboard/WishList/Wishlist";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import ProductsDetails from "../pages/ProductDetails/ProductsDetails";
import AddBlog from "../pages/Dashboard/AddBlog/AddBlog";
import ManageBlogs from "../pages/Dashboard/ManageBlogs/ManageBlogs";
import EditBlog from "../pages/Dashboard/EditBlog/EditBlog";
import ManageOrders from "../pages/Dashboard/ManageOrders/ManageOrders";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/products",
        element: <AllProducts />,
      },

      {
        path: "/products/:id",
        element: <ProductsDetails />,
        loader: async ({ params }) => {
          const res = await axios.get(
            `https://tech-gear-server.onrender.com/products/${params.id}`
          );
          return res.data;
        },
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "userHome",
        element: <UserHome />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "cart/checkout",
        element: <Payment />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "addReview",
        element: <AddReview />,
      },

      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      // admin routes

      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manageOrders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "manageProducts",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "manageProducts/edit/:id",
        element: (
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        ),

        loader: async ({ params }) => {
          const { id } = params;
          const res = await axios.get(
            `https://tech-gear-server.onrender.com/products/${id}`
          );
          return res.data;
        },
      },

      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "createBlog",
        element: (
          <AdminRoute>
            <AddBlog />,
          </AdminRoute>
        ),
      },
      {
        path: "manageBlogs",
        element: (
          <AdminRoute>
            <ManageBlogs />
          </AdminRoute>
        ),
      },
      {
        path: "manageBlogs/edit/:id",
        element: (
          <AdminRoute>
            <EditBlog />
          </AdminRoute>
        ),
        loader: async ({ params }) => {
          const { id } = params;
          const res = await axios.get(
            `https://tech-gear-server.onrender.com/blogs/${id}`
          );
          return res.data;
        },
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
