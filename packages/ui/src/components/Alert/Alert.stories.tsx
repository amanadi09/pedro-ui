import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    status: 'info',
    title: 'Heads up',
    children: 'This is an inline, persistent status message.',
  },
  argTypes: {
    status: { control: 'select', options: ['success', 'danger', 'warning', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex w-96 flex-col gap-3">
      <Alert {...args} status="success" title="Payment succeeded" />
      <Alert {...args} status="info" title="New version available" />
      <Alert {...args} status="warning" title="Storage almost full" />
      <Alert {...args} status="danger" title="Payment failed" />
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: { title: undefined, children: 'A simple one-line status message with no title.' },
};

export const Dismissible: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    if (!visible)
      return (
        <p className="text-small text-text-secondary">Dismissed — refresh the story to reset.</p>
      );
    return <Alert {...args} onDismiss={() => setVisible(false)} className="w-96" />;
  },
};

export const NoIcon: Story = {
  args: { icon: false },
};

export const LongContent: Story = {
  name: 'Edge case: long body content wraps cleanly',
  render: (args) => (
    <div className="w-80">
      <Alert {...args} title="Action required">
        This is a much longer alert description meant to test text wrapping behavior across multiple
        lines, to make sure the icon stays aligned to the top and the dismiss button stays aligned
        correctly regardless of how much text is present.
      </Alert>
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex w-96 flex-col gap-3 rounded-lg bg-background p-6">
      <Alert {...args} status="success" title="Payment succeeded" />
      <Alert {...args} status="danger" title="Payment failed" />
    </div>
  ),
};
