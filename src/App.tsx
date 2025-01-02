import React from "react";
import { CombinedContextProvider } from "@/context/providers";
import {
  Layout,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "@/components";
import { useMemo } from "@/@lib";
import { useThemeContext } from "@/context/hooks";

const App: React.FC = () => {
  const { theme } = useThemeContext();
  const containerClassName = useMemo(
    () =>
      `min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
      }`,
    [theme],
  );

  return (
    <CombinedContextProvider>
      <div className={containerClassName}>
        <Layout>
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </Layout>
      </div>
      <NotificationSystem />
    </CombinedContextProvider>
  );
};

export default App;
