import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const img_hosting_key = import.meta.env.VITE_IMG_UPLOAD_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // set loading true
    setIsLoading(true);
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const basePrice = parseFloat(data.basePrice);
      const sellPrice = parseFloat(data.sellPrice);
      const product = {
        ...data,
        basePrice,
        sellPrice,
        discount: Math.round(((basePrice - sellPrice) / basePrice) * 100),
        image: res.data.data.display_url,
      };

      const productRes = await axiosSecure.post("/products", product);
      setIsLoading(false);
      if (productRes.data.insertedId) {
        reset();
        Swal.fire({
          title: "Product added successfully!",
          text: "Product has been added.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="md:px-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="md:text-3xl text-2xl text-gray-700 text-center font-bold py-5">
          Add a Product{" "}
        </h1>

        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="name">Product Name *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            defaultValue=""
            placeholder="Product Name"
            {...register("name", { required: true })}
          />

          <span
            className={`${
              errors.name ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
          >
            Product name is required!
          </span>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-2">
          {/* category */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="category"> Category *</label>
            <select
              {...register("category", { required: true })}
              className="select border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
              defaultValue=""
            >
              <option value="" disabled>
                Choolse a categroy
              </option>

              <option value="laptop">Laptop</option>
              <option value="phone">Phone</option>
              <option value="earbuds">Earbuds</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="camera">Camera</option>
              <option value="smartwatch">Smartwatch</option>
              <option value="tablet">Tablet</option>
              <option value="drone">Drone</option>
              <option value="speaker">Speaker</option>
              <option value="others">otherss</option>
            </select>

            <label
              className={`lg:w-[50%] ${
                errors.category ? "text-[#ff0000d6]" : "text-[#ff000000]"
              }`}
            >
              Select a category
            </label>
          </div>

          {/* Base Price */}
          <div className="w-full">
            <label htmlFor="basePrice">Base Price (Optional)</label>
            <input
              className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2 mt-1"
              placeholder="Base Price"
              type="number"
              {...register("basePrice")}
            />
          </div>

          {/* sell price */}
          <div className="w-full">
            <label htmlFor="discount">Sell Price *</label>
            <input
              className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
              defaultValue=""
              placeholder="Sell Price"
              type="number"
              {...register("sellPrice", { required: true })}
            />
            <label
              className={`lg:w-[50%] ${
                errors.sellPrice ? "text-[#ff0000d6]" : "text-[#ff000000]"
              }`}
            >
              Sell Price is required!
            </label>
          </div>
          {/* label */}
          <div className="w-full">
            <label>Add Label (optional)</label>
            <div className="flex gap-5 pt-4">
              <div className="flex gap-2">
                <input
                  className="w-6 h-6 border border-[#0028b4] accent-[#001f8b] hover:accent-[#3956c2] cursor-pointer"
                  type="checkbox"
                  defaultChecked
                  {...register("isNew")}
                />
                <label htmlFor="">New</label>
              </div>
              <div className="flex">
                <input
                  className="w-6 h-6 border border-[#0028b4] accent-[#001f8b] hover:accent-[#3956c2] cursor-pointer"
                  name="label"
                  type="checkbox"
                  {...register("isTrending")}
                />
                <label htmlFor="label">Trending</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 mt-3">
          <label htmlFor="name">Product Details *</label>
          <textarea
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            defaultValue=""
            rows={3}
            placeholder="Product Name"
            {...register("description", { required: true })}
          />
        </div>
        <label
          className={`lg:w-[49%] ${
            errors.description ? "text-[#ff0000d6]" : "text-[#ff000000]"
          }`}
        >
          Description is required!
        </label>

        <div>
          <label htmlFor="image">Product Image *</label>
          <div className="flex flex-col items-start mt-2">
            <label className="block border border-gray-500 p-2">
              <span className="sr-only"> Choose file </span>
              <input
                type="file"
                {...register("image", { required: true })}
                className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-600
                     hover:file:bg-blue-100 cursor-pointer"
              />
            </label>

            <label
              className={`${
                errors.image ? "text-[#ff0000d6]" : "text-[#ff000000]"
              }`}
              htmlFor="image"
            >
              Product image is required!
            </label>
          </div>
        </div>
        <div className="text-center">
          {isLoading ? (
            <button className="flex items-center justify-center bg-[#07174e] py-2 w-[200px] text-white mt-1 cursor-pointer mx-auto">
              <div className="loader-btn"></div>
            </button>
          ) : (
            <input
              className="bg-[#07174e] py-3 w-[200px] text-white mt-1 cursor-pointer mx-auto transition duration-150 ease-in-out hover:bg-gray-600"
              type="submit"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
