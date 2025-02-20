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
  return (
    <div className="px-20 py-5">
      <h2 className="text-2xl font-bold mb-5">Shop By Brand</h2>
      <div className="grid grid-cols-6 gap-1  shadow-xsm">
        {brands.map((brand) => (
          <Link key={brand} to="">
            <div className="p-10 border-1 border-gray-100 flex items-center justify-center h-full">
              <img src={brand} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrand;
