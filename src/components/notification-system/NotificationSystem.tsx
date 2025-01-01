import {
  NotificationType,
  useGetNotificationActions,
  useGetNotifications,
} from "../../contexts/notification-context/useNotificationContext";
import { renderLog } from "../../utils";

export const NotificationSystem: React.FC = () => {
  renderLog("NotificationSystem rendered");
  const { removeNotification } = useGetNotificationActions();
  const notifications = useGetNotifications();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg ${getNotificationStyleByType(
            notification.type,
          )} text-white`}
        >
          {notification.message}
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
};

function getNotificationStyleByType(type: NotificationType) {
  switch (type) {
    case "success": {
      return "bg-green-500";
    }
    case "error": {
      return "bg-red-500";
    }
    case "warning": {
      return "bg-yellow-500";
    }
    case "info":
    default: {
      return "bg-blue-500";
    }
  }
}
