import { Rating, Tooltip } from "@mui/material";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { TbShip } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import payments from "../../assets/payment-getways.png";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../components/Home/ProductCard/ProductCard";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useWishlist from "../../hooks/useWishlist";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import useCart from "../../hooks/useCart";
import { IoCheckmarkDone } from "react-icons/io5";

import ReactImageMagnify from "react-image-magnify";
import { MdRateReview } from "react-icons/md";

const ProductDetails = () => {
  const [reletedProducts, setReletedProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const [fieldError, setFieldError] = useState();
  const product = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wishlist, , refetchWishlist] = useWishlist();
  const [cart, , refetch] = useCart();

  const {
    _id,
    name,
    basePrice,
    sellPrice,
    image,
    description,
    ratings,
    category,
    avgRating,
  } = product;
  console.log(product);
  const isWishlted = wishlist.some((item) => item.id === _id);
  const isCarted = cart.some((item) => item.id === _id);

  const handleAddToCart = () => {
    if (user && user?.email) {
      const wishlistItem = {
        id: _id,
        email: user?.email,
        name,
        image,
        price: sellPrice,
      };

      axiosSecure.post("/carts", wishlistItem).then((res) => {
        refetch();
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${name} added to cart.`,
            showConfirmButton: false,
            timer: 1500,
          });
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
        refetchWishlist();
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: `${name} added to wishlist.`,
            showConfirmButton: false,
            timer: 1500,
          });
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
        refetchWishlist();
        Swal.fire({
          title: "Deleted!",
          text: "Deleted from wishlist",
          icon: "success",
          timer: "1500",
          showConfirmButton: false,
        });
      }
    });
  };

  // handle onhchange event of ratings
  const handleChangeRating = (event, value) => {
    setRating(value);
    setFieldError("");
  };

  const handleChangeReview = (e) => {
    setReviewText(e.target.value);
    setFieldError("");
  };

  const handleSubmitReview = () => {
    if (!rating || !reviewText) {
      if (!rating && !reviewText) {
        setFieldError("Please select rating and write review");
      } else if (!rating) {
        setFieldError("Please select your rating");
      } else if (!reviewText) {
        setFieldError("Please write your review");
      }
    } else {
      const reviewItem = {
        rating,
        reviewText,
        reviewedBy: {
          name: user.displayName,
          image: user.photoURL,
        },
      };

      axiosSecure.post(`/products/${_id}/reviews`, reviewItem).then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `Review added to this product.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  // load related products
  axiosPublic
    .get("/products", { params: { category } })
    .then((res) => setReletedProducts(res.data));
  return (
    <div className="md:p-20 p-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Product Image",
                isFluidWidth: true,
                src: image,
              },
              largeImage: {
                src: image,
                width: 1200,
                height: 800,
              },
              enlargedImagePosition: "beside",
              enlargedImageContainerDimensions: {
                width: "200%",
                height: "100%",
              },
              enlargedImageContainerStyle: {
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(241, 241, 241, 0.3)",
                zIndex: 999,
              },
              lensStyle: {
                backgroundColor: "rgba(255, 255, 255, 0.06)",
              },

              isHintEnabled: true,
              shouldUsePositiveSpaceLens: true,
            }}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{name}</h1>

          <div className="flex items-center gap-3">
            {basePrice && (
              <p className="font-bold text-gray-500">
                <del> ${basePrice}</del>
              </p>
            )}
            <p className="text-2xl font-bold text-gray-700  my-4">
              ${sellPrice}
            </p>
          </div>
          <Rating
            name="size-large"
            size="large"
            defaultValue={avgRating}
            precision={0.5}
            readOnly
          />
          <br />
          <p className="text-xl text-gray-600 mt-3">{description}</p>
          <div className="flex items-center gap-4 py-3">
            {isCarted ? (
              <button className="h-12 cursor-pointer bg-gray-600 text-white px-4 rounded mt-5">
                <div className="flex items-center gap-2">
                  <TiShoppingCart className="text-xl" />
                  Added
                  <IoCheckmarkDone className="text-xl text-yellow-600" />
                </div>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="product-cart-btn w-40 h-12 mt-5 flex items-center justify-center gap-2"
              >
                <TiShoppingCart className="text-xl" />
                Add to cart
              </button>
            )}
            <div className="mt-5">
              {isWishlted ? (
                <Tooltip title="Remove from wishlist">
                  <button
                    onClick={handleRemoveWishlist}
                    className="text-5xl text-red-600 hover:text-red-600 cursor-pointer"
                  >
                    <FaHeart />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Add to wishlist">
                  <button
                    onClick={handleAddToWishlist}
                    className="text-6xl hover:text-red-600 cursor-pointer"
                  >
                    <CiHeart />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="md:flex gap-5 pt-5">
            <div className="shadow-lg p-8 xs:p-5 text-center">
              <div className="text-4xl text-[#2b4190] text-center pb-5">
                <TbShip className="mx-auto" />
              </div>
              <div>
                <p className="text-gray-500">
                  Estimate delivery times:12-26 days(International),3-6 days
                  (United States).
                </p>
              </div>
            </div>
            <div className="shadow-lg p-8 xs:p-5 text-center">
              <div className="text-4xl text-[#2b4190] text-center pb-5">
                <GiReturnArrow className="mx-auto" />
              </div>
              <div>
                <p className="text-gray-500">
                  Return within 30 days of purchase. Duties & taxes are
                  non-refundable.
                </p>
              </div>
            </div>
          </div>
          <div className="md:flex items-center gap-5 pt-5">
            <p className="flex items-center gap-2 font-semibold">
              <AiOutlineSafetyCertificate className="text-2xl" />
              Guarantee Safe <br /> Checkout
            </p>
            <img src={payments} alt="" />
          </div>
        </div>
      </div>

      {/* customer review for this product */}
      <div className="mt-10">
        <h3 className="text-3xl font-semibold mb-5">Reviews(0)</h3>
        <div className="md:flex items-center gap-2 justify-between">
          <div className="flex gap-2 shadow-lg p-5">
            <div>
              <img src="" alt="person image" />
              <p className="text-xl">Name</p>
            </div>
            <div>
              <Rating
                name="size-large"
                size="large"
                defaultValue={ratings ? ratings : 4}
                precision={0.5}
                readOnly
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                cum dolores obcaecati quaerat consequatur reiciendis similique
                alias minus officiis delectus?
              </p>
            </div>
          </div>
          <div className="flex gap-2 shadow-lg p-5">
            <div>
              <img src="" alt="person image" />
              <p className="text-xl">Name</p>
            </div>
            <div>
              <Rating
                name="size-large"
                size="large"
                defaultValue={ratings ? ratings : 4}
                precision={0.5}
                readOnly
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                cum dolores obcaecati quaerat consequatur reiciendis similique
                alias minus officiis delectus?
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10">
          <h2 className="text-xl font-bold">Review This Product</h2>
          {!user?.email && (
            <Link
              to="/login"
              type="submit"
              className="w-50 py-3 bg-[#07174e] text-white rounded cursor-pointer transition duration-300 ease-in hover:bg-[#000721] mt-5 flex items-center justify-center gap-2"
            >
              <MdRateReview />
              Add your review
            </Link>
          )}

          {user?.email && (
            <div className="mt-5">
              <Rating
                name="size-large"
                size="large"
                value={rating}
                onChange={handleChangeRating}
                precision={0.5}
              />
              <br />
              <br />
              <textarea
                onChange={handleChangeReview}
                className="w-full p-2 border-2 border-gray-400 focus:border-[#2b4190] outline-0 rounded"
                rows="6"
              />
              {fieldError && <p className="text-red-500">{fieldError}</p>}
              <button
                onClick={handleSubmitReview}
                className="px-10 py-3 bg-[#07174e] text-white rounded cursor-pointer transition duration-300 ease-in hover:bg-[#000721] mt-5"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* releted products */}
      <div className="mt-10">
        <h3 className="text-3xl font-semibold mb-5">Releted Products</h3>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4">
          {reletedProducts.map((item) => (
            <ProductCard loading={false} product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
