import { Navigate } from "react-router-dom";
import { getUser, isAuthenticated } from "../services/auth";

function ProtectedRoute({ children, roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUser();

  if (roles?.length && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
