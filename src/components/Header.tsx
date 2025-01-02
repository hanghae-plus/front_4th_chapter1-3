import {
  useThemeActionContext,
  useThemeStateContext,
} from "../contexts/ThemeContext";
import {
  useUserActionContext,
  useUserStateContext,
} from "../contexts/UserContext";
import { renderLog } from "../utils";
import { Button } from "./Button";

export const Header: React.FC = () => {
  renderLog("Header rendered");
  const { theme } = useThemeStateContext();
  const { toggleTheme } = useThemeActionContext();
  const { user } = useUserStateContext();
  const { login, logout } = useUserActionContext();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <Button onClick={toggleTheme}>
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </Button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <Button theme="danger" onClick={logout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              theme="success"
              onClick={() => login("user@example.com", "password")}
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
