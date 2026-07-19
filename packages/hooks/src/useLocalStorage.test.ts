import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => window.localStorage.clear());

  it('initializes from localStorage when a value already exists', () => {
    window.localStorage.setItem('count', JSON.stringify(42));
    const { result } = renderHook(() => useLocalStorage('count', 0));
    expect(result.current[0]).toBe(42);
  });

  it('falls back to the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('missing-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('persists writes to localStorage and supports a functional updater', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
    expect(window.localStorage.getItem('count')).toBe('5');

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(6);
  });

  it('removeValue clears the key and resets to the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => result.current[1](99));
    act(() => result.current[2]());
    expect(result.current[0]).toBe(0);
    expect(window.localStorage.getItem('count')).toBeNull();
  });
});
