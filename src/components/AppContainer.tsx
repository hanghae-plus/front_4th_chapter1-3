import React, { useState } from "react";
import { useThemeContext } from "../@lib/hooks/useContext.ts";
import { generateItems } from "../utils.ts";
import { useCallback } from "../@lib";
import { AppLayout } from "./AppLayout.tsx";

/**
 * AppContainer 컴포넌트
 * useThemeContext를 Provider 마운트 후 사용하기 위해 Context를 사용합니다.
 */
export const AppContainer: React.FC = () => {
  const { theme } = useThemeContext();

  const [items, setItems] = useState(() => generateItems(1000));
  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return <AppLayout theme={theme} items={items} onAddItems={addItems} />;
};
