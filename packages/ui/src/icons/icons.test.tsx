import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Plus } from 'lucide-react';
import { withPedroIconDefaults } from './index';

describe('withPedroIconDefaults', () => {
  it('applies default size and strokeWidth', () => {
    const PedroPlus = withPedroIconDefaults(Plus);
    const { container } = render(<PedroPlus />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('allows overriding the defaults per-usage', () => {
    const PedroPlus = withPedroIconDefaults(Plus);
    const { container } = render(<PedroPlus size={32} strokeWidth={1} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('stroke-width', '1');
  });
});
