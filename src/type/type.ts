interface IUser {
  id: number;
  name: string;
  email: string;
}

interface INotification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface IItem {
  id: number;
  name: string;
  category: string;
  price: number;
}

export type { IUser, INotification, IItem };
