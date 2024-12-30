import { useCallback } from '../@lib';
import useUserContext from '../@lib/hooks/useUserContext';
import useNotificationContext from '../@lib/hooks/useNotificationContext';

const LogoutButton = () => {
  const { user, logout } = useUserContext();
  const { addNotification } = useNotificationContext();
  const handleLogout = useCallback(() => {
    try {
      logout();
    } catch {
      addNotification('로그아웃에 실패했습니다.', 'error');
    }
    addNotification('로그아웃되었습니다.', 'info');
  }, [addNotification, logout]);

  return (
    <div className="flex items-center">
      <span className="mr-2">{user?.name}님 환영합니다!</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        로그아웃
      </button>
    </div>
  );
};

export default LogoutButton;
