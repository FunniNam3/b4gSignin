import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  // TODO Flush out this page
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1>Welcome, {user?.firstName}!</h1>
    </div>
  );
};

export default Dashboard;
