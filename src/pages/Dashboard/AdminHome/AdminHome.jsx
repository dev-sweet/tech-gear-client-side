import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useAuth } from "../../../hooks/useAuth";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: adminStats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  // custom bar chart
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom pi chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const pieChartdata = chartData?.map((item) => {
    return {
      name: item._id,
      value: item.revenue,
    };
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      <h2 className="text-3xl">
        Hello, Welcome {user.displayName ? user.displayName : "Back"}.
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
        <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r from-[#731a4a] to-[#07174e] py-10 px-5 rounded text-white">
          <span>
            <FaMoneyBillTrendUp className="text-5xl" />
          </span>
          <div className="font-bold">
            <h2 className="text-3xl">{adminStats?.revenue}</h2>
            <p className="text-xl">Revenue</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r  from-orange-500 to-red-500 py-10 px-5 rounded text-white">
          <span>
            <FaUsers className="text-5xl" />
          </span>
          <div className="font-bold">
            <h2 className="text-3xl">{adminStats?.users}</h2>
            <p className="text-xl">Customers</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r from-purple-500 to-indigo-700 py-10 px-5 rounded text-white">
          <span>
            <AiOutlineProduct className="text-5xl" />
          </span>
          <div className="font-bold">
            <h2 className="text-3xl">{adminStats?.products}</h2>
            <p className="text-xl">Products</p>
          </div>
        </div>
        <div className="flex items-center justify-evenly gap-5 bg-gradient-to-r from-teal-400 to-cyan-500 py-10 px-5 rounded text-white">
          <span>
            <FaMoneyBillTrendUp className="text-5xl" />
          </span>
          <div className="font-bold">
            <h2 className="text-3xl">{adminStats?.orders}</h2>
            <p className="text-xl">Orders</p>
          </div>
        </div>
      </div>
      <div className="flex iems-center mt-10 lg:flex-row flex-col">
        <div className="lg:w-1/2">
          <BarChart
            width={600}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="lg:w-1/2">
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartdata}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartdata?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend> </Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
