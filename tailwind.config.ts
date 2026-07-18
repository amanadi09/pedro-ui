import type { Config } from 'tailwindcss';
import novaPreset from './packages/theme/src/tailwind-preset';

// Root-level Tailwind config, used by Storybook (which builds from the repo
// root). Apps own their own tailwind.config.ts that extends the same
// preset with an app-scoped `content` glob — see apps/docs/tailwind.config.ts.
export default {
  presets: [novaPreset as Config],
  darkMode: 'class',
  content: ['./packages/ui/src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
} satisfies Config;
