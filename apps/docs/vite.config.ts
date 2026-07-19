import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Resolves @nova-ui/* straight to package source. This is what lets the
// docs app hot-reload when you edit a component in packages/ui without
// running that package's own build first — see root README for the
// tradeoffs of source-based workspace resolution vs. building each
// package to dist/.
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
  server: {
    port: 5173,
  },
});
