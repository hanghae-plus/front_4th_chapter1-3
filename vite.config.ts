import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";

export default mergeConfig(
  defineConfig({
    plugins: [
      react(),
      legacy({
        targets: ["> 1%", "last 2 versions", "not dead", "not ie <= 10"],
        additionalLegacyPolyfills: ["es.object.is"],
      }),
    ],
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reportsDirectory: "./.coverage",
        reporter: ["lcov", "json", "json-summary"],
      },
    },
  }),
);
