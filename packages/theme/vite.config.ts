import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Library build for npm publish. During local dev, consumers resolve
// `@pedro-ui/theme` straight to `src/index.ts` via the workspace symlink
// (see package.json `main`), so this build is only exercised by
// `npm run build` / CI, not by the docs app dev server.
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'tailwind-preset': resolve(__dirname, 'src/tailwind-preset.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['tailwindcss', 'tailwindcss-animate'],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
