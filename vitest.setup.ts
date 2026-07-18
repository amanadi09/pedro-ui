import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// React Testing Library doesn't auto-cleanup outside of Jest's global
// afterEach convention, so we wire it up explicitly for Vitest.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement matchMedia — needed by useMediaQuery, useDarkMode,
// and any component/story that checks prefers-color-scheme or
// prefers-reduced-motion.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated, kept for older browser compatibility paths
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// jsdom doesn't implement ResizeObserver or IntersectionObserver — needed
// by useIntersectionObserver, useWindowSize-adjacent components, and any
// Popover/Tooltip that measures its trigger.
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

// @ts-expect-error - partial mock intentionally omits the full DOM interface
window.ResizeObserver = window.ResizeObserver ?? MockResizeObserver;
// @ts-expect-error - partial mock intentionally omits the full DOM interface
window.IntersectionObserver = window.IntersectionObserver ?? MockIntersectionObserver;
