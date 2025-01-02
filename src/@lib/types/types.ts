export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export interface UseFormProps<T> {
  initialState: T;
  validate: (values: T) => ValidationError<T>;
  onSubmit: (values: T) => void;
}

export interface FormValues {
  name: string;
  email: string;
  age: number;
  preferences: string[];
}

export type ValidationError<T> = {
  [K in keyof T]?: string;
};
