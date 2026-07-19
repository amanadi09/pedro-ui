import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Trash2, Settings, Bell } from 'lucide-react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Inputs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A square (or round) icon-only button. `aria-label` is required at the type level since it is the only accessible name available.',
      },
    },
  },
  args: {
    'aria-label': 'Add item',
    icon: <Plus />,
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <IconButton {...args} variant="solid" />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};

export const Round: Story = {
  args: { isRound: true, icon: <Bell />, 'aria-label': 'Notifications' },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CommonUseCases: Story = {
  name: 'Common toolbar use cases',
  render: () => (
    <div className="flex gap-3">
      <IconButton aria-label="Delete" icon={<Trash2 />} variant="ghost" colorScheme="danger" />
      <IconButton aria-label="Settings" icon={<Settings />} variant="ghost" colorScheme="neutral" />
      <IconButton
        aria-label="Notifications"
        icon={<Bell />}
        variant="ghost"
        colorScheme="neutral"
        isRound
      />
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex gap-3 rounded-lg bg-background p-6">
      <IconButton {...args} />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </div>
  ),
};
