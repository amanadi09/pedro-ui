import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@pedro-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'status',
    type: "'success' | 'danger' | 'warning' | 'info'",
    default: "'info'",
    description: 'Determines color, icon, and ARIA role/live-region politeness.',
  },
  { name: 'title', type: 'ReactNode', description: 'Bold heading line.' },
  {
    name: 'onDismiss',
    type: '() => void',
    description: 'Renders a dismiss button when provided; omit for a non-dismissible alert.',
  },
  {
    name: 'icon',
    type: 'ReactNode | false',
    description: 'Override the default status icon, or pass false to omit it.',
  },
];

export function AlertPage() {
  const [status, setStatus] = useState<'success' | 'danger' | 'warning' | 'info'>('info');
  const [dismissed, setDismissed] = useState(false);

  return (
    <div>
      <PageHeader
        title="Alert"
        description="An inline, persistent status message. For transient notifications, use Toast instead — Alert stays in the page flow."
      />

      <Section title="Live preview">
        <ComponentPreview>
          {dismissed ? (
            <button
              onClick={() => setDismissed(false)}
              className="text-small text-primary-600 hover:underline dark:text-primary-400"
            >
              Reset
            </button>
          ) : (
            <div className="w-full max-w-sm">
              <Alert status={status} title="Heads up" onDismiss={() => setDismissed(true)}>
                This is an inline, persistent status message.
              </Alert>
            </div>
          )}
        </ComponentPreview>
        <div className="mt-4 flex gap-2">
          {(['success', 'danger', 'warning', 'info'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setDismissed(false);
              }}
              className={`rounded-md px-3 py-1.5 text-small capitalize transition-colors ${
                status === s
                  ? 'bg-primary-600 text-white dark:bg-primary-500 dark:text-neutral-950'
                  : 'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Alert status="${status}" title="Heads up" onDismiss={() => setShow(false)}>
  This is an inline, persistent status message.
</Alert>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            <code className="text-code">danger</code>/<code className="text-code">warning</code> use{' '}
            <code className="text-code">role="alert"</code> +{' '}
            <code className="text-code">aria-live="assertive"</code> — screen readers interrupt to
            announce them.
          </li>
          <li>
            <code className="text-code">success</code>/<code className="text-code">info</code> use{' '}
            <code className="text-code">role="status"</code> +{' '}
            <code className="text-code">aria-live="polite"</code> — announced without interrupting.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Reserve <code className="text-code">danger</code> for things that actually block
            progress — overusing it trains users to ignore it.
          </li>
          <li>Keep the title actionable ("Payment failed") rather than generic ("Error").</li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Using Alert for one-off success toasts that should auto-dismiss — that's Toast's job,
            not Alert's; Alert is meant to persist until the user (or app logic) explicitly
            dismisses it.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <div className="flex items-center gap-3">
          <Link
            to="/components/tooltip"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            Tooltip
          </Link>
          <Link
            to="/components/card"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            Card
          </Link>
        </div>
      </Section>
    </div>
  );
}
