import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const img_hosting_key = import.meta.env.VITE_IMG_UPLOAD_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const EditBlog = () => {
  const blog = useLoaderData();
  const { _id, title, category, description } = blog;
  const [tags, setTags] = useState(blog.tags);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   handle submit form
  const onSubmit = async (data) => {
    const newBlog = { ...data, tags };
    const imgFile = { image: data.image[0] };

    if (!imgFile.image) {
      newBlog.image = blog.image;
    } else {
      const res = await axiosPublic.post(img_hosting_api, imgFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        newBlog.image = res.data.data.display_url;
      }
    }

    console.log(newBlog);
    const blogRes = await axiosSecure.patch(`/blogs/${_id}`, newBlog);
    console.log("productRes", blogRes.data);

    if (blogRes.data.modifiedCount > 0) {
      reset();
      setTags([]);
      Swal.fire({
        title: "Updated successfully!",
        text: "Blog has been updated.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleTagInput = (e) => {
    const value = e.target.value.trim();
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className="lg:px-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl text-center font-semibold">Edit Blog Post</h1>

        <div className="pt-3 flex flex-col justify-center gap-3">
          <label htmlFor="name">Blog Title *</label>
          <input
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
            type="text"
            defaultValue={title}
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </div>
        <span
          className={`${
            errors.title ? "text-[#ff0000d6]" : "text-[#ff000000]"
          }`}
        >
          Blog title is required!
        </span>

        <div>
          <div className="lg:flex items-center  gap-5">
            <div className="flex flex-col justify-center gap-3 lg:w-[50%]">
              <label htmlFor="category"> Category *</label>
              <select
                {...register("category", { required: true })}
                className="select border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-4 px-5 focus:border-2"
                defaultValue={category}
              >
                <option value="" disabled>
                  Choolse a categroy
                </option>

                <option value="Technology">Technology</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education & Learning">
                  Education & Learning
                </option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal Grouth">Personal Grouth</option>
              </select>
            </div>

            <div className="relative pt-5 gap-3  lg:w-[50%]">
              <label htmlFor="tags"> Tags (Optional)</label>
              <input
                type="text"
                placeholder="Add tags (comma separated)"
                onKeyUp={handleTagInput}
                className="relative border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
              />
              <div className="absolute left-0 top-28">
                <div className="flex gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-500 text-white px-3 py-1  flex items-center"
                    >
                      {tag}{" "}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-white cursor-pointer"
                      >
                        ✖
                      </button>
                    </span>
                  ))}
                </div>
              </div>
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
          </div>
        </div>

        <div className="pt-1 flex flex-col justify-center gap-3">
          <label htmlFor="name">Blog Description *</label>
          <textarea
            className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-2 px-5"
            type="text"
            rows={5}
            defaultValue={description}
            placeholder="Write your blog here..."
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

        <div className="">
          <label htmlFor="image">Blog Image *</label>
          <div className="flex flex-col items-start mt-3">
            <label className="block border border-gray-500 p-2">
              <span className="sr-only"> Choose file </span>
              <input
                type="file"
                {...register("image")}
                className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100 cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="text-center">
          <input
            className="bg-[#07174e] py-3 w-[200px] text-white mt-3 cursor-pointer mx-auto"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
