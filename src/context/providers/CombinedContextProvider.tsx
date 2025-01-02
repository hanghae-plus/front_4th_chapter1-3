import {
  NotificationContextProvider,
  ThemeContextProvider,
  UserContextProvider,
} from "@/context/providers";

export const CombinedContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};
