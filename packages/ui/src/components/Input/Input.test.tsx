import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input via htmlFor/id', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
  });

  it('forwards the ref to the underlying <input>', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Email" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('accepts typed input and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Input label="Email" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com');
  });

  it('shows helper text and wires it via aria-describedby', () => {
    render(<Input label="API key" helperText="Starts with sk_live_" />);
    const input = screen.getByLabelText('API key');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent('Starts with sk_live_');
  });

  it('shows error text, sets aria-invalid, and prefers the error over helper text', () => {
    render(
      <Input
        label="API key"
        helperText="Starts with sk_live_"
        errorText="This key has been revoked."
      />,
    );
    const input = screen.getByLabelText('API key');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('This key has been revoked.')).toBeInTheDocument();
    expect(screen.queryByText('Starts with sk_live_')).not.toBeInTheDocument();
  });

  it('marks isInvalid without requiring errorText', () => {
    render(<Input label="API key" isInvalid />);
    expect(screen.getByLabelText('API key')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders a required indicator and sets the native required attribute', () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
  });

  it('is disabled when disabled is passed', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders left and right adornments', () => {
    render(
      <Input
        label="Amount"
        leftElement={<span data-testid="left" />}
        rightElement={<span data-testid="right" />}
      />,
    );
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });
});
