import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Email notifications', colorScheme: 'primary', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Switch {...args} size="sm" label="Small" defaultChecked />
      <Switch {...args} size="md" label="Medium" defaultChecked />
      <Switch {...args} size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const).map(
        (cs) => (
          <Switch key={cs} {...args} colorScheme={cs} defaultChecked label={cs} />
        ),
      )}
    </div>
  ),
};

export const LabelStart: Story = {
  args: { labelPosition: 'start' },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Switch {...args} disabled label="Disabled, off" />
      <Switch {...args} disabled defaultChecked label="Disabled, on" />
    </div>
  ),
};

export const SettingsListExample: Story = {
  name: 'Real-world: settings list',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({ email: true, push: false, sms: false });
    return (
      <div className="flex w-72 flex-col gap-4">
        {(Object.keys(settings) as (keyof typeof settings)[]).map((key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-small capitalize text-text-primary">{key} notifications</span>
            <Switch
              aria-label={`${key} notifications`}
              checked={settings[key]}
              onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.checked }))}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark flex flex-col gap-3 rounded-lg bg-background p-6">
      <Switch {...args} defaultChecked />
      <Switch {...args} />
    </div>
  ),
};
