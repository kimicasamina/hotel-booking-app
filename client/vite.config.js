import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api": {
        target:
          process.env.VITE_MODE === "production"
            ? process.env.VITE_CLIENT_URL
            : "http://localhost:8080",
      },

      "/admin": {
        target: "http://localhost:8081/",
      },
    },
  },
});
