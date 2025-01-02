import { createContext, useContext } from "react";

export function createContextHook<T>(name: string) {
  const Context = createContext<T | null>(null);

  const useContextHook = () => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return [Context, useContextHook] as const;
}
