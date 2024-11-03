import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import path from "path";

config();
// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          process.env.VITEMODE === "production"
            ? process.env.VITE_CLIENT_URL
            : "http://localhost:8080",
      },

      "/admin": {
        target: "http://localhost:8081/",
      },
    },
  },
});
