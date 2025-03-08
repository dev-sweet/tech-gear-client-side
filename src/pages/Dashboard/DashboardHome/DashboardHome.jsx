import useAdmin from "../../../hooks/useAdmin";
import { useAuth } from "../../../hooks/useAuth";
import AdminRoute from "../../../routes/AdminRoute";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";
const DashboardHome = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  if (user && isAdmin) {
    return (
      <AdminRoute>
        <AdminHome />
      </AdminRoute>
    );
  }

  if (user) {
    return <UserHome />;
  }
};

export default DashboardHome;
