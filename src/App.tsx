import { generateItems, renderLog } from "./utils";
import { useCallback, memo } from "./@lib";
import { ThemeProvider } from "./@lib/Context/themeContext";
import { Header } from "./@lib/Components/Header";
import { ItemList } from "./@lib/Components/ItemList";
import { ComplexForm } from "./@lib/Components/ComplexForm";
import {
  NotificationProvider,
  useNotificationState,
  useNotificationAction,
} from "./@lib/Context/useNotificationContext";
import { UserProvider } from "./@lib/Context/userContext";
import { useState } from "react";

// NotificationSystem 컴포넌트
export const NotificationSystem: React.FC = memo(() => {
  renderLog("NotificationSystem rendered");
  const { notifications } = useNotificationState();
  const { removeNotification } = useNotificationAction();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
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
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
});

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(() => {
    return generateItems(1000);
  });

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemList items={items} onAddItemsClick={addItems} />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
              </div>
            </div>
          </div>
          <NotificationSystem />
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
