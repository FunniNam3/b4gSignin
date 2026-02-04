import { useAuth } from "../context/authContext";

export function Landing() {
  const { user } = useAuth();
  // TODO Make a landing page
  return (
    <div className="flex flex-col gap-3 p-3">
      {user?.email && <h1>Hello {user.firstName}</h1>}
      <h1>YOU HAVE LANDED</h1>
    </div>
  );
}
