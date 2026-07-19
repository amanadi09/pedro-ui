import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins static class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    const isHidden = false;
    const label: string | undefined = undefined;
    const count = 0;
    expect(cn('a', isHidden && 'b', label, null, count && 'c', 'd')).toBe('a d');
  });

  it('resolves conflicting tailwind utilities, last one wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    const isLarge = false;
    expect(cn('text-sm', isLarge && 'text-lg', 'text-lg')).toBe('text-lg');
  });

  it('supports conditional object syntax', () => {
    expect(cn({ 'text-red-600': true, 'text-blue-600': false })).toBe('text-red-600');
  });
});
