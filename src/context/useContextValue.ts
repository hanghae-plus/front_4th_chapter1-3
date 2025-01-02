import { useContext } from "react";

/**
 * context를 안전하게 사용하기 위한 context 커스텀 훅
 * @description React의 useContext를 래핑한 커스텀 훅
 * - Context가 Provider 내부에서 사용되는지 확인하고 Provider 외부에서 사용될 경우 구체적인 에러 메시지와 함께 에러를 발생
 * @param context
 * @returns context 값
 * @throws Error context가 사용되는 컴포넌트을 찾을 수 없는 경우 에러 발생
 */
export const useContextValue = <T>(context: React.Context<T>) => {
  const contextValue = useContext(context);

  if (contextValue == null) {
    const contextName = context.displayName || "Unknown Context";
    throw new Error(
      `${contextName} must be used within an ${contextName}Provider`,
    );
  }

  return contextValue;
};
