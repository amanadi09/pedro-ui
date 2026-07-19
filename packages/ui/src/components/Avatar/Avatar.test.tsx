import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an <img> with the correct src and alt when src is provided', () => {
    render(<Avatar src="https://example.com/ada.jpg" name="Ada Lovelace" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/ada.jpg');
    expect(img).toHaveAttribute('alt', 'Ada Lovelace');
  });

  it('renders initials derived from a two-word name when there is no src', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders the first two letters of a single-word name', () => {
    render(<Avatar name="Cher" />);
    expect(screen.getByText('CH')).toBeInTheDocument();
  });

  it('falls back to initials when the image fails to load', () => {
    render(<Avatar src="https://example.com/broken.jpg" name="Ada Lovelace" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('exposes the name as an aria-label when showing the initials fallback', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByLabelText('Ada Lovelace')).toBeInTheDocument();
  });

  it('renders a status indicator when status is set', () => {
    const { container } = render(<Avatar name="Ada Lovelace" status="online" />);
    expect(container.querySelector('.bg-success-500')).toBeInTheDocument();
  });

  it('renders "?" when there is neither src nor name', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
