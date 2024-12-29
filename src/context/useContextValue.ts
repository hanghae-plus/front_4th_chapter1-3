import { useContext } from "react";

/**
 * context를 안전하게 사용하기 위한 context 커스텀 훅
 * @description context를 안전하게 사용하는 함수
 * @param context
 * @returns context 값
 * @throws Error context가 사용되는 컴포넌트을 찾을 수 없는 경우 에러 발생
 */
export const useContextValue = <T>(context: React.Context<T>) => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error(`${context} must be used within an AppProvider`);
  }
  return contextValue;
};
