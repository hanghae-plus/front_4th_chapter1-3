import { useContext } from "react";
import { LoginContext } from "../context/login";

// 로그인 관련 커스텀 훅
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
