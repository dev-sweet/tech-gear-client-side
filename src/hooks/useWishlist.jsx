import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: wishlist = [],
    isLoading,
    refetch: refetchWishlist,
  } = useQuery({
    queryKey: ["wishlist"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
      return res.data;
    },
  });

  return [wishlist, isLoading, refetchWishlist];
};

export default useWishlist;
