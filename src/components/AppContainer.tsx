import React from "react";
import { AppLayout } from "./AppLayout.tsx";
import { useThemeContext } from "../@lib";

/**
 * AppContainer 컴포넌트
 * useThemeContext를 Provider 마운트 후 사용하기 위해 Context를 사용합니다.
 */
export const AppContainer: React.FC = () => {
  const { theme } = useThemeContext();

  return <AppLayout theme={theme} />;
};
