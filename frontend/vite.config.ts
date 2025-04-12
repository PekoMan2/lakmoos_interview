import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/events': {
        target: process.env.REACT_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
});