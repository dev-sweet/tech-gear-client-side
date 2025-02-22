import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FeaturedBlog from "./FeaturedBlog";

const FeaturedBlogs = () => {
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
          <FeaturedBlog />
          <FeaturedBlog />
          <FeaturedBlog />
          <FeaturedBlog />
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
