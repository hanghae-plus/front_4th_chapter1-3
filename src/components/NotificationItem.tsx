import { memo } from "../@lib/hocs/memo";
import { Notification } from "../types";

export const NotificationItem: React.FC<{
  notification: Notification;
  onRemove: (id: number) => void;
}> = memo(({ notification, onRemove }) => {
  return (
    <div
      className={`p-4 rounded shadow-lg ${
        notification.type === "success"
          ? "bg-green-500"
          : notification.type === "error"
            ? "bg-red-500"
            : notification.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
      } text-white`}
    >
      {notification.message}
      <button
        onClick={() => onRemove(notification.id)}
        className="ml-4 text-white hover:text-gray-200"
      >
        닫기
      </button>
    </div>
  );
});
