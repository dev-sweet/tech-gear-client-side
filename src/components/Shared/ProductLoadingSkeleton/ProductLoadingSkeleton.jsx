import { Box, Skeleton } from "@mui/material";

const ProductLoadingSkeleton = () => {
  return (
    <Box>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="full"
        height={180}
      />
      <Skeleton height={50} animation="wave" />
      <Skeleton height={40} width={200} animation="wave" />
      <Skeleton height={30} width={150} animation="wave" />
    </Box>
  );
};

export default ProductLoadingSkeleton;
