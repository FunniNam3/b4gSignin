import type { TeamType } from "../../types/teams";
import { Team } from "./team";

const TeamsTable = ({ teams }: { teams: TeamType[] }) => {
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
          <Team key={team.teamID} team={team} />
        ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;
