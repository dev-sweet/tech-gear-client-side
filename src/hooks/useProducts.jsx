import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      // console.log(res.data);
      return res.data;
    },
  });
  return [products, isProductLoading, refetch];
};

export default useProducts;
