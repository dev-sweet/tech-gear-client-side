import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import payments from "../../../assets/payment-getways.png";
import Divider from "@mui/material/Divider";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="px-20">
      <div>
        <div className="text-center py-5">
          <img className="w-28 mx-auto" src={logo} alt="" />
        </div>
        <Divider />
      </div>

      <div className="grid grid-cols-4 gap-5 py-7">
        <div className="">
          <h3 className="text-l font-semibold pb-5">About Us</h3>
          <p className="text-gray-500">
            We know there are a lot of threa developers our but we pride into a
            firm in the industry.
          </p>
        </div>
        <div>
          <h3 className="text-l font-semibold pb-5">Feature</h3>
          <ul>
            <li className="text-gray-500 pb-2">
              <Link to="/about">About</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/">Terms & Condition</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/about">Best Fetures</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/about">Best Products</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-l font-semibold pb-5">General Links</h3>
          <ul>
            <li className="text-gray-500 pb-2">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/">Tracking Order</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/">Become Seller</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-l font-semibold pb-5">Helpful</h3>
          <ul>
            <li className="text-gray-500 pb-2">
              <Link to="/">Flash Sale</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/">FAQ</Link>
            </li>
            <li className="text-gray-500 pb-2">
              <Link to="/">Support</Link>
            </li>
          </ul>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <Link to="/">
                <IoLogoInstagram />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaYoutube />
              </Link>
            </li>
          </ul>
          <p>
            ©
            <Link
              to="https://github.com/dev-sweet"
              className="font-semibold text-lg"
            >
              dev-sweet{" "}
            </Link>
            {year}. All rights reserved
          </p>
        </div>
        <div>
          <Link to="">
            <img src={payments} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
