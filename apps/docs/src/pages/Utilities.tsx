import { PageHeader } from '../components/PageHeader';
import { CodeBlock } from '../components/CodeBlock';

const utils = [
  {
    name: 'cn',
    signature: 'cn(...inputs: ClassValue[]): string',
    description: 'clsx + tailwind-merge — the className composer every component uses.',
  },
  {
    name: 'formatDate',
    signature: "formatDate(date, style?: 'short'|'medium'|'long'|'relative', locale?): string",
    description: 'Intl.DateTimeFormat / Intl.RelativeTimeFormat wrapper.',
  },
  {
    name: 'formatCurrency',
    signature: 'formatCurrency(value: number, currency?: string, locale?): string',
    description: 'Intl.NumberFormat currency wrapper.',
  },
  {
    name: 'formatNumber',
    signature: "formatNumber(value, style?: 'standard'|'compact'|'percent', locale?): string",
    description: 'Grouped, compact (1.2M), or percent number formatting.',
  },
  {
    name: 'debounce',
    signature: 'debounce(fn, wait): DebouncedFn (+ .cancel())',
    description: 'Callback debouncing for imperative/non-React code.',
  },
  {
    name: 'throttle',
    signature: 'throttle(fn, wait): ThrottledFn',
    description: 'Leading-edge + trailing-edge callback throttling.',
  },
  { name: 'sleep', signature: 'sleep(ms: number): Promise<void>', description: 'Awaitable delay.' },
  {
    name: 'generateId',
    signature: 'generateId(prefix?: string): string',
    description: 'Lightweight incrementing id, for aria-* wiring outside of useId().',
  },
  {
    name: 'copyToClipboard',
    signature: 'copyToClipboard(text: string): Promise<boolean>',
    description: 'Clipboard API with a legacy execCommand fallback.',
  },
  {
    name: 'downloadCSV',
    signature: 'downloadCSV(rows: object[], filename: string): void',
    description: 'RFC 4180 CSV export + browser download trigger.',
  },
];

export function UtilitiesPage() {
  return (
    <div>
      <PageHeader
        title="Utilities"
        description={
          <>
            <code className="text-code">@pedro-ui/utils</code> — small, dependency-light functions
            (only <code className="text-code">clsx</code> and{' '}
            <code className="text-code">tailwind-merge</code> as real dependencies).
          </>
        }
      />

      <CodeBlock language="bash" code="npm install @pedro-ui/utils" />

      <div className="mt-8 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {utils.map((util) => (
          <div key={util.name} className="p-4">
            <code className="text-code font-medium text-primary-700 dark:text-primary-400">
              {util.name}
            </code>
            <p className="mt-1 overflow-x-auto whitespace-pre font-mono text-caption text-text-secondary">
              {util.signature}
            </p>
            <p className="mt-1.5 text-small text-text-secondary">{util.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
