import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import type { TeamType } from "../types/teams";
import { useNavigate } from "react-router-dom";

export function TeamDashboard() {
  const { user } = useAuth();
  const [team, setTeam] = useState<TeamType>();
  const nav = useNavigate();

  function leaveTeam(teamName: string | undefined) {
    if (!teamName) {
      return;
    }
    nav("/updateTeam", {
      replace: true,
      state: { joining: false, teamID: null, teamName: teamName },
    });
  }

  if (!user?.teamID) {
    nav("/");
  }

  async function loadTeam() {
    const res = await axios.get("/getTeam", {
      params: { teamID: user?.teamID },
    });
    if (res.data.success) {
      setTeam(res.data.team);
    }
  }

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-5xl">{team?.teamName}</h1>
      <h2 className="text-3xl">Member Count: {team?.memberCount}</h2>
      <div className="flex flex-col gap-5">
        {team?.members.map((member) => (
          <div className="border-2 p-3" key={member.userID}>
            <p className="text-2xl">
              {member.firstName} {member.lastName}
            </p>
            <p>{member.email}</p>
            <p>Grad Year: {member.gradYear}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-red-600 w-30 h-10"
        onClick={() => {
          leaveTeam(team?.teamName);
        }}
      >
        Leave Team
      </button>
    </div>
  );
}
