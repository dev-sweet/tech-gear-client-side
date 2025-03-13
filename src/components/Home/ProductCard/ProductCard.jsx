import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Rating, Skeleton } from "@mui/material";
import "./ProductCard.css";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const ProductCard = ({ product, loading }) => {
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

  if (loading) {
    return (
      <Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="full"
          height={180}
        />
        <Skeleton height={50} animation="wave" />
        <Skeleton height={40} width={200} animation="wave" />
        <Skeleton height={30} width={150} animation="wave" />
      </Box>
    );
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
          <CardMedia
            className="h-50 p-5 "
            component="img"
            alt="green iguana"
            image={image}
          />

          <Link className="see-details-btn" to={`/products/${_id}`}>
            Vew Details
          </Link>
        </div>
        {/*  background: "rgb(245, 245, 245)",  */}
        <CardContent sx={{ background: "rgb(245, 245, 245)", height: "100%" }}>
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
                defaultValue="3"
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
                <span className="text-lg font-bold text-gray-700">
                  ${price}
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
