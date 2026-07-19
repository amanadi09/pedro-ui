import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('computes totalPages and the initial pageRange', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 45, itemsPerPage: 10 }));
    expect(result.current.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageRange).toEqual([0, 10]);
    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(true);
  });

  it('nextPage/prevPage move within bounds', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 25, itemsPerPage: 10 }));

    act(() => result.current.nextPage());
    expect(result.current.currentPage).toBe(2);
    expect(result.current.pageRange).toEqual([10, 20]);

    act(() => result.current.nextPage());
    act(() => result.current.nextPage()); // should clamp at totalPages (3)
    expect(result.current.currentPage).toBe(3);
    expect(result.current.canGoNext).toBe(false);

    act(() => result.current.prevPage());
    expect(result.current.currentPage).toBe(2);
  });

  it('goToPage clamps out-of-range targets', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 20, itemsPerPage: 10 }));
    act(() => result.current.goToPage(99));
    expect(result.current.currentPage).toBe(2);
    act(() => result.current.goToPage(-5));
    expect(result.current.currentPage).toBe(1);
  });

  it('always has at least 1 total page, even with zero items', () => {
    const { result } = renderHook(() => usePagination({ totalItems: 0, itemsPerPage: 10 }));
    expect(result.current.totalPages).toBe(1);
  });
});
