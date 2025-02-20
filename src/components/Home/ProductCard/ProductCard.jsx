import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../../assets/home/shop41-el-slide-product2.png";
import { Rating } from "@mui/material";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  const { name, price, image, ratings, discountPrice } = product;

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "none",
        borderRadious: "none",
        height: "full",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-gray-100 p-5">
        <CardMedia component="img" alt="green iguana" image={img} />
      </div>
      <CardContent sx={{ background: "#fcfcfc" }}>
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
          //   name="half-rating-read"
          size="small"
          defaultValue={ratings}
          precision={0.5}
          readOnly
        />
        <h2 className="flex items-center gap-2">
          {" "}
          {discountPrice && (
            <del className="text-md font-semibold text-gray-500">
              ${discountPrice}
            </del>
          )}
          <span className="text-lg font-bold text-gray-700">${price}</span>
        </h2>
        <button className="border-b font-bold">ADD TO CART</button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
