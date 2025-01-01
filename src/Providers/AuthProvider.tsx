import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { AuthActionsContext, AuthContext, User } from "../hooks/useAuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    const user: User = { id: 1, name: "홍길동", email };
    setUser(user);

    return user;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user }), [user]);
  const actions = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <AuthContext.Provider value={value}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
};
