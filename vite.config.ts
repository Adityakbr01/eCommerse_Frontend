import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6090, // This sets your development server to run on port 6090
    proxy: {
      "/api": {
        target: "https://ecommerse-backend-4h3c.onrender.com/api/",
        changeOrigin: true, // Needed for proxying APIs hosted on different origin
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrites the /api to '' if needed by your backend
      },
    },
  },
});
