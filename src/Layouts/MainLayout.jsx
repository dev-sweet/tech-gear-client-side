import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { useEffect } from "react";
const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-1000">
        <Navbar />
      </div>
      <div className="mt-[96px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
