import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge, Card } from '@nova-ui/react';
import { PageHeader } from '../components/PageHeader';

type ComponentEntry = { name: string; to?: string };
type Category = { name: string; items: ComponentEntry[] };

const catalog: Category[] = [
  {
    name: 'Inputs',
    items: [
      { name: 'Button', to: '/components/button' },
      { name: 'Icon Button' },
      { name: 'Input', to: '/components/input' },
      { name: 'Textarea' },
      { name: 'Password Input' },
      { name: 'Search Input' },
      { name: 'OTP Input' },
      { name: 'Checkbox' },
      { name: 'Radio' },
      { name: 'Switch' },
      { name: 'Slider' },
      { name: 'File Upload' },
      { name: 'Date Picker' },
      { name: 'Select' },
      { name: 'Multi Select' },
      { name: 'Autocomplete' },
      { name: 'Tag Input' },
      { name: 'Stepper' },
    ],
  },
  {
    name: 'Navigation',
    items: [
      { name: 'Navbar' },
      { name: 'Sidebar' },
      { name: 'Tabs' },
      { name: 'Breadcrumb' },
      { name: 'Pagination' },
      { name: 'Dropdown' },
      { name: 'Context Menu' },
      { name: 'Command Palette' },
      { name: 'Accordion' },
    ],
  },
  {
    name: 'Data Display',
    items: [
      { name: 'Card' },
      { name: 'Statistic Card' },
      { name: 'Metric Card' },
      { name: 'KPI Card' },
      { name: 'Avatar' },
      { name: 'Badge' },
      { name: 'Chip' },
      { name: 'Table' },
      { name: 'Data Grid' },
      { name: 'Timeline' },
      { name: 'List' },
      { name: 'Tree View' },
      { name: 'Empty State' },
      { name: 'Skeleton' },
      { name: 'Progress' },
      { name: 'Charts Wrapper' },
    ],
  },
  {
    name: 'Feedback',
    items: [
      { name: 'Alert', to: '/components/alert' },
      { name: 'Toast' },
      { name: 'Snackbar' },
      { name: 'Tooltip' },
      { name: 'Popover' },
      { name: 'Dialog' },
      { name: 'Modal' },
      { name: 'Drawer' },
      { name: 'Confirmation Dialog' },
      { name: 'Notification Center' },
    ],
  },
  {
    name: 'Layout',
    items: [
      { name: 'Container' },
      { name: 'Stack' },
      { name: 'Grid' },
      { name: 'Flex' },
      { name: 'Divider' },
      { name: 'Resizable Panels' },
      { name: 'Dashboard Layout' },
    ],
  },
  {
    name: 'Analytics',
    items: [
      { name: 'Filter Bar' },
      { name: 'Search Toolbar' },
      { name: 'Trend Card' },
      { name: 'Analytics Card' },
      { name: 'Stat Card' },
      { name: 'Chart Container' },
      { name: 'Metric Widget' },
      { name: 'Dashboard Widget' },
      { name: 'Data Toolbar' },
    ],
  },
];

// Components that exist in packages/ui but don't have a dedicated deep-dive
// page yet — still shown as "Available", just without a `to` link into a
// page that doesn't exist. Keeps this index honest about what you can
// actually `import { X } from '@nova-ui/react'` today.
const availableWithoutPage = new Set([
  'Icon Button',
  'Checkbox',
  'Switch',
  'Avatar',
  'Card',
  'Tooltip',
]);

export function ComponentsIndex() {
  const totalPlanned = catalog.reduce((sum, c) => sum + c.items.length, 0);
  const totalBuilt =
    catalog.reduce((sum, c) => sum + c.items.filter((i) => i.to).length, 0) +
    availableWithoutPage.size;

  return (
    <div>
      <PageHeader
        title="Components"
        description={`${totalBuilt} of ${totalPlanned} planned components are implemented today. Everything else is on the roadmap — see the Roadmap page for sequencing.`}
      />

      {catalog.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="mb-3 text-title text-text-primary">{category.name}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {category.items.map((item) => {
              const isAvailable = !!item.to || availableWithoutPage.has(item.name);
              const content = (
                <Card
                  variant="outlined"
                  noPadding
                  interactive={!!item.to}
                  className="flex h-20 flex-col justify-between p-3"
                >
                  <span className="text-small font-medium text-text-primary">{item.name}</span>
                  {item.to ? (
                    <span className="flex items-center gap-1 text-caption text-primary-600 dark:text-primary-400">
                      View docs <ArrowRight className="size-3" />
                    </span>
                  ) : isAvailable ? (
                    <Badge size="sm" variant="subtle" colorScheme="success">
                      Available
                    </Badge>
                  ) : (
                    <Badge size="sm" variant="subtle" colorScheme="neutral">
                      Coming soon
                    </Badge>
                  )}
                </Card>
              );

              return item.to ? (
                <Link key={item.name} to={item.to} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.name}>{content}</div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
