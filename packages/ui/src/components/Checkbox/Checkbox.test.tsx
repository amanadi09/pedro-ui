import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a native checkbox associated with its label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('toggles checked state on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('is toggleable via the keyboard (Space)', async () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });

  it('respects a controlled checked prop', () => {
    const { rerender } = render(<Checkbox label="Accept terms" checked readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    rerender(<Checkbox label="Accept terms" checked={false} readOnly />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('is disabled when disabled is passed and cannot be toggled', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards the ref to the underlying <input>', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Accept terms" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('renders without a visible label when none is provided (still needs aria-label)', () => {
    render(<Checkbox aria-label="Select row" />);
    expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
  });

  it('merges a custom className onto the root element', () => {
    render(<Checkbox label="Accept terms" className="mt-4" />);
    expect(screen.getByText('Accept terms').closest('label')).toHaveClass('mt-4');
  });
});
