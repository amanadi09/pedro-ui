import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

let observedCallback: IntersectionObserverCallback;

beforeEach(() => {
  window.IntersectionObserver = vi
    .fn()
    .mockImplementation((callback: IntersectionObserverCallback) => {
      observedCallback = callback;
      return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn(), takeRecords: () => [] };
    }) as unknown as typeof IntersectionObserver;
});

function Harness(props: { onLoadMore: () => void; hasMore: boolean; loading?: boolean }) {
  const { sentinelRef } = useInfiniteScroll(props);
  return <li ref={sentinelRef} data-testid="sentinel" />;
}

function intersect() {
  act(() => {
    observedCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe('useInfiniteScroll', () => {
  it('calls onLoadMore when the sentinel becomes visible and hasMore is true', () => {
    const onLoadMore = vi.fn();
    render(<Harness onLoadMore={onLoadMore} hasMore={true} />);
    intersect();
    expect(onLoadMore).toHaveBeenCalledOnce();
  });

  it('does not call onLoadMore when hasMore is false', () => {
    const onLoadMore = vi.fn();
    render(<Harness onLoadMore={onLoadMore} hasMore={false} />);
    intersect();
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('does not call onLoadMore while a load is already in flight', () => {
    const onLoadMore = vi.fn();
    render(<Harness onLoadMore={onLoadMore} hasMore={true} loading={true} />);
    intersect();
    expect(onLoadMore).not.toHaveBeenCalled();
  });
});
