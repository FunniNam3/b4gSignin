import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navigation() {
  const { user } = useAuth();
  return (
    <nav className="flex flex-row justify-start items-center">
      <h1 className="text-2xl flex-1">TACS</h1>
      <div className="flex flex-row gap-2">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        {user?.teamID ? (
          <a href="/team">Team</a>
        ) : (
          <a href="/teamSearch">Team Search</a>
        )}
        <a href="/faq">FAQ</a>
        {user?.email ? (
          <h1>{user.firstName}</h1>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </div>
    </nav>
  );
}
