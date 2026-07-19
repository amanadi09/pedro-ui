import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { useOutsideClick } from './useOutsideClick';

function TestComponent({
  onOutsideClick,
  active = true,
}: {
  onOutsideClick: () => void;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onOutsideClick, active);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useOutsideClick', () => {
  it('fires the handler when clicking outside the ref element', async () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} />);
    await userEvent.click(screen.getByTestId('outside'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not fire when clicking inside the ref element', async () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} />);
    await userEvent.click(screen.getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('does not fire when active is false', async () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} active={false} />);
    await userEvent.click(screen.getByTestId('outside'));
    expect(handler).not.toHaveBeenCalled();
  });
});
