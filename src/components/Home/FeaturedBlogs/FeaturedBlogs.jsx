import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FeaturedBlog from "./FeaturedBlog";

const FeaturedBlogs = () => {
  return (
    <div className="px-20">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Featured Articles</h3>
          </div>

          <div>
            <Link
              to="products"
              className="text-blue-600 font-semibold text-l flex items-center gap-1"
            >
              VIEW ALL
              <FaChevronRight />
            </Link>
          </div>
        </div>
        <div>
          <FeaturedBlog />
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
