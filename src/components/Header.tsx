import { memo } from "../@lib/hocs";
import { useCallback, useMemo } from "../@lib/hooks";
import { renderLog } from "../utils";
import { useTheme, useUser } from "../hooks";
import { useNotificationActions } from "../hooks/useNotificationActions";

export const Header: React.FC = memo(() => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useUser();
  const { addNotification } = useNotificationActions();

  const handleLogin = useCallback(() => {
    login("user@example.com", "123");
    addNotification("성공적으로 로그인되었습니다", "success");
  }, [login, addNotification]);

  const handleLogout = useCallback(() => {
    logout();
    addNotification("로그아웃되었습니다", "info");
  }, [logout, addNotification]);

  const themeButtonText = useMemo(() => {
    return theme === "light" ? "다크 모드" : "라이트 모드";
  }, [theme]);

  const buttonClass = useMemo(() => {
    return theme === "light"
      ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      : "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2";
  }, [theme]);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button onClick={toggleTheme} className={buttonClass}>
            {themeButtonText}
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
});
