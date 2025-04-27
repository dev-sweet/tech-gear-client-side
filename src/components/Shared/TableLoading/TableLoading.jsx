import { Box, Skeleton } from "@mui/material";

const TableLoading = () => {
  return (
    <Box display="flex" flexDirection="column" gap={10}>
      <Skeleton
        variant="rectangular"
        sx={{ margin: 0 }}
        height={80}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        sx={{ margin: 0 }}
        height={80}
        // animation="wave"
      />
      <Skeleton
        variant="rectangular"
        sx={{ margin: 0 }}
        height={80}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        sx={{ margin: 0 }}
        height={80}
        animation="wave"
      />
    </Box>
  );
};

export default TableLoading;
