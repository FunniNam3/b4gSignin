export interface User {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  gradYear: number | null;
  teamID: number | null;
  dietaryRestrictions: string[] | null;
}
