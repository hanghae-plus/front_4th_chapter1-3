import { useRef } from "@lib/hooks";
import { PropsWithChildren } from "react";
import { UserContext, userStore, UserStore } from "./UserContext";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<UserStore | null>(null);

  if (store.current === null) {
    store.current = userStore;
  }

  return (
    <UserContext.Provider value={store.current}>
      {children}
    </UserContext.Provider>
  );
};
