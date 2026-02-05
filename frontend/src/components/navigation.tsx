import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Navigation() {
  const { user } = useAuth();
  return (
    <nav className="flex w-full items-center justify-between p-3 border-b">
      <Link className="group" to="/">
        <h1 className="text-5xl font-[Modak] flex flex-row items-baseline">
          B{/* Left side "uild" */}
          <span className="inline-block origin-right scale-x-0 opacity-0 transition-all duration-500 delay-100 group-hover:scale-x-100 group-hover:opacity-100">
            uild
          </span>
          <img src="logo 4.svg" alt="B4G Logo" className="h-13 mx-1" />G
          {/* Right side "ood" */}
          <span className="inline-block origin-left scale-x-0 opacity-0 transition-all duration-500 delay-200 group-hover:scale-x-100 group-hover:opacity-100">
            ood
          </span>
        </h1>
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
