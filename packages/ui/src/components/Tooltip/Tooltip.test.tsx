import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

afterEach(() => vi.useRealTimers());

describe('Tooltip', () => {
  it('does not render the tooltip content initially', () => {
    render(
      <Tooltip content="Copy to clipboard">
        <Button>Copy</Button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the tooltip after hovering past the delay', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard" delayMs={200}>
        <Button>Copy</Button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument(), { timeout: 1000 });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy to clipboard');
  });

  it('hides the tooltip on unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard" delayMs={0}>
        <Button>Copy</Button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    await user.unhover(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('shows on keyboard focus, not just mouse hover', async () => {
    render(
      <Tooltip content="Copy to clipboard" delayMs={0}>
        <Button>Copy</Button>
      </Tooltip>,
    );

    screen.getByRole('button').focus();
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
  });

  it('links the trigger to the tooltip via aria-describedby once visible', async () => {
    render(
      <Tooltip content="Copy to clipboard" delayMs={0}>
        <Button>Copy</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-describedby');

    button.focus();
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(button).toHaveAttribute('aria-describedby', tooltip.id);
    });
  });

  it('never shows when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard" delayMs={0} disabled>
        <Button>Copy</Button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button'));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
