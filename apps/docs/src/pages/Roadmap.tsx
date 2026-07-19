import { CheckCircle2, Circle, CircleDot } from 'lucide-react';
import { PageHeader, Section } from '../components/PageHeader';

type Item = { label: string; status: 'done' | 'in-progress' | 'planned' };

const phase1: Item[] = [
  {
    label: 'Monorepo scaffold (npm workspaces, TS project refs, ESLint/Prettier/Husky, CI)',
    status: 'done',
  },
  {
    label: 'Design token system (color/type/space/radius/shadow) + Tailwind preset',
    status: 'done',
  },
  { label: '@nova-ui/utils — 10 functions, fully tested', status: 'done' },
  { label: '@nova-ui/hooks — 14 hooks, fully tested', status: 'done' },
  {
    label:
      '10 flagship components (Button, IconButton, Badge, Avatar, Card, Alert, Input, Checkbox, Switch, Tooltip)',
    status: 'done',
  },
  { label: 'Storybook (config + stories per component)', status: 'done' },
  {
    label:
      'Documentation site (Introduction, Theming, Accessibility, Hooks, Utilities, component pages)',
    status: 'done',
  },
];

const phase2: Item[] = [
  {
    label:
      'Remaining Inputs: Textarea, Select, Radio, Slider, Date Picker, File Upload, Tag Input, Stepper, OTP Input',
    status: 'planned',
  },
  {
    label: 'Navigation: Tabs, Breadcrumb, Pagination, Dropdown, Accordion, Command Palette',
    status: 'planned',
  },
  {
    label:
      'Data Display: Table / Data Grid (with virtualization), Skeleton, Progress, Empty State, Timeline',
    status: 'planned',
  },
  {
    label: 'Feedback: Modal, Drawer, Popover, Toast/Snackbar, Notification Center',
    status: 'planned',
  },
  { label: 'Layout: Stack, Grid, Dashboard Layout, Resizable Panels', status: 'planned' },
  {
    label: 'Analytics widgets: Filter Bar, Trend Card, Chart Container (recharts wrapper)',
    status: 'planned',
  },
];

const phase3: Item[] = [
  {
    label:
      'Interactive playground with editable props / copy-JSX (currently: per-page live previews with variant switching serve this role — see note below)',
    status: 'planned',
  },
  {
    label: 'Chromatic visual regression, wired into CI (workflow stub already present)',
    status: 'planned',
  },
  {
    label:
      'Manual + assistive-technology accessibility audit (current coverage is automated-only: jsx-a11y + Storybook a11y addon)',
    status: 'planned',
  },
  { label: 'npm publish pipeline with Changesets for versioning', status: 'planned' },
  {
    label:
      'Floating-ui-based positioning for Tooltip/Popover/Dropdown (current Tooltip is CSS-positioned, no collision detection)',
    status: 'planned',
  },
];

function StatusIcon({ status }: { status: Item['status'] }) {
  if (status === 'done')
    return <CheckCircle2 className="size-4 shrink-0 text-success-600 dark:text-success-400" />;
  if (status === 'in-progress') return <CircleDot className="size-4 shrink-0 text-warning-500" />;
  return <Circle className="size-4 shrink-0 text-text-disabled" />;
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-2.5 text-small text-text-secondary">
          <span className="mt-0.5">
            <StatusIcon status={item.status} />
          </span>
          <span className={item.status === 'done' ? 'text-text-primary' : ''}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function RoadmapPage() {
  return (
    <div>
      <PageHeader
        title="Roadmap"
        description="What's actually built, not just planned. This page is the honest version of the original project spec's full scope."
      />

      <Section title="Phase 1 — Foundation (shipped)">
        <ItemList items={phase1} />
      </Section>

      <Section title="Phase 2 — Component breadth">
        <ItemList items={phase2} />
      </Section>

      <Section title="Phase 3 — Hardening & infra">
        <ItemList items={phase3} />
      </Section>
    </div>
  );
}
