import { useContext } from "react";
import { UserContext, UserType } from "./UserContext";
import { useStore } from "@lib/hooks";

export const useUserStore = <S>(selector: (context: UserType) => S) => {
  const store = useContext(UserContext);
  if (store === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return useStore(store, selector);
};
