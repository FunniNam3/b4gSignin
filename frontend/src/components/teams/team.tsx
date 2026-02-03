import type { TeamType } from "../../types/teams";

type TeamProps = {
  team: TeamType;
  onJoin: (teamID: number, teamName: string) => void;
};

export function Team({ team, onJoin }: TeamProps) {
  console.log(team);
  return (
    <tr>
      <td>{team.teamName}</td>
      <td>{team.size}</td>
      <td>
        {team.size > 0 ? (
          <ul>
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
      <td>
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
