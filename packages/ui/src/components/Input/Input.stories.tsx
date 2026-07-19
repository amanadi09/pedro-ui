import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search, DollarSign, Eye } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email address', placeholder: 'you@company.com' },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { helperText: "We'll never share your email." },
};

export const WithAdornments: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Input label="Search" placeholder="Search..." leftElement={<Search />} />
      <Input label="Amount" placeholder="0.00" leftElement={<DollarSign />} />
      <Input label="Password" type="password" rightElement={<Eye />} />
      <Input label="Email" leftElement={<Mail />} placeholder="you@company.com" />
    </div>
  ),
};

export const Invalid: Story = {
  args: { errorText: 'Please enter a valid email address.', defaultValue: 'not-an-email' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'ada@example.com' },
};

export const EdgeCaseNoLabel: Story = {
  name: 'Edge case: no label (still needs an aria-label)',
  args: { label: undefined, 'aria-label': 'Email address', placeholder: 'you@company.com' },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark w-72 rounded-lg bg-background p-6">
      <Input {...args} />
    </div>
  ),
};
