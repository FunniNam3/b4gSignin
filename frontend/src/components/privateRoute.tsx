import { useAuth } from "../context/authContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  return user ? <Outlet /> : <Navigate to="login" replace />;
};

export default PrivateRoute;
