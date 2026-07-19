import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useKeyboardShortcut } from './useKeyboardShortcut';

function TestComponent({
  onTrigger,
  enabled = true,
}: {
  onTrigger: () => void;
  enabled?: boolean;
}) {
  useKeyboardShortcut('mod+k', onTrigger, { enabled });
  return <input aria-label="field" />;
}

describe('useKeyboardShortcut', () => {
  it('fires the handler on the matching combo', async () => {
    const handler = vi.fn();
    render(<TestComponent onTrigger={handler} />);
    await userEvent.keyboard('{Meta>}k{/Meta}');
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', async () => {
    const handler = vi.fn();
    render(<TestComponent onTrigger={handler} enabled={false} />);
    await userEvent.keyboard('{Meta>}k{/Meta}');
    expect(handler).not.toHaveBeenCalled();
  });

  it('does not fire on the bare key without the modifier', async () => {
    const handler = vi.fn();
    render(<TestComponent onTrigger={handler} />);
    await userEvent.keyboard('k');
    expect(handler).not.toHaveBeenCalled();
  });
});
