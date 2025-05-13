import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = (query = {}) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products,
    isLoading: isProductLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", { params: query });
      return res.data;
    },
  });
  return [products, isProductLoading, refetch];
};

export default useProducts;
