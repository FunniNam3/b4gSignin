import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Landing() {
  const { user, logout } = useAuth();
  return (
    <>
      {user?.email ? (
        <h1>Hello {user.firstName}</h1>
      ) : (
        <Link to="/auth">Login</Link>
      )}
      <h1>YOU HAVE LANDED</h1>
      {user?.email && <button onClick={logout}>Log out</button>}
    </>
  );
}
