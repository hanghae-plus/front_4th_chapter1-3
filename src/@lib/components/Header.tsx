import { renderLog } from "../../utils";
import { memo } from "../hocs";
import { useLogin } from "../hooks/useLogin";
import { useThemeContext } from "../hooks/useThemeContext";

// Header 컴포넌트
export const Header: React.FC = memo(() => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useThemeContext();
  const { user, login, logout } = useLogin();

  const handleLogin = () => {
    login("user@example.com");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>
                {user.name} ({user.email})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
