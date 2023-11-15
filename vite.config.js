import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    // ... other plugins
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Set the limit to 1 MB
  },
});

