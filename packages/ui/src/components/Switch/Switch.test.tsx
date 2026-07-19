import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with role="switch" and is associated with its label', () => {
    render(<Switch label="Email notifications" />);
    expect(screen.getByRole('switch', { name: 'Email notifications' })).toBeInTheDocument();
  });

  it('toggles on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Switch label="Email notifications" onChange={onChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('is toggleable via the keyboard (Space)', async () => {
    render(<Switch label="Email notifications" />);
    const toggle = screen.getByRole('switch');
    toggle.focus();
    await userEvent.keyboard(' ');
    expect(toggle).toBeChecked();
  });

  it('is disabled and cannot be toggled when disabled is passed', async () => {
    const onChange = vi.fn();
    render(<Switch label="Email notifications" disabled onChange={onChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders the label before the switch when labelPosition="start"', () => {
    render(<Switch label="Email notifications" labelPosition="start" />);
    const label = screen.getByText('Email notifications');
    const toggle = screen.getByRole('switch');
    expect(label.compareDocumentPosition(toggle)! & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('merges a custom className onto the root element', () => {
    render(<Switch label="Email notifications" className="mt-4" />);
    expect(screen.getByText('Email notifications').closest('label')).toHaveClass('mt-4');
  });
});
