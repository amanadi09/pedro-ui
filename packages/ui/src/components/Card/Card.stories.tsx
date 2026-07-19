import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { Card } from './Card';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  args: { variant: 'elevated' },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      Plain card content — pass children directly for simple cases.
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="elevated" className="w-56">
        Elevated
      </Card>
      <Card variant="outlined" className="w-56">
        Outlined
      </Card>
      <Card variant="flat" className="w-56">
        Flat
      </Card>
    </div>
  ),
};

export const WithHeaderBodyFooter: Story = {
  name: 'Composed: Header / Body / Footer',
  render: () => (
    <Card className="w-96">
      <Card.Header>
        <h3 className="text-title">Team members</h3>
        <IconButton
          aria-label="More options"
          icon={<MoreHorizontal />}
          variant="ghost"
          colorScheme="neutral"
          size="sm"
        />
      </Card.Header>
      <Card.Body>You have 12 members across 3 teams.</Card.Body>
      <Card.Footer>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Manage</Button>
      </Card.Footer>
    </Card>
  ),
};

export const StatCardExample: Story = {
  name: 'Real-world: KPI / stat card',
  render: () => (
    <Card className="w-64">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-small text-text-secondary">Monthly revenue</p>
          <p className="mt-1 text-heading">$48,290</p>
        </div>
        <Badge colorScheme="success" withDot>
          <TrendingUp className="size-3" />
          12%
        </Badge>
      </div>
    </Card>
  ),
};

export const Interactive: Story = {
  render: (args) => (
    <Card {...args} interactive role="button" tabIndex={0} className="w-64">
      Click or press Enter — try tabbing to it.
    </Card>
  ),
};

export const NoPadding: Story = {
  render: (args) => (
    <Card {...args} noPadding className="w-80">
      <div className="p-4">Row 1</div>
      <div className="border-t border-border p-4">Row 2</div>
    </Card>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark flex gap-4 rounded-lg bg-background p-6">
      <Card variant="elevated" className="w-56">
        Elevated
      </Card>
      <Card variant="outlined" className="w-56">
        Outlined
      </Card>
    </div>
  ),
};
