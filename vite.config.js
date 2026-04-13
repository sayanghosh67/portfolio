import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/',   // GitHub repo name — change if your repo is named differently
  plugins: [
    tailwindcss(),
    react()
  ],
})
