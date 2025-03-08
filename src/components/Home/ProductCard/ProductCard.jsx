import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img from "../../../assets/home/shop41-el-slide-product2.png";
import { Rating } from "@mui/material";
import "./ProductCard.css";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const ProductCard = ({ product }) => {
  const { _id, name, price, image, ratings, discountPrice } = product;
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
        price,
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
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadious: 0,
        height: "full",
        flexDirection: "column",
      }}
    >
      <div className="bg-gray-100 p-5">
        <CardMedia component="img" alt="green iguana" image={img} />
      </div>
      <CardContent sx={{ background: "#dfe0ff", height: "100%" }}>
        <div className="relative lg:pb-10">
          <div>
            <Typography
              gutterBottom
              variant="p"
              className="font-semibold"
              component="div"
              sx={{ textOverflow: "ellipsis", display: "block" }}
            >
              {name}
            </Typography>

            <Rating
              name="size-small"
              size="small"
              defaultValue={ratings}
              precision={0.5}
              readOnly
            />
            <h2 className="flex items-center gap-2 text-center">
              {" "}
              {discountPrice && (
                <del className="text-md font-semibold text-gray-500">
                  ${discountPrice}
                </del>
              )}
              <span className="text-lg font-bold text-gray-700">${price}</span>
            </h2>
          </div>
          <div className="text-center lg:absolute top-28 left-0 right-0">
            <button onClick={handleClick} className="product-cart-btn ">
              Add to cart
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
