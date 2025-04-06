import { Rating } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { TbShip } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import payments from "../../assets/payment-getways.png";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../components/Home/ProductCard/ProductCard";

const ProductDetails = () => {
  const [reletedProducts, setReletedProducts] = useState([]);
  const product = useLoaderData();
  const { name, price, image, description, ratings, category } = product;
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get("/products", { params: { category } })
      .then((res) => setReletedProducts(res.data));
  });
  return (
    <div className="md:p-20 p-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src={image}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{name}</h1>

          <p className="text-2xl text-gray-700 font-bold text-blue-600 my-4">
            ${price}
          </p>
          <Rating
            name="size-large"
            size="large"
            defaultValue={ratings ? ratings : 4.5}
            precision={0.5}
            readOnly
          />
          <br />
          <p className="text-xl text-gray-600 mt-3">{description}</p>
          <div className="flex  items-center">
            <button className="product-cart-btn w-40 h-12 mt-5">
              Add to cart
            </button>
            <div className="mt-5 ms-5">
              <button className="text-2xl hover:text-red-600 cursor-pointer">
                <CiHeart />
              </button>
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

          <div className="mt-5">
            <Rating
              name="size-large"
              size="large"
              defaultValue={2.5}
              precision={0.5}
            />
            <br />
            <br />
            <textarea
              className="w-full p-2 border-2 border-gray-400 focus:border-[#2b4190] outline-0 rounded"
              rows="6"
            />
            <button
              type="submit"
              className="px-10 py-3 bg-[#07174e] text-white rounded cursor-pointer hover:bg-gray-500 mt-5"
            >
              Submit Review
            </button>
          </div>
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
