import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver';

let observedCallback: IntersectionObserverCallback;
const observeMock = vi.fn();
const disconnectMock = vi.fn();

beforeEach(() => {
  observeMock.mockClear();
  disconnectMock.mockClear();
  window.IntersectionObserver = vi
    .fn()
    .mockImplementation((callback: IntersectionObserverCallback) => {
      observedCallback = callback;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: vi.fn(),
        takeRecords: () => [],
      };
    }) as unknown as typeof IntersectionObserver;
});

function Harness() {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="target">
      {isIntersecting ? 'visible' : 'hidden'}
    </div>
  );
}

describe('useIntersectionObserver', () => {
  it("observes the ref'd element on mount and starts not-intersecting", () => {
    const { getByTestId } = render(<Harness />);
    expect(observeMock).toHaveBeenCalledOnce();
    expect(getByTestId('target').textContent).toBe('hidden');
  });

  it('flips to intersecting when the observer callback reports visibility', () => {
    const { getByTestId } = render(<Harness />);

    act(() => {
      observedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(getByTestId('target').textContent).toBe('visible');
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Harness />);
    unmount();
    expect(disconnectMock).toHaveBeenCalledOnce();
  });
});
