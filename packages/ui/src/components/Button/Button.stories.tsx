import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The primary action trigger. Supports 4 variants × 7 color schemes × 3 sizes, loading and disabled states, and optional leading/trailing icons.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'link'] },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const).map(
        (cs) => (
          <Button key={cs} {...args} colorScheme={cs}>
            {cs}
          </Button>
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} leftIcon={<Plus />}>
        New project
      </Button>
      <Button {...args} variant="outline" colorScheme="danger" leftIcon={<Trash2 />}>
        Delete
      </Button>
      <Button {...args} variant="link" rightIcon={<ArrowRight />}>
        Learn more
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { isLoading: true, loadingText: 'Saving changes' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-80">
      <Button {...args} fullWidth>
        Continue
      </Button>
    </div>
  ),
};

/** Dark mode is driven by the toolbar theme switcher (top of the Storybook UI), not a separate story — see .storybook/preview.tsx. This story exists so dark mode has a dedicated, linkable canvas. */
export const DarkMode: Story = {
  parameters: { theme: 'dark' },
  render: (args) => (
    <div className="dark rounded-lg bg-background p-6">
      <div className="flex flex-wrap gap-3">
        {(['primary', 'success', 'danger', 'neutral'] as const).map((cs) => (
          <Button key={cs} {...args} colorScheme={cs}>
            {cs}
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const KeyboardAccessible: Story = {
  name: 'Accessibility: keyboard activation',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
  },
};

export const EdgeCaseLongLabel: Story = {
  name: 'Edge case: very long label wraps the button, not the text',
  render: (args) => (
    <div className="w-48">
      <Button {...args} fullWidth>
        This is a surprisingly long button label to test wrapping behavior
      </Button>
    </div>
  ),
};

export const EdgeCaseIconOnlyViaChildren: Story = {
  name: 'Edge case: icon-only (prefer IconButton for real usage)',
  render: (args) => (
    <Button {...args} aria-label="Add item" className="w-10 px-0">
      <Plus />
    </Button>
  ),
};
