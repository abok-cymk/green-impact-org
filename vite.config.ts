import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "/", // Crucial: forces absolute path resolution through the Vercel proxy
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Use import.meta.dirname instead of __dirname
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    strictPort: true, // Prevents port collisions while vercel dev connects
  },
})
