import { useAuth } from "../context/authContext";

export function UserPage() {
  const { user, logout } = useAuth();
  // TODO Make it so that user can edit this page
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1>
        Hello {user?.firstName} {user?.lastName}
      </h1>
      <button onClick={logout} className="bg-red-600 w-30 h-10">
        Log Out
      </button>
    </div>
  );
}
