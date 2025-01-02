import { NotificationProvider, ThemeProvider, UserProvider } from "./contexts";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default Provider;
