import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false, filename: "dist/stats.html" }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-mui": [
            "@mui/material",
            "@mui/icons-material",
            "@mui/x-date-pickers",
            "@emotion/react",
            "@emotion/styled",
          ],
          "vendor-quill": ["quill"],
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
  },
});
