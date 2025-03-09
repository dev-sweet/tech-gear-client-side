import ProductCard from "../../components/Home/ProductCard/ProductCard";
import useProducts from "../../hooks/useProducts";

const AllProducts = () => {
  const [products] = useProducts();
  console.log(products);
  return (
    <div className="lg:px-20 px-10 py-10">
      <h1 className="text-3xl font-semibold ">All Products</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-5 h-full mt-10">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
