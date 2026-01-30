import { useState } from "react";
import axios from "axios";

export function Teams() {
  const [team, setTeam] = useState<string>("");

  async function handleSubmit() {
    const res = await axios.get("/teamSearch", { params: { team: team } });
    console.log(res.data.teams);
  }

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
        <button onClick={handleSubmit}>Search</button>
      </div>
    </div>
  );
}
