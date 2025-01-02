import { IUser } from "../User.ts";

export interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
