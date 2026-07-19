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
      { label: 'Input', to: '/components/input' },
      { label: 'Alert', to: '/components/alert' },
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
