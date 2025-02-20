import { TextField } from "@mui/material";
import "./Newsletter.css";
import { MdOutlineMail } from "react-icons/md";
const Newsletter = () => {
  return (
    <div className="newsletter-bg flex items-center justify-center text-center py-24">
      <div>
        <h2 className="text-4xl">
          Get <span className="text-[#2b4190]">20%</span> Off Discount Coupon
        </h2>
        <p className="text-[#2b4190] text-xl mt-5">
          by Subscribe our Newsletter
        </p>

        <div className="mt-5 p-3 flex items-center relative justify-none bg-white">
          <div className="text-[#2b4190] text-3xl">
            <MdOutlineMail />
          </div>
          <input
            className="outline-none w-[80%] ml-5"
            type="text"
            placeholder="Email Address"
          />
          <button className="bg-[#2b4190] absolute top-0 right-0 bottom-0 left-[80%] text-white font-semibold">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
