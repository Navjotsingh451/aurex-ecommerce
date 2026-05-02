import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function ProtectedRoute({ children }) {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;