import type { User } from "./user";

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export type AuthResponse =
  | { success: true; user: User }
  | { success: false; error: string };
