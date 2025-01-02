import React, { useCallback, useMemo } from "react";
import { renderLog } from "../utils";
import { useNotification } from "../hooks";
import { NotificationItem } from "./";

export const NotificationSystem: React.FC = React.memo(() => {
  renderLog("NotificationSystem rendered");
  const { notifications, removeNotification } = useNotification();

  const handleRemove = useCallback(
    (id: number) => {
      removeNotification(id);
    },
    [removeNotification],
  );

  // useMemo를 사용하여 알림 목록을 메모이제이션
  const renderedNotifications = useMemo(() => {
    return notifications.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
        onRemove={handleRemove}
      />
    ));
  }, [notifications, handleRemove]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {renderedNotifications}
    </div>
  );
});
