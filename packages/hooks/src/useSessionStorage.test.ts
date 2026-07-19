import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from './useSessionStorage';

describe('useSessionStorage', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('reads and writes sessionStorage independently from localStorage', () => {
    const { result } = renderHook(() => useSessionStorage('draft', { step: 1 }));
    act(() => result.current[1]({ step: 2 }));

    expect(result.current[0]).toEqual({ step: 2 });
    expect(window.sessionStorage.getItem('draft')).toBe('{"step":2}');
    expect(window.localStorage.getItem('draft')).toBeNull();
  });
});
