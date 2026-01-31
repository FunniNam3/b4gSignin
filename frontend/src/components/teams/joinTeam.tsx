import { useLocation } from "react-router-dom";
import { useState } from "react";

export function JoinTeam() {
  interface LocationState {
    teamID?: string;
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const team = (location.state as LocationState)?.teamID;
  // TODO make this page actually add the person to the team and load them into the team page afterwards
  return (
    <div>
      <h1>{team}</h1>
    </div>
  );
}
