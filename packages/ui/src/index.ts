/**
 * @pedro-ui/react
 *
 * The public API surface. Anything not exported here is a private
 * implementation detail and may change without a major version bump —
 * see CONTRIBUTING.md "What counts as a breaking change".
 */

export * from './components';
export { ThemeProvider, useTheme } from './theme/ThemeProvider';
export type { ThemeProviderProps, PedroThemeContextValue } from './theme/ThemeProvider';
export { withPedroIconDefaults } from './icons';
export type { PedroSize, PedroColorScheme } from './types';
