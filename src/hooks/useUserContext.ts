import { useContext } from "react";
import { UserContext, UserContextType } from "../store/UserContext";

export const useUserContext = () => {
  const userContext = useContext<UserContextType | undefined>(UserContext);
  if (!userContext) {
    throw Error("useUserContext 는 UserProvider 내부에서만 사용되어야 합니다.");
  }

  return userContext;
};
