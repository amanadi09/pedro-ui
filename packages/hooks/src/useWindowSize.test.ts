import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

afterEach(() => vi.useRealTimers());

describe('useWindowSize', () => {
  it('returns the current window dimensions on mount', () => {
    vi.useFakeTimers();
    window.innerWidth = 1280;
    window.innerHeight = 800;
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 1280, height: 800 });
  });

  it('updates (throttled) on resize', () => {
    vi.useFakeTimers();
    window.innerWidth = 1024;
    window.innerHeight = 768;
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 1024, height: 768 });

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toEqual({ width: 500, height: 900 });
  });
});
