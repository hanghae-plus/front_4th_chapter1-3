import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MemoizedApp from "./MemoizedTestApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoizedApp />
  </StrictMode>,
);
