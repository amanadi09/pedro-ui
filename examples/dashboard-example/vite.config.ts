import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@nova-ui/react', replacement: resolve(__dirname, '../../packages/ui/src/index.ts') },
      {
        find: '@nova-ui/hooks',
        replacement: resolve(__dirname, '../../packages/hooks/src/index.ts'),
      },
      {
        find: '@nova-ui/utils',
        replacement: resolve(__dirname, '../../packages/utils/src/index.ts'),
      },
      {
        find: '@nova-ui/theme',
        replacement: resolve(__dirname, '../../packages/theme/src/index.ts'),
      },
    ],
  },
  server: { port: 5174 },
});
