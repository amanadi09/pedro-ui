import { useMemo, useState } from 'react';

export type UsePaginationOptions = {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
};

export type UsePaginationResult = {
  currentPage: number;
  totalPages: number;
  /** Zero-based [start, end) slice indices for the current page, e.g. `array.slice(...pageRange)`. */
  pageRange: [number, number];
  canGoNext: boolean;
  canGoPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

/**
 * Page-number bookkeeping for a Table, Data Grid, or List — clamps to
 * valid bounds automatically (including when `totalItems` shrinks, e.g.
 * after a delete, and the current page would otherwise be out of range).
 *
 * @example
 * const { currentPage, totalPages, pageRange, nextPage, prevPage, canGoNext, canGoPrev } =
 *   usePagination({ totalItems: rows.length, itemsPerPage: 20 });
 * const visibleRows = rows.slice(...pageRange);
 */
export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationResult {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [page, setPage] = useState(() => clamp(initialPage, 1, totalPages));
  const currentPage = clamp(page, 1, totalPages);

  const pageRange = useMemo<[number, number]>(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return [start, start + itemsPerPage];
  }, [currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    pageRange,
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
    goToPage: (target: number) => setPage(clamp(target, 1, totalPages)),
    nextPage: () => setPage((p) => clamp(p + 1, 1, totalPages)),
    prevPage: () => setPage((p) => clamp(p - 1, 1, totalPages)),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
