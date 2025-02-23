import { Link } from "react-router-dom";
import errImg from "../../../assets/notfound/6342464.jpg";
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <img className="max-h-[60vh]" src={errImg} alt="" />
        <p className="text-gray-600">
          Sorry the page you're looking for dosen't exists. <br /> If you think
          something is broken, report a problem
        </p>
        <div className="mt-10">
          <Link
            className="text-white bg-[#2b4190] py-3 px-4 font-semibold"
            to="/"
          >
            Go Home
          </Link>
          <Link
            className="text-white bg-[#2b4190] py-3 px-4 font-semibold mx-3 rounded"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
