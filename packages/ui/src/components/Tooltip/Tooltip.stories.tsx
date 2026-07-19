import type { Meta, StoryObj } from '@storybook/react';
import { Copy, Info } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hover/focus tooltip, CSS-positioned (no viewport collision detection — see the component JSDoc for when to reach for something heavier).',
      },
    },
  },
  args: { content: 'Copy to clipboard', placement: 'top', delayMs: 0 },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div className="p-16">
      <Tooltip {...args}>
        <IconButton aria-label="Copy" icon={<Copy />} variant="outline" colorScheme="neutral" />
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: (args) => (
    <div className="flex gap-12 p-16">
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip
          key={placement}
          {...args}
          placement={placement}
          content={`Placement: ${placement}`}
        >
          <Button variant="outline" colorScheme="neutral">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OnTextTrigger: Story = {
  name: 'Real-world: inline help icon',
  render: (args) => (
    <p className="flex items-center gap-1.5 text-small text-text-primary">
      Monthly recurring revenue
      <Tooltip
        {...args}
        content="Revenue normalized to a 30-day period, excluding one-time charges."
      >
        <button
          type="button"
          className="inline-flex cursor-help border-0 bg-transparent p-0 text-text-secondary"
        >
          <Info className="size-3.5" />
        </button>
      </Tooltip>
    </p>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="p-16">
      <Tooltip {...args}>
        <Button variant="outline" colorScheme="neutral">
          Hover — nothing happens
        </Button>
      </Tooltip>
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark rounded-lg bg-background p-16">
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};
