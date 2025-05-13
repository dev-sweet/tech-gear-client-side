import useAdmin from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";
// import Loading from "../components/Shared/Loading/Loading";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isLoading || isAdminLoading) {
    return;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default AdminRoute;
