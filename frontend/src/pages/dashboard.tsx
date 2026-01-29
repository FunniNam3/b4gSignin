import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PrivateRoute from "../components/privateRoute";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <>
      <div>
        <h1>Welcome, {user?.email}!</h1>
        <button onClick={logout}>Log Out</button>
      </div>
      <PrivateRoute></PrivateRoute>
    </>
  );
};

export default Dashboard;
