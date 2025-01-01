interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

export type { User, Notification, Item };
