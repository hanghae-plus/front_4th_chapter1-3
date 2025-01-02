import { useContext } from "react";
import { UserActionContext, UserStateContext } from "./UserContext";

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within an UserProvider");
  }
  return context;
};

export const useUserAction = () => {
  const context = useContext(UserActionContext);
  if (context === undefined) {
    throw new Error("useUserAction must be used within an UserProvider");
  }
  return context;
};
