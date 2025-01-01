import React, { useState, useEffect } from "react";
import { renderLog } from "../../utils";
import { useTheme, useAuth, useNotification } from "../../contexts";

// 별도의 컴포넌트로 notification 로직 분리
const AuthNotification: React.FC<{ action: string }> = React.memo(
  ({ action }) => {
    const { addNotification } = useNotification();

    useEffect(() => {
      if (action === "login") {
        addNotification("성공적으로 로그인되었습니다", "success");
      } else if (action === "logout") {
        addNotification("로그아웃되었습니다", "info");
      }
    }, [action, addNotification]);

    return null;
  }
);

// Header 컴포넌트
// NOTE: 알림 추가 및 닫기 시 header도 같이 리렌더링 되어 React.memo를 사용하여 최적화 -> 그래도 안되서 AuthNotification 컴포넌트 분리
export const Header: React.FC = React.memo(() => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const [authAction, setAuthAction] = useState<string>(""); // 추가

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
    setAuthAction("login");
  };

  const handleLogout = () => {
    logout();
    setAuthAction("logout");
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {theme === "light" ? "다크 모드" : "라이트 모드"}
            </button>
            {user ? (
              <div className="flex items-center">
                <span className="mr-2">{user.name}님 환영합니다!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>
      <AuthNotification action={authAction} />
    </>
  );
});
