import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/home/shop41-el-slide-product1.png";
import bannerImg2 from "../../../assets/home/shop41-el-slide-product2.png";
import bannerImg3 from "../../../assets/home/banner-3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      showThumbs={true}
      infiniteLoop={true}
      interval={4000}
      transitionTime={1000}
      showArrows={true}
      stopOnHover={false}
      autoFocus={true}
      emulateTouch={true}
      showStatus={false}
      swipeable={true}
    >
      <div className="lg:py-0 md:py-0 py-10 lg:px-20 px-10 banner-bg3  min-h-full">
        <div className="lg:pt-10 flex md:flex-row flex-col items-center justify-between">
          <motion.div
            initial={{ translateX: -400, rotate: -25, scale: 0.1 }}
            animate={{ opacity: 1, translateX: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              className="lg:transform lg:rotate-10 lg:translate-x-35"
              src={bannerImg3}
            />
          </motion.div>
          <motion.div
            className="lg:w-[45%] w-full"
            initial={{ opacity: 0, translateX: 400, scale: 0.1 }}
            animate={{ opacity: 1, translateX: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="text-left">
              <h1 className="text-gray-100 lg:text-5xl md:text-4xl text-2xl font-semibold">
                Your Next Upgrade Here <br /> – Apple Collection
              </h1>
              <button className="md:mt-5 mt-3 lg:text-xl border-b-1 border-gray-100 text-gray-100 font-semibold hover:border-gray-500 hover:text-gray-500 transition cursor-pointer flex-start">
                Shop Apples
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="banner-bg lg:py-0 md:py-0 py-10 min-h-full">
        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between">
          <div className="lg:pl-20 pl-10 text-left lg:w-[40%] w-full">
            <h1 className="text-gray-100 lg:text-5xl md:text-4xl text-2xl font-semibold">
              Unleash Power with the <br className="" /> New MacBook!
            </h1>

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 20, damping: 20 }}
            >
              <button className="md:mt-5 mt-3 lg:text-xl border-b-1 border-gray-100 text-gray-100 font-semibold hover:border-gray-500 hover:text-gray-500 transition cursor-pointer flex-start">
                Shop Now
              </button>
            </motion.div>
          </div>
          <div className="py-12 lg:pr-20 pr-10">
            <img className="banner-img" src={bannerImg1} />
          </div>
        </div>
      </div>

      <div className="lg:py-0 md:py-0 py-10 lg:px-20 px-10 banner-bg2  min-h-full">
        <div className="lg:pt-10 flex md:flex-row flex-col items-center justify-between">
          <div className="text-left lg:w-[40%] w-full">
            <h1 className="text-gray-100 lg:text-5xl md:text-4xl text-2xl font-semibold">
              Limited Time Deal – <br /> Grab Your Apple Watch Today!
            </h1>
            <button className="md:mt-5 mt-3 lg:text-xl border-b-1 border-gray-100 text-gray-100 font-semibold hover:border-gray-500 hover:text-gray-500 transition cursor-pointer flex-start">
              Shop Electronics
            </button>
          </div>
          <div className="py-12">
            <img className="banner-img" src={bannerImg2} />
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
