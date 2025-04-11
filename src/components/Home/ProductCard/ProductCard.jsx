import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineGridView } from "react-icons/md";
import ProductLoadingSkeleton from "../../Shared/ProductLoadingSkeleton/ProductLoadingSkeleton";
import Tooltip from "@mui/material/Tooltip";
import useWishlist from "../../../hooks/useWishlist";
import { IoCheckmarkDone } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import "./ProductCard.css";
import Swal from "sweetalert2";
const ProductCard = ({ product, loading }) => {
  const {
    _id,
    name,
    basePrice,
    sellPrice,
    image,
    isNew,
    isTrending,
    discount,
    ratings = 0,
  } = product;
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [cart, , refetch] = useCart();
  const [wishlist, , refetchWishlist] = useWishlist();
  const isWishlisted = wishlist.some((item) => item.id === _id);
  const isCarted = cart.some((item) => item.id === _id);

  const handleAddToWishlist = () => {
    if (user && user?.email) {
      const wishlistItem = {
        id: _id,
        email: user?.email,
        name,
        image,
        price: sellPrice,
      };

      axiosSecure.post("/wishlist", wishlistItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${name} added to wishlist.`,
            showConfirmButton: false,
            timer: 1500,
          });

          refetchWishlist();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please login first and then add to Wishlist.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#07174e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  const handleRemoveWishlist = () => {
    axiosSecure.delete(`/wishlist/${_id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Deleted from wishlist",
          icon: "success",
          timer: "1500",
          showConfirmButton: false,
        });
        refetchWishlist();
      }
    });
  };
  const handleClick = () => {
    if (user && user?.email) {
      const cartItem = {
        id: _id,
        email: user?.email,
        name,
        image,
        price: sellPrice,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${name} added to cartItem.`,
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please login first and then add to cartItem.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#07174e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  if (loading) {
    return <ProductLoadingSkeleton />;
  }
  return (
    <div className="product-card">
      <Card
        sx={{
          boxShadow: "none",
          borderRadious: 0,
          height: "full",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <div className="relative overflow-none img-container">
          <Link to={`/products/${_id}`}>
            <CardMedia
              className="h-50 p-5 "
              component="img"
              alt="green iguana"
              image={image}
            />
          </Link>
          <div className="labels">
            {isNew && (
              <sapn className="bg-[#006e19] p-1 flex item-center justify-center block my-1">
                New
              </sapn>
            )}
            {discount && (
              <span className="bg-[#e50016] p-1 flex item-center justify-center block my-1">
                10% off
              </span>
            )}
            {isTrending && (
              <sapn className="bg-[#00065a] p-1 flex item-center justify-center block my-1">
                Trending
              </sapn>
            )}
          </div>

          <div className="cart-heart">
            {isWishlisted ? (
              <Tooltip title="Remove from Wishlist" placement="left">
                <button
                  onClick={handleRemoveWishlist}
                  className="bg-gray-900 p-3 cursor-pointer mt-2 text-red-600 hover:bg-red-700 hover:text-white"
                >
                  <FaHeart />
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Add to Wishlist" placement="left">
                <button
                  onClick={handleAddToWishlist}
                  className="bg-gray-900 p-3 cursor-pointer mt-2 text-white rounded hover:bg-red-700"
                >
                  <FaRegHeart />
                </button>
              </Tooltip>
            )}
            <Tooltip title="See Details" placement="left">
              <Link
                to={`/products/${_id}`}
                className="bg-gray-900 p-3 cursor-pointer mt-2 text-white hover:bg-[#07174e]"
              >
                <MdOutlineGridView />
              </Link>
            </Tooltip>
          </div>
        </div>

        <CardContent sx={{ background: "rgb(245, 245, 245)", height: "100%" }}>
          <div className="relative lg:pb-10">
            <div>
              <Link className="text-blue-500" to={`/products/${_id}`}>
                <Typography
                  gutterBottom
                  variant="p"
                  className="font-semibold"
                  component="div"
                  sx={{ textOverflow: "ellipsis", display: "block" }}
                >
                  {name}
                </Typography>
              </Link>

              <Rating
                name="size-small"
                size="small"
                defaultValue={ratings ? ratings : 0}
                precision={0.5}
                readOnly
              />
              <h2 className="flex items-center gap-2 text-center">
                {basePrice && (
                  <del className="text-md font-semibold text-gray-500">
                    ${basePrice}
                  </del>
                )}
                <span className="text-lg font-bold text-gray-700">
                  ${sellPrice}
                </span>
              </h2>
            </div>
            <div className="text-center lg:absolute bottom-0 left-0 right-0">
              {isCarted ? (
                <button disabled className="product-cart-btn-disabled">
                  <div className="flex items-center gap-2">
                    <TiShoppingCart className="text-xl" />
                    Added
                    <IoCheckmarkDone className="text-xl text-yellow-600" />
                  </div>
                </button>
              ) : (
                <button onClick={handleClick} className="product-cart-btn ">
                  <div className="flex items-center gap-1">
                    <TiShoppingCart className="text-xl" />
                    Add to cart
                  </div>
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
