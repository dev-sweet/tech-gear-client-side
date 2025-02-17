import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
const MainLayout = () => {
  return (
    <d>
      <Navbar />
      <div className="px-20">
        <Outlet />
      </div>

      <Footer />
    </d>
  );
};

export default MainLayout;
