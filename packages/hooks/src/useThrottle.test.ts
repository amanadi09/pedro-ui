import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './useThrottle';

afterEach(() => vi.useRealTimers());

describe('useThrottle', () => {
  it('updates immediately on the first render', () => {
    const { result } = renderHook(() => useThrottle('a', 200));
    expect(result.current).toBe('a');
  });

  it('caps updates to once per interval, eventually reflecting the latest value', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 200), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('b');
  });
});
