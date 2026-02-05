import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Simulate fetching dashboard data
    const timer = setTimeout(() => {
      setDataLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (dataLoading) {
    return <LoadingComponent message="Syncing dashboard data..." />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Welcome, {user?.firstName}!
        </h1>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">Active Session</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#161b26] border border-white/5 hover:border-blue-500/30 transition-all group">
          <h3 className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wider">Total Actions</h3>
          <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">24</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#161b26] border border-white/5 hover:border-emerald-500/30 transition-all group">
          <h3 className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wider">Team Status</h3>
          <p className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">Verified</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#161b26] border border-white/5 hover:border-purple-500/30 transition-all group">
          <h3 className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wider">Messages</h3>
          <p className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">3 New</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
