import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('exposes aria-label as its accessible name', () => {
    render(<IconButton aria-label="Add item" icon={<Plus />} />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Add item" icon={<Plus />} onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled and shows aria-busy while isLoading', () => {
    render(<IconButton aria-label="Add item" icon={<Plus />} isLoading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('applies rounded-full when isRound is set', () => {
    render(<IconButton aria-label="Add item" icon={<Plus />} isRound />);
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
  });

  it.each(['sm', 'md', 'lg'] as const)(
    'renders the %s size as a square (equal width/height class)',
    (size) => {
      render(<IconButton aria-label="Add item" icon={<Plus />} size={size} />);
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/size-(8|10|12)/);
    },
  );
});
