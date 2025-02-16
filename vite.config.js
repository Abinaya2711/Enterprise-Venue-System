import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set Vite to run on port 3000
    open: true, // Auto open browser when server starts (optional)
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        calendar: "calendar.html",
      },
    },
  },
});

