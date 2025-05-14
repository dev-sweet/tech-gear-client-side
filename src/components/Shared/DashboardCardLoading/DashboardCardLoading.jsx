import { Skeleton } from "@mui/material";

const DashboardCardLoading = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height={150}
    />
  );
};

export default DashboardCardLoading;
