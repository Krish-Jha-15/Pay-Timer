
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    proxy: {
      '/abc': {
          target: 'https://pay-timer.onrender.com',
      //  target: 'http://localhost:4600',

        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/abc/, '/api/v1'), 
      }
    }
  },
  plugins: [react(),tailwindcss(),],
});
