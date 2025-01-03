import { ReactNode, useState } from "react";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useCallback, useMemo } from "../@lib";
import { UserContext } from "../contexts/UserContext";
import { User } from "../types/user";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext(); // 얘를 Header 컴포넌트 안에서 썼을 때는 요구사항 충족 못함. 이유가 뭘까? : 여기서 Header까지 가는 리렌더링 트리거를 막아야하는데 그러지 못하니까..

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const contextValue = useMemo(
    // 이것이 최적화에 미치는 영향을 알아봐야. => { user, login, logout } 객체는 매 렌더링마다 새롭게 생성됨. 이를 막기 위해 useMemo에다 넣어주는 것.
    // _deps 중 하나라도 바뀌면 새로운 객체가 리턴됨 => 자식들이 리렌더링됨
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
