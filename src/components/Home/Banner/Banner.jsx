import { Carousel } from "react-responsive-carousel";
import bannerImg from "../../../assets/home/shop41-el-slide-product1.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";
const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        interval={3000}
        showArrows={true}
        stopOnHover={false}
        autoFocus={true}
        emulateTouch={true}
      >
        <div>
          <div className="flex flex-row items-center">
            <div className="pl-20 text-left w-[40%]">
              <h1 className="text-5xl font-semibold">
                Porto Touch Laptop <br /> Pro Edition 2
              </h1>
              <button className="mt-5 px-4 text-xl py-2 border-b-2 border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
                Shop Electronics
              </button>
            </div>
            <div className="relative py-12  ">
              <img className="banner-img" src={bannerImg} />
              <div className="banner-bg-color"></div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
