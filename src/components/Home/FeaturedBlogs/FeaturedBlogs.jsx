import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FeaturedBlog from "./FeaturedBlog";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const FeaturedBlogs = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  return (
    <div className="lg:px-20 p-10">
      <div>
        <div className="flex items-center justify-between">
          <div className="py-5">
            <h3 className="text-2xl font-bold">Featured Articles</h3>
          </div>

          <div>
            <Link
              to="/blogs"
              className="text-blue-600 font-semibold text-l flex items-center gap-1"
            >
              VIEW ALL
              <FaChevronRight />
            </Link>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {blogs?.map((blogItem) => (
            <FeaturedBlog key={blogItem._id} blogItem={blogItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
