import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../src"),
    },
  },
  test: {
    environment: "jsdom", // simulate virtual DOM
    setupFiles: [path.resolve(__dirname, "./test/vitest.setup.tsx")], // file for addditional setup
    globals: true, // access variable
    env: {
      IS_REACT_ACT_ENVIRONMENT: "true",
    },
  },
});
