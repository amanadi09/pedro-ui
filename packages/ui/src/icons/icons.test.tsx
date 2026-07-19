import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Plus } from 'lucide-react';
import { withNovaIconDefaults } from './index';

describe('withNovaIconDefaults', () => {
  it('applies default size and strokeWidth', () => {
    const NovaPlus = withNovaIconDefaults(Plus);
    const { container } = render(<NovaPlus />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('allows overriding the defaults per-usage', () => {
    const NovaPlus = withNovaIconDefaults(Plus);
    const { container } = render(<NovaPlus size={32} strokeWidth={1} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('stroke-width', '1');
  });
});
