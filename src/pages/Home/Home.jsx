import Banner from "../../components/Home/Banner/Banner";
import FeaturedBlogs from "../../components/Home/FeaturedBlogs/FeaturedBlogs";
import Features from "../../components/Home/Features/Features";
import Newsletter from "../../components/Home/Newsletter/Newsletter";
import Products from "../../components/Home/Products/Products";
import Reviews from "../../components/Home/Reviews/Reviews";
import Selection from "../../components/Home/Selection/Selection";
import ShopByBrand from "../../components/Home/ShopByBrand/ShopByBrand";
import TrendingProducts from "../../components/Home/TrendingProducts/TrendingProducts";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <Products />
      <Selection />
      <TrendingProducts />
      <Reviews />
      <ShopByBrand />
      <FeaturedBlogs />
      <Newsletter />
    </>
  );
};

export default Home;
