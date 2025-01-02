import { User } from "./";

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
