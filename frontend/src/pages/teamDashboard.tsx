import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import type { TeamMember, TeamType } from "../types/teams";
import { useNavigate } from "react-router-dom";

export function TeamDashboard() {
  const { user } = useAuth();
  const [team, setTeam] = useState<TeamType>();
  const nav = useNavigate();

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
    <div className="flex flex-col gap-2">
      <h1>{team?.teamName}</h1>
      <h2>Size: {team?.size}</h2>
      <div className="flex flex-col gap-5">
        {team?.members.map((member) => (
          <div className="border-2 p-3">
            <p>
              {member.firstName} {member.lastName}
            </p>
            <p>{member.email}</p>
            <p>Grad Year: {member.gradYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
