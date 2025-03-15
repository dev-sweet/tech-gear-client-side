import brand1 from "../../../assets/home/brand-1.png";
import brand2 from "../../../assets/home/brand-2.png";
import brand3 from "../../../assets/home/brand-3.png";
import brand4 from "../../../assets/home/brand-4.png";
import brand5 from "../../../assets/home/brand-5.png";
import brand6 from "../../../assets/home/brand-6.png";
import brand7 from "../../../assets/home/brand-7.png";
import brand8 from "../../../assets/home/brand-8.png";
import brand9 from "../../../assets/home/brand-9.png";
import brand10 from "../../../assets/home/brand-10.png";
import brand11 from "../../../assets/home/brand-11.png";
import brand12 from "../../../assets/home/brand-12.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ShopByBrand = () => {
  const brands = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    brand6,
    brand7,
    brand8,
    brand9,
    brand10,
    brand11,
    brand12,
  ];

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    prevArrow: <FaChevronLeft />,
    nextArrow: <FaChevronRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="lg:px-20 px-10 py-5">
      <h2 className="text-2xl font-bold mb-5">Shop By Brand</h2>
      <div className="px-10">
        <Slider {...settings}>
          {brands.map((brand, i) => (
            <Link to="/" key={i}>
              <div className="h-[150px] p-10 shadow shadow-lg border-1 border-gray-100 flex items-center justify-center h-full">
                <img src={brand} alt="" />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ShopByBrand;
