import React from "react";
import {
  AuthContextProvider,
  NotiContextProvider,
  ThemeContextProvider,
} from "./@lib";
import ContextWrapper from "./@lib/hooks/context/ContextWrapper";
import AppContainer from "./AppContainer";

const App: React.FC = () => {
  return (
    <ContextWrapper
      providers={[
        ThemeContextProvider,
        AuthContextProvider,
        NotiContextProvider,
      ]}
    >
      <AppContainer />
    </ContextWrapper>
  );
};

export default App;
