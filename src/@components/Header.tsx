import { useNotificationSystemActionsContext } from "../@contexts/NotificationSystemProvider";
import {
  useThemeActionsContext,
  useThemeStateContext,
} from "../@contexts/ThemeProvider";
import {
  useUserActionsContext,
  useUserStateContext,
} from "../@contexts/UserProvider";
import { UserType } from "../@contexts/UserProvider.types";
import { usePreservedCallback } from "../@lib/hooks/usePreservedCallback";
import { renderLog } from "../utils";

function Header() {
  renderLog("Header rendered");

  const TEST_USER: UserType = {
    id: 1,
    name: "홍길동",
    email: "test@aaa.aaa",
  };

  const { user } = useUserStateContext("Header");
  const { login, logout } = useUserActionsContext("Header");

  const { theme } = useThemeStateContext("Header");
  const { toggleTheme } = useThemeActionsContext("Header");

  const { addNotification } = useNotificationSystemActionsContext("Header");

  const handleLoginClick = usePreservedCallback(() => {
    login(TEST_USER);
    addNotification({
      type: "success",
      message: "성공적으로 로그인되었습니다",
    });
  });

  const handleLogoutClick = usePreservedCallback(() => {
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
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
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

export default Header;
