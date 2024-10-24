import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { data: auth, isLoading } = useAuth();
  const location = useLocation;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
