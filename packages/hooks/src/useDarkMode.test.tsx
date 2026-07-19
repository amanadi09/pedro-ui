import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('defaults to "system" mode', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.mode).toBe('system');
  });

  it('setMode("dark") resolves to dark and applies the .dark class to <html>', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.setMode('dark'));
    expect(result.current.resolvedMode).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('setMode("light") removes the .dark class', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.setMode('dark'));
    act(() => result.current.setMode('light'));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggle() flips between light and dark', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.setMode('light'));
    act(() => result.current.toggle());
    expect(result.current.resolvedMode).toBe('dark');
    act(() => result.current.toggle());
    expect(result.current.resolvedMode).toBe('light');
  });

  it('persists the preference under a custom storage key', () => {
    const { result } = renderHook(() => useDarkMode('custom-key'));
    act(() => result.current.setMode('dark'));
    expect(window.localStorage.getItem('custom-key')).toBe('"dark"');
  });
});
