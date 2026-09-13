import type { Config } from 'tailwindcss';
import pedroPreset from '../../packages/theme/src/tailwind-preset';

export default {
  presets: [pedroPreset as Config],
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
} satisfies Config;
