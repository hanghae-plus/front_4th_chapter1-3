export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
