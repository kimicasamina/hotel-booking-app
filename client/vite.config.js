import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import path from "path";

config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
