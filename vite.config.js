import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.url, '/src/components'),
      '@utils': path.resolve(import.meta.url, '/src/utils'),
      '@api': path.resolve(import.meta.url, '/src/api'),
      '@store': path.resolve(import.meta.url, '/src/store'),
      '@constant': path.resolve(import.meta.url, '/src/constant'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
