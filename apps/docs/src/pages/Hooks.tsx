import { PageHeader } from '../components/PageHeader';
import { CodeBlock } from '../components/CodeBlock';

const hooks = [
  {
    name: 'useDebounce',
    signature: 'useDebounce<T>(value: T, delayMs?: number): T',
    description: 'Debounces a value for use in state/effects (e.g. typeahead search).',
  },
  {
    name: 'useThrottle',
    signature: 'useThrottle<T>(value: T, limitMs?: number): T',
    description: 'Caps how often a fast-changing value propagates.',
  },
  {
    name: 'useClipboard',
    signature: 'useClipboard(resetAfterMs?: number): { copied, copy }',
    description: 'Copy-to-clipboard with auto-resetting "copied" state.',
  },
  {
    name: 'useDarkMode',
    signature: 'useDarkMode(storageKey?: string): { mode, resolvedMode, setMode, toggle }',
    description: 'Light/dark/system mode, persisted and synced to the DOM. Powers ThemeProvider.',
  },
  {
    name: 'useMediaQuery',
    signature: 'useMediaQuery(query: string): boolean',
    description: 'Live-updating CSS media query match.',
  },
  {
    name: 'usePagination',
    signature: 'usePagination({ totalItems, itemsPerPage?, initialPage? }): {...}',
    description: 'Page-number bookkeeping with automatic bounds clamping.',
  },
  {
    name: 'useInfiniteScroll',
    signature: 'useInfiniteScroll({ onLoadMore, hasMore, loading? }): { sentinelRef }',
    description: 'Fires a callback when a sentinel element scrolls into view.',
  },
  {
    name: 'useLocalStorage',
    signature: 'useLocalStorage<T>(key, initialValue): [T, setValue, removeValue]',
    description: 'useState synced to localStorage, cross-tab.',
  },
  {
    name: 'useSessionStorage',
    signature: 'useSessionStorage<T>(key, initialValue): [T, setValue, removeValue]',
    description: 'Same contract as useLocalStorage, backed by sessionStorage.',
  },
  {
    name: 'useOutsideClick',
    signature: 'useOutsideClick(ref, handler, active?): void',
    description: 'Calls handler on a pointer event outside the ref\u2019d element.',
  },
  {
    name: 'useIntersectionObserver',
    signature: 'useIntersectionObserver(options?): [ref, isIntersecting, entry]',
    description: 'Observes viewport visibility of an element.',
  },
  {
    name: 'useKeyboardShortcut',
    signature: 'useKeyboardShortcut(combo, handler, options?): void',
    description: 'Cross-platform keyboard shortcuts, e.g. "mod+k".',
  },
  {
    name: 'usePrevious',
    signature: 'usePrevious<T>(value: T): T | undefined',
    description: 'Returns the value from the previous render.',
  },
  {
    name: 'useWindowSize',
    signature: 'useWindowSize(): { width, height }',
    description: 'Throttled window dimensions.',
  },
];

export function HooksPage() {
  return (
    <div>
      <PageHeader
        title="Hooks"
        description={
          <>
            <code className="text-code">@nova-ui/hooks</code> — all 14 hooks, framework-agnostic
            React (18/19), independently installable.
          </>
        }
      />

      <CodeBlock language="bash" code="npm install @nova-ui/hooks" />

      <div className="mt-8 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {hooks.map((hook) => (
          <div key={hook.name} className="p-4">
            <code className="text-code font-medium text-primary-700 dark:text-primary-400">
              {hook.name}
            </code>
            <p className="mt-1 overflow-x-auto whitespace-pre font-mono text-caption text-text-secondary">
              {hook.signature}
            </p>
            <p className="mt-1.5 text-small text-text-secondary">{hook.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
