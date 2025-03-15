import { Rating } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
const AddReview = () => {
  const [rating, setRating] = useState(3.5);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event, newValue) => {
    setRating(newValue);
  };
  const onSubmit = async (data) => {
    const reviewItem = {
      ...data,
      rating,
      createdBy: {
        email: user?.email,
        userName: user?.displayName,
        userPhoto: user?.photoURL,
      },
    };
    const res = await axiosSecure.post("/reviews", reviewItem);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Review added successfully!.",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
    }
  };

  return (
    <div className="container mx-auto lg:px-20 mt-5">
      <h1 className="text-3xl font-bold mb-10">Add Your Review</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 p-10 rounded shadow-lg"
      >
        <h2 className="text-2xl text-center text-semibold mb-5">RATE US</h2>
        <div className="text-center text-4xl">
          <Rating
            name="half-rating"
            defaultValue={rating}
            onChange={handleChange}
            size="large"
            precision={0.5}
            sx={{ fontSize: "35px" }}
          />
        </div>
        <div className="mb-4 mt-5">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Do you have any suggetion for us?
          </label>
          <input
            type="text"
            className="w-full  p-3 border-2 border-gray-400 focus:border-[#2b4190] rounded outline-0"
            {...register("suggetion")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-semibold mb-2">
            Kindly express your experience with us.
          </label>
          <textarea
            className="w-full p-2 border-2 border-gray-400 focus:border-[#2b4190] outline-0 rounded"
            rows="4"
            {...register("review", { required: true })}
          />

          <label
            className={`${
              errors.review ? "text-[#ff0000d6]" : "text-[#ff000000]"
            }`}
            htmlFor="image"
          >
            Please write a review!
          </label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-10 py-3 bg-[#07174e] text-white rounded cursor-pointer hover:bg-gray-500"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
