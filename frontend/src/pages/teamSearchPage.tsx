import { useEffect, useState } from "react";
import axios from "axios";
import TeamsTable from "../components/teams/teamTable";
import type { TeamType } from "../types/teams";

export function TeamSearch() {
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);

  async function handleSubmit(searchTerm?: string) {
    const query = searchTerm ?? team ?? "";
    const res = await axios.get("/teamSearch", { params: { team: query } });
    setTeams(res.data.teams);
  }

  useEffect(() => {
    handleSubmit("");
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h1>Teams</h1>
      <div>
        <input
          id="teamSearch"
          type="text"
          placeholder="Search for a team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button onClick={() => handleSubmit(team)}>Search</button>
      </div>
      <TeamsTable teams={teams} />
    </div>
  );
}
