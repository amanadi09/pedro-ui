import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) =>
      listeners.delete(cb),
    dispatchEvent: vi.fn(),
  }));
  return {
    fire: (next: boolean) =>
      listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent)),
  };
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('reflects the initial match state', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when the media query change event fires', () => {
    const { fire } = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => fire(true));
    expect(result.current).toBe(true);
  });
});
