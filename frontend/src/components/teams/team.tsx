import type { TeamType } from "../../types/teams";
import { useNavigate } from "react-router-dom";

type TeamProps = {
  team: TeamType;
};

export function Team({ team }: TeamProps) {
  const nav = useNavigate();

  function onJoin(teamID: number, teamName: string) {
    nav("/updateTeam", {
      replace: true,
      state: { joining: true, teamID: teamID, teamName: teamName },
    });
  }

  return (
    <tr>
      <td className="p-3 border-b border-gray-300">{team.teamName}</td>
      <td className="p-3 border-b border-gray-300">
        {team.leaderFirstName} {team.leaderLastName}
      </td>
      <td className="p-3 border-b border-gray-300">{team.memberCount}</td>
      <td className="p-3 border-b border-gray-300">
        {team.memberCount > 0 ? (
          <ul className="flex flex-col">
            {team.members.map((member) => (
              <li key={member.userID}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <em>No members</em>
        )}
      </td>
      <td className="p-3 border-b border-gray-300">
        <button
          onClick={() => onJoin(team.teamID, team.teamName)}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Join Team
        </button>
      </td>
    </tr>
  );
}
