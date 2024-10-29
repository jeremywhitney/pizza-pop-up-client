import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({
  children,
  requireStaff = false,
  requireCustomer = false,
}) => {
  const { data: auth, isLoading } = useAuth();
  const location = useLocation;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireStaff && !auth.user.profile.is_staff) {
    return <Navigate to="/" replace />;
  }

  if (requireCustomer && auth.user.profile.is_staff) {
    return <Navigate to="/employee_dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
