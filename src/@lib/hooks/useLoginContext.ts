import { useContext } from "react";
import { LoginContext } from "../../context/LoginContextProvider";

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within an LoginProvider");
  }
  return context;
};
