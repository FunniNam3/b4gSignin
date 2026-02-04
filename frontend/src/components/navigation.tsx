import { useAuth } from "../context/authContext";

export function Navigation() {
  const { user } = useAuth();
  return (
    <nav className="flex flex-row justify-start items-center p-3">
      <h1 className="text-4xl flex-1 font-[Modak]">TACS</h1>
      <div className="flex flex-row gap-2">
        <a className="p-2 text-xl" href="/">
          Home
        </a>
        <a className="p-2 text-xl" href="/dashboard">
          Dashboard
        </a>
        {user?.teamID ? (
          <a className="p-2 text-xl" href="/team">
            Team
          </a>
        ) : (
          <a className="p-2 text-xl" href="/teamSearch">
            Team Search
          </a>
        )}
        <a className="p-2 text-xl" href="/FAQ">
          FAQ
        </a>
        {user?.email ? (
          <a href="/user" className="p-2 text-xl">
            {user.firstName}
          </a>
        ) : (
          <a href="/auth" className="p-2 text-xl">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
