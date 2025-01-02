import React, { createContext, useState, ReactNode, useContext } from "react";
import { useCallback, useMemo } from "../@lib";
import { User } from "../types/type";
import { useNotification } from "./NotificationContext";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { addNotification } = useNotification();

    const login = useCallback((email: string) => {
        setUser({ id: 1, name: "홍길동", email });
        addNotification("성공적으로 로그인되었습니다", "success")
    }, []);
    const logout = useCallback(() => {
        setUser(null);
        addNotification("로그아웃되었습니다", "info");
    }, []);

    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
