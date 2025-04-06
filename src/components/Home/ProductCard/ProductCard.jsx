import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import "./ProductCard.css";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { IoBagAddOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineGridView } from "react-icons/md";
import ProductLoadingSkeleton from "../../Shared/ProductLoadingSkeleton/ProductLoadingSkeleton";

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
  const [, , refetch] = useCart();
  const handleClick = () => {
    if (user && user.email) {
      const cartItem = {
        id: _id,
        email: user.email,
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
        title: "Are you are not logged in!",
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

  if (!product || loading) {
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
          <div className="labels absolute top-10 left-[-60px] text-white text-[10px] font-semibold">
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

          <div className="cart-heart flex flex-col absolute top-15 right-[-50px]">
            <button className="bg-gray-900 p-3 cursor-pointer mt-2  text-white">
              <FaRegHeart />
            </button>
            <button className="bg-gray-900 p-3 cursor-pointer mt-2 text-red-600">
              <FaHeart />
            </button>
            <button className="bg-gray-900 p-3 cursor-pointer mt-2 text-white">
              <MdOutlineGridView />
            </button>
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
                {" "}
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
              <button onClick={handleClick} className="product-cart-btn ">
                Add to cart
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
