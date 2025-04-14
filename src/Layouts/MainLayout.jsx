import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import Loading from "../components/Shared/Loading/Loading";
const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }
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
