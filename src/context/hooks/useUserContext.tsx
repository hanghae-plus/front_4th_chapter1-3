import { useContext } from "react";
import { UserContext } from "@/context/create-contexts";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Cannot find UserContext");
  }
  return context;
};
