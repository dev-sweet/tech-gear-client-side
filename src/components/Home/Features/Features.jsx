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
    <div className="lg:px-20 px-10">
      <div className="lg:border border-gray-300 py-10 mt-1 lg:px-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={`banner-feature${i}`}
              className="lg:shadow-none md:shadow-0 shadow-sm lg:p-0 p-8 xs:p-5 flex items-center gap-5"
            >
              <div className="text-5xl text-[#2b4190] font-bold">
                {item.icon}
              </div>
              <div>
                <h3 className="lg:text-2xl text-lg">{item.title}</h3>
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
