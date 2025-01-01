import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "./contexts/app/AppProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </StrictMode>,
);
