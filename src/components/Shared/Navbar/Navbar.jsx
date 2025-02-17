import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-200 px-20">
      <div>
        <Link to="/">
          <img className="w-24" src={logo} alt="" />
        </Link>
      </div>
      <div>
        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <Link to="/wishlist">
          <CiHeart />
        </Link>
        <Link to="/cart">
          <IoBagOutline />
        </Link>
        <Link to="/profile">
          <CiUser />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
