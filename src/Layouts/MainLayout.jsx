import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
const MainLayout = () => {
  return (
    <d>
      <Navbar />

      <Outlet />

      <Footer />
    </d>
  );
};

export default MainLayout;
