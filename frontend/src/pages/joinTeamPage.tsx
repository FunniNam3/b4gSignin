import { useLocation } from "react-router-dom";
import { useState } from "react";

export function JoinTeam() {
  interface LocationState {
    teamID?: number;
    teamName?: string;
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const teamName = (location.state as LocationState)?.teamName;
  const teamID = (location.state as LocationState)?.teamID;
  // TODO make this page actually add the person to the team and load them into the team page afterwards
  return (
    <div>
      <h1> Joining {teamName}</h1>
    </div>
  );
}
