import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
