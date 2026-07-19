import type { Config } from 'tailwindcss';
import novaPreset from '../../packages/theme/src/tailwind-preset';

export default {
  presets: [novaPreset as Config],
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
} satisfies Config;
