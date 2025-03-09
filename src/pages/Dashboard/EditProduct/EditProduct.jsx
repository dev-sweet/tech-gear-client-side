import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const img_hosting_key = import.meta.env.VITE_IMG_UPLOAD_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const product = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  console.log("product", product);
  const { name, price, image, category, description } = product;
  const [newProduct, setNewProduct] = useState({
    name,
    price,
    category,
    description,
    image,
  });
  //   handle submit form
  const onSubmit = async (data) => {
    const imgFile = { image: data.image[0] };

    if (!imgFile.image) {
      setNewProduct({ ...data, image: product.image });
    } else {
      const res = await axiosPublic.post(img_hosting_api, imgFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setNewProduct({ ...data, image: res.data.data.display_url });
      }
    }

    const productRes = await axiosSecure.put("/products", newProduct);
    console.log("productRes", productRes);

    if (productRes.data.insertedId) {
      Swal.fire({
        title: "Updated successfully!",
        text: "Product has been updated.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="lg:px-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl text-center font-semibold">Edit a Product </h1>

        <div className="pt-3 flex flex-col justify-center gap-3">
          <label htmlFor="name">Product Name *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            placeholder="Product Name"
            defaultValue={name}
            {...register("name", { required: true })}
          />
        </div>
        <span
          className={`${errors.name ? "text-[#ff0000d6]" : "text-[#ff000000]"}`}
        >
          Product name is required!
        </span>

        <div>
          <div className="lg:flex items-center  gap-5">
            <div className="pt-2 flex flex-col justify-center gap-3 lg:w-[50%]">
              <label htmlFor="category"> Category *</label>
              <select
                {...register("category", { required: true })}
                className="select border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-4 px-5 focus:border-2"
                defaultValue={category}
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
              </select>
            </div>

            <div className="pt-5 gap-3  lg:w-[50%]">
              <label htmlFor="price"> Price *</label>
              <input
                className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
                defaultValue={`${price}`}
                placeholder="Base Price"
                type="text"
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="lg:flex justify-betweeen ">
            <label
              className={`lg:w-[50%] ${
                errors.category ? "text-[#ff0000d6]" : "text-[#ff000000]"
              }`}
            >
              Select a category
            </label>
            <label
              className={`lg:w-[50%] ${
                errors.price ? "text-[#ff0000d6]" : "text-[#ff000000]"
              }`}
            >
              Price is required!
            </label>
          </div>
        </div>

        <div className="pt-1 flex flex-col justify-center gap-3">
          <label htmlFor="name">Product Details *</label>
          <textarea
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            defaultValue={description}
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
        {/* <img height="100" width="100" src={image} alt="" /> */}
        <div>
          <label htmlFor="image mb-">Product Image</label>
          <div className="flex flex-col items-start">
            <label className="block border border-[#2b4190] p-2">
              <span className="sr-only"> Change Photo </span>
              <input
                type="file"
                {...register("image")}
                className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-200 file:text-[#2b4190]
                     hover:file:bg-[#] cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="text-center">
          <input
            className="bg-[#2b4190] py-3 w-[200px] text-white mt-5 cursor-pointer mx-auto"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
