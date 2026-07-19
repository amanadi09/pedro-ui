import { CheckCircle2 } from 'lucide-react';
import { Alert } from '@nova-ui/react';
import { PageHeader, Section } from '../components/PageHeader';

const commitments = [
  {
    title: 'Keyboard navigation',
    body: 'Every interactive component is reachable and operable via Tab/Shift+Tab, Enter, Space, and Escape where applicable, using native elements (button, input, label) instead of div+onClick wherever the semantics allow it.',
  },
  {
    title: 'Focus indicators',
    body: 'A visible focus ring is applied globally via :focus-visible (see index.css), so keyboard users always see where focus is, while mouse users don\u2019t see a ring on click.',
  },
  {
    title: 'Screen reader support',
    body: 'Components that convey state visually (Switch, Checkbox, Alert, Button loading state) also convey it through ARIA attributes (aria-checked via role, aria-busy, role="alert"/"status") rather than relying on color or icon alone.',
  },
  {
    title: 'Reduced motion',
    body: 'A global prefers-reduced-motion media query (in packages/theme/src/css/variables.css) collapses all animation/transition durations to near-zero for users who\u2019ve requested it at the OS level.',
  },
  {
    title: 'Color contrast',
    body: 'Text/background pairings target WCAG 2 AA at minimum. The Storybook a11y addon runs an automated contrast check on every story as a first pass; automated checks don\u2019t replace manual and assistive-technology testing, which is called out as a gap in ROADMAP.md.',
  },
  {
    title: 'Semantic HTML',
    body: 'Checkbox and Switch render a real <input type="checkbox"> (visually hidden, not display:none) rather than a styled <div> with manual ARIA — you get correct semantics for free instead of having to reimplement them.',
  },
];

export function Accessibility() {
  return (
    <div>
      <PageHeader
        title="Accessibility"
        description="What Nova UI does today, stated plainly rather than as a blanket compliance claim."
      />

      <Alert status="info" title="Where this stands" className="mb-8">
        These are engineering commitments and automated-testing coverage (Storybook a11y addon,
        jsx-a11y ESLint rules), not a completed WCAG audit or assistive-technology test pass. Treat
        this page as "what to expect," not a compliance certificate.
      </Alert>

      <Section title="Commitments">
        <div className="flex flex-col gap-4">
          {commitments.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-lg border border-border bg-surface p-4"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success-600 dark:text-success-400" />
              <div>
                <h3 className="text-title text-text-primary">{item.title}</h3>
                <p className="mt-1 text-small text-text-secondary">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Per-component notes">
        <p className="text-small text-text-secondary">
          Each component's documentation page includes an "Accessibility notes" section covering
          specifics — e.g. Button's <code className="text-code">aria-busy</code> + live-region
          announcement while loading, or Tooltip showing on focus as well as hover. See{' '}
          <code className="text-code">/components/button</code> for an example of the level of
          detail to expect.
        </p>
      </Section>
    </div>
  );
}
