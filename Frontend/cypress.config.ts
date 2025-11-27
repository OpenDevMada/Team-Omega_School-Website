import { defineConfig } from "cypress";
import "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "./cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: "./cypress/support/e2e.{js,ts}",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
