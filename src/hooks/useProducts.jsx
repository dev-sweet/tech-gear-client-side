import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products,
    isLoading: isProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: { search: "" },
      });
      return res.data;
    },
  });
  return [products, isProductLoading, refetch];
};

export default useProducts;
