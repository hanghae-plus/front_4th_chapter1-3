import React, { createContext, useContext, useState } from "react";

// 1. Notification 인터페이스 정의
interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

// 2. NotificationContextType 정의
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

// 3. NotificationContext 생성
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification["type"]) => {
    // NOTE: 새로운 알림 생성 시 현재 시간을 ID로 사용
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    // NOTE: 지정된 ID의 알림만 필터링하여 제거
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: [...notifications],
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  // NOTE: 현재 NotificationContext의 값을 가져와서 반환
  const context = useContext(NotificationContext);

  // NOTE: NotificationProvider로 감싸지 않은 컴포넌트에서 useNotification을 호출할 때 에러 발생
  if (context === undefined) {
    throw new Error(
      "useNotification은 NotificationProvider 내부에서 사용해야 합니다."
    );
  }

  return context;
};
