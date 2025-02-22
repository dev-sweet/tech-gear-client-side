import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/home/shop41-el-slide-product1.png";
import bannerImg2 from "../../../assets/home/shop41-el-slide-product2.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";
const Banner = () => {
  return (
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
      <div className="banner-full lg:py-0 md:py-0 py-10">
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between min-h-full">
          <div className="lg:pl-20 pl-10 text-left lg:w-[40%] w-full flex flex-col md:items-start items-center">
            <h1 className="lg:text-5xl md:text-4xl text-2xl lg:text-left md:text-left text-center font-semibold">
              Porto Touch Laptop <br className="" /> Pro Edition 2
            </h1>
            <button className="md:mt-5 mt-3 lg:text-xl  border-b-1 border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer flex-start">
              Shop Electronics
            </button>
          </div>
          <div className="relative py-12 lg:pr-20 pr-10">
            <img className="banner-img" src={bannerImg1} />
            <div className="banner-bg-color"></div>
          </div>
        </div>
      </div>
      <div className="banner-full lg:py-0 md:py-0 py-10 min-h-full">
        <div className="lg:pl-20 pl-10 flex lg:flex-row md:flex-row flex-col items-center justify-between">
          <div className="text-left lg:w-[40%] w-full h-full">
            <div className="banner-bg-color-2"></div>
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-semibold">
              Porto Touch Laptop <br /> Pro Edition 2
            </h1>
            <button className="mt-5 px-4 text-xl py-2 border-b-2 border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
              Shop Electronics
            </button>
          </div>
          <div className="py-12 lg:pr-20 pr-10">
            <img className="banner-img" src={bannerImg2} />
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
