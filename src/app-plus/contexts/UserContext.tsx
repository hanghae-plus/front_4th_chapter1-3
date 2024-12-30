import { createContext, PropsWithChildren, useContext } from "react";
import { useRef, useStore } from "../../@lib";
import { createStore, Store } from "../../storeUtils";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
}

interface UserActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

type UserType = UserState & UserActions;
type UserStore = Store<UserType>;

const userStore: UserStore = createStore<UserType>((set) => ({
  user: null,
  login: (email) => {
    set((prev) => {
      return { ...prev, user: { id: 1, name: "홍길동", email } };
    });
  },
  logout: () => {
    set((prev) => {
      return { ...prev, user: null };
    });
  },
}));

const UserContext = createContext<UserStore | undefined>(undefined);

const UserProvider = ({ children }: PropsWithChildren) => {
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

const useUserStore = <S,>(selector: (context: UserType) => S) => {
  const store = useContext(UserContext);
  if (store === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return useStore(store, selector);
};

export { UserProvider, useUserStore };
