import {
  useNotificationSystemActionsContext,
  useNotificationSystemStateContext,
} from "../@contexts/NotificationSystemProvider";
import { renderLog } from "../utils";

function NotificationSystem() {
  renderLog("NotificationSystem rendered");

  const { group } = useNotificationSystemStateContext("NotificationSystem");
  const { removeNotification } =
    useNotificationSystemActionsContext("NotificationSystem");

  if (group.size === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {[...group.entries()].map(([id, { type, message }]) => (
        <div
          key={id}
          className={`p-4 rounded shadow-lg ${colorVariants[type]} text-white`}
        >
          {message}
          <button
            onClick={() => removeNotification(id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
}

// Styles
const colorVariants = {
  info: "bg-blue-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  success: "bg-green-500",
} as const;

export default NotificationSystem;
