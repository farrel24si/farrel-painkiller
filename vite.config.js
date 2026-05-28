import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Kembalikan import Tailwind-mu!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Kembalikan plugin Tailwind-mu!
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ini tambahan wajib untuk Shadcn UI
    },
  },
})