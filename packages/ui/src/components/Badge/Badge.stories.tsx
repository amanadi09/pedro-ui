import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge', variant: 'subtle', colorScheme: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'subtle', 'outline'] },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Badge {...args} variant="solid" />
      <Badge {...args} variant="subtle" />
      <Badge {...args} variant="outline" />
    </div>
  ),
};

export const AllColorSchemes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const).map(
        (cs) => (
          <Badge key={cs} {...args} colorScheme={cs}>
            {cs}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const StatusPills: Story = {
  name: 'Real-world: status pills',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge colorScheme="success" withDot>
        Operational
      </Badge>
      <Badge colorScheme="warning" withDot>
        Degraded
      </Badge>
      <Badge colorScheme="danger" withDot>
        Outage
      </Badge>
      <Badge colorScheme="neutral" withDot>
        Maintenance
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Badge {...args} size="sm" />
      <Badge {...args} size="md" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex flex-wrap gap-2 rounded-lg bg-background p-6">
      {(['primary', 'success', 'danger', 'neutral'] as const).map((cs) => (
        <Badge key={cs} {...args} colorScheme={cs} withDot>
          {cs}
        </Badge>
      ))}
    </div>
  ),
};
