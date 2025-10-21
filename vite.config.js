import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    react(),
    tailwindcss(),
    
  ],
server: {
    host: true, // This allows access from other devices on the network
    port: 5173, // You can change this if needed
  },


})
