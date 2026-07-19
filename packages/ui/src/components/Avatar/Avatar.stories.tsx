import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?img=47',
  },
};

export const BrokenImageFallsBackToInitials: Story = {
  name: 'Edge case: broken image URL falls back to initials',
  args: { src: 'https://this-domain-does-not-exist.example/broken.jpg', name: 'Grace Hopper' },
};

export const NoNameFallback: Story = {
  name: 'Edge case: no name or image',
  args: { name: undefined },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Avatar {...args} status="online" />
      <Avatar {...args} status="away" />
      <Avatar {...args} status="busy" />
      <Avatar {...args} status="offline" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <div className="flex gap-3">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const).map(
        (cs) => (
          <Avatar key={cs} {...args} colorScheme={cs} />
        ),
      )}
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex gap-3 rounded-lg bg-background p-6">
      <Avatar {...args} colorScheme="primary" />
      <Avatar {...args} status="online" />
    </div>
  ),
};
