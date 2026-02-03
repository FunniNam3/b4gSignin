import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function JoinTeam() {
  interface LocationState {
    teamID?: number;
    teamName?: string;
  }

  const location = useLocation();
  const { user } = useAuth();
  const teamName = (location.state as LocationState)?.teamName;
  const teamID = (location.state as LocationState)?.teamID;
  // TODO make this page actually add the person to the team and load them into the team page afterwards
  return (
    <div>
      <h1> Joining {teamName}</h1>
    </div>
  );
}
