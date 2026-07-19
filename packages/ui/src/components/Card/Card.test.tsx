import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies padding by default and removes it when noPadding is set', () => {
    const { rerender } = render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('p-6');

    rerender(
      <Card data-testid="card" noPadding>
        Content
      </Card>,
    );
    expect(screen.getByTestId('card')).not.toHaveClass('p-6');
  });

  it.each(['elevated', 'outlined', 'flat'] as const)(
    'renders the %s variant without throwing',
    (variant) => {
      render(<Card variant={variant}>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    },
  );

  it('composes Header, Body, and Footer', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('supports being an interactive, keyboard-focusable card when given a role and tabIndex', async () => {
    const onClick = vi.fn();
    render(
      <Card interactive role="button" tabIndex={0} onClick={onClick}>
        Clickable
      </Card>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
