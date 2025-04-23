import Newsletter from "../../components/Home/Newsletter/Newsletter";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import aboutBanner from "../../assets/about/about-banner.jpeg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";
const About = () => {
  const scrollRef = useRef(null);

  return (
    <>
      <PageTitle pageName="About" />
      <div className="lg:px-20 px-10 py-10 flex lg:flex-row flex-col items-center jusify-center gap-5">
        <div className="min-w-[50%] lg:pr-10 md:pr-10 pr-0">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: scrollRef }}
            transition={{ duration: 0.8 }}
          >
            <img className="max-h-[600px] w-full" src={aboutBanner} alt="" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className=""
        >
          <h3 className="text-2xl font-semibold mb-5">
            Tech Gear – Powering Your Digital Lifestyle
          </h3>
          <p className="text-gray-600">
            At Tech Gear, we are more than just an electronics store—we are your
            go-to destination for premium gadgets that keep you connected and
            productive. Whether you need the latest laptops, smartphones,
            accessories, or other tech essentials, we’ve got you covered.
          </p>

          <h3 className="mt-5 text-xl font-semibold">Why Choose Tech Gear?</h3>
          <ul className="mt-5 px-5 flex flex-col gap-2">
            <li className="list-disc">
              <span className="text-semibold">Top-Quality Products</span> – 100%
              genuine and latest electronics.
            </li>
            <li className="list-disc">
              <span className="text-semibold">Best Prices</span> – 100% –
              Competitive rates with amazing deals.
            </li>
            <li className="list-disc">
              <span className="text-semibold">Secure Shopping </span> – 100%
              Secure Shopping – Safe and reliable payment methods.
            </li>
            <li className="list-disc">
              <span className="text-semibold">Fast & Reliable Delivery</span> –
              100% – Get your products on time.
            </li>
            <li className="list-disc">
              <span className="text-semibold">Excellent Customer Support</span>{" "}
              – 100% Excellent Customer Support – Always here to help.
            </li>
          </ul>
          <div className="pt-10">
            <Link
              className="bg-[#07174e] cursor-pointer mt-5 px-4 py-3 text-white font-semibold hover:bg-[#020a24] transition"
              to="/contact"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
      <Newsletter />
    </>
  );
};

export default About;
