import { User } from "../../types";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
