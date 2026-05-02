import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function AdminRoute({ children }) {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  
  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;