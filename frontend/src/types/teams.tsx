export interface TeamMember {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  gradYear: number;
}

export interface TeamType {
  teamID: number;
  teamName: string;
  size: number;
  members: Array<TeamMember>;
}
