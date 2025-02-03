import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Enables DOM-like testing
    setupFiles: "./src/test/setup.js", // Setup file for additional configs
  },
  server: {
    port: 8080, // Set the server to use port 8080
  },
});
