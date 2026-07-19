import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children as text content', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders as a <span>, not an interactive element', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active').tagName).toBe('SPAN');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a status dot when withDot is set', () => {
    const { container } = render(
      <Badge withDot colorScheme="success">
        Online
      </Badge>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('does not render a dot by default', () => {
    const { container } = render(<Badge>Online</Badge>);
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it.each(['solid', 'subtle', 'outline'] as const)(
    'renders the %s variant without throwing',
    (variant) => {
      render(<Badge variant={variant}>Status</Badge>);
      expect(screen.getByText('Status')).toBeInTheDocument();
    },
  );
});
