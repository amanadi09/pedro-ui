import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and children', () => {
    render(<Alert title="Payment failed">Your card was declined.</Alert>);
    expect(screen.getByText('Payment failed')).toBeInTheDocument();
    expect(screen.getByText('Your card was declined.')).toBeInTheDocument();
  });

  it('uses role="alert" and aria-live="assertive" for danger and warning', () => {
    const { rerender } = render(<Alert status="danger">Careful</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');

    rerender(<Alert status="warning">Careful</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('uses role="status" and aria-live="polite" for success and info', () => {
    const { rerender } = render(<Alert status="success">Done</Alert>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');

    rerender(<Alert status="info">FYI</Alert>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('does not render a dismiss button when onDismiss is not provided', () => {
    render(<Alert status="info">FYI</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders and wires up a dismiss button when onDismiss is provided', async () => {
    const onDismiss = vi.fn();
    render(
      <Alert status="info" onDismiss={onDismiss}>
        FYI
      </Alert>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('omits the icon entirely when icon={false}', () => {
    const { container } = render(
      <Alert status="info" icon={false}>
        FYI
      </Alert>,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    render(
      <Alert status="info" icon={<span data-testid="custom-icon" />}>
        FYI
      </Alert>,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
