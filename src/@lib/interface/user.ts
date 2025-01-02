export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}
