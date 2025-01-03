import { memo } from "../@lib/hocs/memo";
import { useCallback, useMemo } from "../@lib/hooks";
import { renderLog } from "../utils";
import { useNotificationState } from "../hooks/useNotificationState";
import { useNotificationActions } from "../hooks/useNotificationActions";
import { NotificationItem } from "./NotificationItem";

export const NotificationSystem: React.FC = memo(() => {
  renderLog("NotificationSystem rendered");
  const { notifications } = useNotificationState();
  const { removeNotification } = useNotificationActions();

  const handleRemove = useCallback(
    (id: number) => {
      removeNotification(id);
    },
    [removeNotification]
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
