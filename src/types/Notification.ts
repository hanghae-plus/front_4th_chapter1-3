export interface INotification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}
