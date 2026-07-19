import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from './useClipboard';

afterEach(() => vi.useRealTimers());

describe('useClipboard', () => {
  it('sets copied=true after a successful copy, then resets after the timeout', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    vi.useFakeTimers();

    const { result } = renderHook(() => useClipboard(1000));
    expect(result.current.copied).toBe(false);

    await act(async () => {
      await result.current.copy('hello');
    });
    expect(result.current.copied).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copied).toBe(false);
  });
});
