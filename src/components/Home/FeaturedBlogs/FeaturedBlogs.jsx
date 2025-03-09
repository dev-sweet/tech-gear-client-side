import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FeaturedBlog from "./FeaturedBlog";
import blog1 from "../../../assets/home/porto45-blog-22.jpg";
import blog2 from "../../../assets/home/porto45-blog-42.jpg";
import blog3 from "../../../assets/home/porto45-blog-32.jpg";
import blog4 from "../../../assets/home/porto45-blog-12.jpg";
const blogs = [
  {
    name: "smartwatches",
    title: "Smartwatches in 2025",
    img: blog1,
    description:
      "Explore the future of smartwatches with AI and better battery life.",
  },
  {
    name: "gaming-devices",
    title: "Gaming Laptop vs Desktop",
    img: blog2,
    description:
      "Which one suits your gaming needs? Find out the pros and cons.",
  },
  {
    name: "wireless-earbuds",
    title: "Best Wireless Earbuds",
    img: blog3,
    description: "Key factors to consider when choosing the perfect earbuds.",
  },
  {
    name: "tech-accessories",
    img: blog4,
    title: "Must-Have Tech Accessories",
    description: "Boost productivity with the latest tech essentials.",
  },
];

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
          {blogs?.map((blogItem) => (
            <FeaturedBlog key={blogItem.name} blogItem={blogItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
