import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Accept terms and conditions', colorScheme: 'primary', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true, label: 'Select all (3 of 7 selected)' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Checkbox {...args} size="sm" label="Small" />
      <Checkbox {...args} size="md" label="Medium" />
      <Checkbox {...args} size="lg" label="Large" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const).map(
        (cs) => (
          <Checkbox key={cs} {...args} colorScheme={cs} defaultChecked label={cs} />
        ),
      )}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Checkbox {...args} disabled label="Disabled, unchecked" />
      <Checkbox {...args} disabled defaultChecked label="Disabled, checked" />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label={checked ? 'Checked' : 'Unchecked'}
      />
    );
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex flex-col gap-3 rounded-lg bg-background p-6">
      <Checkbox {...args} defaultChecked />
      <Checkbox {...args} />
    </div>
  ),
};
