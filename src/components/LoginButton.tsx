import { useCallback } from '../@lib';
import useUserContext from '../@lib/hooks/useUserContext';
import useNotificationContext from '../@lib/hooks/useNotificationContext';

const LoginButton = () => {
  const { login } = useUserContext();
  const { addNotification } = useNotificationContext();
  const handleLogin = useCallback(() => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    try {
      login('user@example.com', 'password');
    } catch {
      addNotification('로그인에 실패했습니다.', 'error');
    }
    addNotification('로그인되었습니다.', 'success');
  }, [addNotification, login]);

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      로그인
    </button>
  );
};

export default LoginButton;
