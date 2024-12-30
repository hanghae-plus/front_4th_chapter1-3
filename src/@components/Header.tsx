import { memo } from "react";
import { renderLog } from "../utils";
import { usePreservedCallback } from "../@lib/hooks/usePreservedCallback";
import {
  useUserActionsContext,
  useUserStateContext,
} from "../@contexts/UserContext";
import {
  useThemeActionsContext,
  useThemeStateContext,
} from "../@contexts/ThemeContext";
import { useNotificationsActionsContext } from "../@contexts/NotificationsContext";

function Header() {
  renderLog("Header rendered");

  const { user } = useUserStateContext("Header");
  const { login, logout } = useUserActionsContext("Header");

  const { mode } = useThemeStateContext("Header");
  const { toggleThemeMode } = useThemeActionsContext("Header");

  const { addNotification } = useNotificationsActionsContext("Header");

  const handleLogin = usePreservedCallback((user) => {
    login(user);
    addNotification({
      type: "success",
      message: "성공적으로 로그인되었습니다",
    });
  });

  const handleLogout = usePreservedCallback(() => {
    logout();
    addNotification({
      type: "info",
      message: "로그아웃되었습니다",
    });
  });

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleThemeMode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {mode === "light" ? "다크 모드" : "라이트 모드"}
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
  );
}

export default memo(Header);
