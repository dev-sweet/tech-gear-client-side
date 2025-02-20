import { Link } from "react-router-dom";
import img1 from "../../../assets/home/porto43-banner-1.png";
import img2 from "../../../assets/home/porto43-banner-2.png";
import img3 from "../../../assets/home/porto43-banner-3.png";
import img4 from "../../../assets/home/porto43-banner-4.png";
const Selection = () => {
  return (
    <div className="px-20 py-10">
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-[#efedeb] min-h-[400px] p-10 flex items-center w-full justify-between">
          <div className="font-semibold">
            <h1 className="text-4xl">Mobile Devices</h1>
            <h3 className="text-3xl mt-3">Geek Selection</h3>
            <button className="mt-3 border-b border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
              Shop Mobile Phone
            </button>
          </div>
          <div>
            <img src={img1} alt="" />
          </div>
        </div>
        <div>
          <div className="bg-[#f9e4dc] flex items-center justify-between p-10 mb-5">
            <img src={img2} alt="" />
            <div>
              <div className="font-semibold">
                <h1 className="text-3xl">Smartphones</h1>
                <h3 className="text-2xl mt-2">Porto Selection</h3>
              </div>
              <button className="mt-3 border-b border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
                Shop Phones
              </button>
            </div>
          </div>
          <div className="flex gap-5 justify-between">
            <div className="bg-[#f9efd5] flex items-center justify-between w-[50%] p-10">
              <img src={img3} alt="" />
              <div>
                <div className="font-semibold">
                  <h1 className="text-xl">New Laptop </h1>
                  <h3 className="text-xl">Selection</h3>
                </div>
                <button className="mt-1 border-b border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
                  Shop Laptop
                </button>
              </div>
            </div>
            <div className="bg-[#f1f1f1] flex items-center justify-between w-[50%] py-10 px-5">
              <div>
                <div className="font-semibold">
                  <h1 className="text-xl">Nespresso</h1>
                  <h3 className="text-xl">Coffe Machine</h3>
                </div>
                <button className="mt-3 border-b border-gray-500 text-gray-500 font-semibold hover:border-gray-700 hover:text-gray-700 transition cursor-pointer">
                  Shop Now
                </button>
              </div>
              <img src={img4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;
