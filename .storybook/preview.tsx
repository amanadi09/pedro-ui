import type { Preview, Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import './preview.css';

/** Applies the toolbar's light/dark selection to <html> so Nova UI's CSS
 * variable tokens (which key off `.dark`, not a prop) respond correctly.
 * Split out as its own component (not inlined in the decorator below) so
 * the `useEffect` call satisfies react-hooks/rules-of-hooks, which keys
 * off naming — Storybook's `Decorator` type is hook-legal but is
 * conventionally named like `withTheme`, not `WithTheme` or `useTheme`. */
function ThemeSync({ mode }: { mode: 'light' | 'dark' }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);
  return null;
}

const withTheme: Decorator = (Story, context) => {
  const mode = context.globals.theme as 'light' | 'dark';

  return (
    <div className="bg-background p-8 text-text-primary transition-colors">
      <ThemeSync mode={mode} />
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // eslint-plugin-storybook / addon-a11y: every story is checked against
    // WCAG 2 AA by default. Individual stories can loosen this via
    // parameters.a11y.config for intentionally-decorative examples.
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    backgrounds: { disable: true }, // theme decorator drives background via tokens instead
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
