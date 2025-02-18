import { GrDeliver } from "react-icons/gr";
import { IoIosSync } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineMessage, MdOutlinePayment } from "react-icons/md";

const Features = () => {
  const items = [
    {
      title: "Free Delivery",
      desc: "For all orders over $99",
      icon: <GrDeliver />,
    },
    {
      title: "90 Days Return",
      desc: "If goods have problems",
      icon: <IoIosSync />,
    },
    {
      title: "Secure Payment",
      desc: "100% secure payment",
      icon: <MdOutlinePayment />,
    },
    {
      title: "24/7 Support",
      desc: "Dedicated support",
      icon: <MdOutlineMessage />,
    },
    {
      title: "Gift Service",
      desc: "Support gift service",
      icon: <IoGiftOutline />,
    },
  ];

  return (
    <div className="px-20">
      <div className="border border-gray-300 p-8 mt-1">
        <div className="flex items-center justify-between gap-4">
          {items.map((item, i) => (
            <div key={`banner-feature${i}`} className="flex items-center gap-5">
              <div className="text-5xl text-[#2b4190] font-bold">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
