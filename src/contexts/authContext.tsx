import React, { createContext, useContext, useState } from "react";

// 1. User 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
}

// 2. AuthContextType 정의
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// 3. AuthContext 생성, 초기값은 undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. AuthProvider 컴포넌트 정의
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);

  // NOTE: 로그인/로그아웃에서 addNotification를 사용하니 의존성이 생겨서 사용하지 않음
  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. AuthContext를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
