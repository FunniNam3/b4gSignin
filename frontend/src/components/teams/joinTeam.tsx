import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export function JoinTeam() {
  interface LocationState {
    teamID?: string;
  }

  const location = useLocation();
  const { user } = useAuth();
  const team = (location.state as LocationState)?.teamID;
  // TODO make this page actually add the person to the team and load them into the team page afterwards
  return (
    <div>
      <h1>{team}</h1>
    </div>
  );
}
