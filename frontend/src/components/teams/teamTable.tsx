import type { TeamType } from "../../types/teams";
import { Team } from "./team";

const TeamsTable = ({ teams }: { teams: TeamType[] }) => {
  return (
    <table className="text-center border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border-b border-gray-300">Team Name</th>
          <th className="border-b border-gray-300">Team Leader</th>
          <th className="border-b border-gray-300">Member Count</th>
          <th className="border-b border-gray-300">Members</th>
          <th className="border-b border-gray-300">Action</th>
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
