import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Rating } from "@mui/material";
import { RiDoubleQuotesL } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Reviews.css";
const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // console.log(reviews.length);
  //   slider settings
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: reviews?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <FaChevronLeft />,
    nextArrow: <FaChevronRight />,
  };
  return (
    <div className="lg:mx-20 mx-10 py-10">
      <h1 className="text-2xl font-bold mb-10">Testimonials</h1>

      <div className="max-w-[800px] mx-auto">
        <Slider {...settings}>
          {reviews?.map((review) => (
            <div key={review._id}>
              <div className="text-center">
                {review.createdBy.userPhoto ? (
                  <img
                    className="mx-auto rounded-full border-2 border-gray-300 shadow-md"
                    src={review.createdBy.userPhoto}
                    alt=""
                  />
                ) : (
                  <img
                    className="mx-auto rounded-full border-2 border-gray-300 shadow-md"
                    src={`https://ui-avatars.com/api/?length=1&name=${review.createdBy.userName}&bold=true&background=random`}
                  />
                )}

                <p className="py-3 font-semibold">
                  {review.createdBy.userName}
                </p>
                <Rating
                  name="half-rating-read"
                  sx={{ fontSize: "45px" }}
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                />

                <h3 className="text-8xl flex items-center justify-center">
                  <RiDoubleQuotesL />
                </h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nostrum, neque odit possimus, quia ullam architecto totam
                veritatis explicabo recusandae asperiores accusamus pariatur
                aperiam magni, qui alias dolor reprehenderit? Maxime, suscipit!
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;
