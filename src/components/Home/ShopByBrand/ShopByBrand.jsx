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
import { motion } from "framer-motion";
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

  // const scrollRef = useRef(null);
  return (
    <div className="py-5 px-10">
      <h2 className="text-2xl font-bold mb-5">Sponsored</h2>

      <div className="overflow-hidden w-full py-4">
        <motion.div
          className="flex gap-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "linear",
          }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="min-w-[200px] ps-1">
              <Link to="/">
                <div className="h-[120px] p-10 shadow-lg border border-gray-100 flex items-center justify-center">
                  <img
                    src={brand}
                    alt={`brand-${i}`}
                    className="h-full object-contain"
                  />
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopByBrand;
