import { useNavigate } from "react-router-dom";
import type { TeamType } from "../../types/teams";
import { Team } from "./team";

const TeamsTable = ({ teams }: { teams: TeamType[] }) => {
  const nav = useNavigate();
  function onJoin(teamID: number, teamName: string) {
    nav("/joinTeam", {
      replace: true,
      state: { teamID: teamID, teamName: teamName },
    });
  }

  return (
    <table className="text-center">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Size</th>
          <th>Members</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <Team key={team.teamID} team={team} onJoin={onJoin} />
        ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;
