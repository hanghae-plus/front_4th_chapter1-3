import { createContextHook } from "../../utils/function/createContextHook";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const [UserContext, useUserContext] =
  createContextHook<UserContextType>("User");
