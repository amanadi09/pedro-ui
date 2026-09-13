/**
 * Shared size scale used by every sizeable component (Button, Input,
 * Badge, Avatar, Switch, Checkbox...) so an app composing several of them
 * side by side can pass the same `size` value everywhere and get visually
 * matched heights — see `apps/docs` "Kitchen sink" example.
 */
export type PedroSize = 'sm' | 'md' | 'lg';

/**
 * Shared semantic color scheme, mirrored 1:1 from the token ramps in
 * `@pedro-ui/theme` (`primary`, `secondary`, `success`, `danger`, `warning`,
 * `info`, `neutral`). Named `colorScheme` (not `color` or `variant`) to
 * match Chakra UI's terminology, per Pedro UI's stated API-compatibility
 * goal.
 */
export type PedroColorScheme =
  'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
