import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.json'], // This will make sure font files are included
  server: {
    port: 3000,
    host: true,
    hmr: {
      host: 'localhost',
    },
    allowedHosts: [
      'e3cc9e636a7c.ngrok-free.app',
      '.ngrok-free.app'  // This will allow all ngrok subdomains
    ]
  },
  publicDir: 'public',
});