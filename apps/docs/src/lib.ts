export type NavItem = { label: string; to: string };
export type NavSection = { title: string; items: NavItem[] };

// Single source of truth for the docs nav. The "Components" section
// intentionally lists every component from the spec, not just the ones
// with a built page yet — ComponentsIndex renders the rest as
// "Coming soon" so the roadmap is visible in the nav itself, not just in
// ROADMAP.md.
export const navSections: NavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', to: '/' },
      { label: 'Theming', to: '/theming' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'All components', to: '/components' },
      { label: 'Button', to: '/components/button' },
      { label: 'IconButton', to: '/components/icon-button' },
      { label: 'Input', to: '/components/input' },
      { label: 'Checkbox', to: '/components/checkbox' },
      { label: 'Switch', to: '/components/switch' },
      { label: 'Card', to: '/components/card' },
      { label: 'Avatar', to: '/components/avatar' },
      { label: 'Alert', to: '/components/alert' },
      { label: 'Tooltip', to: '/components/tooltip' },
    ],
  },
  {
    title: 'Packages',
    items: [
      { label: 'Hooks', to: '/hooks' },
      { label: 'Utilities', to: '/utilities' },
    ],
  },
  {
    title: 'Project',
    items: [{ label: 'Roadmap', to: '/roadmap' }],
  },
];
