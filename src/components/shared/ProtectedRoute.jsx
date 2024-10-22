import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // TODO: Implement actual auth check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
