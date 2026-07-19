import { useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export type UseInfiniteScrollOptions = {
  /** Called when the sentinel scrolls into view and more items should load. */
  onLoadMore: () => void;
  /** Whether there is more data to load. When `false`, the observer stops firing. */
  hasMore: boolean;
  /** While `true`, suppresses new `onLoadMore` calls (e.g. a request is already in flight). */
  loading?: boolean;
  /** How far before the sentinel is visible to trigger loading. Default `'200px'`. */
  rootMargin?: string;
};

/**
 * Infinite-scroll pagination via an invisible "sentinel" element: render it
 * at the end of your list, attach the returned `ref`, and `onLoadMore`
 * fires once it scrolls near the viewport. Built on `useIntersectionObserver`
 * rather than a scroll listener, so there's no manual throttling or
 * scrollTop math to get wrong.
 *
 * @example
 * const { sentinelRef } = useInfiniteScroll({ onLoadMore: fetchNextPage, hasMore, loading: isFetching });
 * return <ul>{items.map(renderItem)}<li ref={sentinelRef} aria-hidden /></ul>;
 */
export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  loading = false,
  rootMargin = '200px',
}: UseInfiniteScrollOptions): { sentinelRef: ReturnType<typeof useIntersectionObserver>[0] } {
  const [sentinelRef, isIntersecting] = useIntersectionObserver<HTMLLIElement>({ rootMargin });

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
    // onLoadMore is intentionally excluded: callers rarely memoize it, and
    // re-running this effect only needs to react to visibility/state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, hasMore, loading]);

  return { sentinelRef };
}
