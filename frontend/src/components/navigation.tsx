import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navigation() {
  const { user } = useAuth();
  return (
    <nav className="flex w-full items-center justify-between p-3 border-b">
      <Link className="hover:scale-105" to="/">
        <img src="logo.png" alt="" className="h-20" />
      </Link>

      <div className="flex flex-row gap-2 text-2xl">
        <Link className="p-2 hover:scale-110" to="/dashboard">
          Dashboard
        </Link>
        {user?.teamID ? (
          <Link className="p-2 hover:scale-110" to="/team">
            Team
          </Link>
        ) : (
          <Link className="p-2 hover:scale-110" to="/teamSearch">
            Team Search
          </Link>
        )}
        <Link className="p-2 hover:scale-110" to="/FAQ">
          FAQ
        </Link>
        {user?.email ? (
          <Link to="/user" className="p-2 hover:scale-110">
            {user.firstName}
          </Link>
        ) : (
          <Link to="/auth" className="p-2 hover:scale-110">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
