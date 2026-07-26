import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'label',
    type: 'string',
    description: 'Visible label, wrapped together with the box in one <label>.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Box dimensions and label text size together.',
  },
  {
    name: 'colorScheme',
    type: 'NovaColorScheme',
    default: "'primary'",
    description: 'Fill color once checked.',
  },
  {
    name: 'isIndeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Renders a dash instead of a check. Visual only — see note below.',
  },
  {
    name: 'checked / defaultChecked / onChange',
    type: 'native',
    description:
      'Standard native checkbox props — this is deliberately not isChecked/onCheckedChange, so React Hook Form\u2019s register() works with zero adapter code.',
  },
];

export function CheckboxPage() {
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="A checkbox with full custom styling that never sacrifices native semantics: the real <input type=checkbox> stays in the DOM (visually hidden, not display:none), driven by Tailwind's peer-* variants."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <div className="flex flex-col gap-3">
            <Checkbox label="Accept terms and conditions" defaultChecked />
            <Checkbox
              label="Select all (3 of 7 selected)"
              isIndeterminate={indeterminate}
              onChange={() => setIndeterminate(false)}
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Checkbox label="Accept terms and conditions" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Because the real <code className="text-code">&lt;input&gt;</code> is present (just
            visually hidden via <code className="text-code">sr-only</code>), keyboard
            Space-to-toggle, screen reader "checkbox, checked/unchecked" announcements, and
            label-click-to-toggle all work without any manual ARIA.
          </li>
          <li>
            <code className="text-code">isIndeterminate</code> is visual-only — it doesn't set the
            DOM <code className="text-code">indeterminate</code> property (which isn't a static HTML
            attribute and needs an imperative ref). If you need screen readers to announce the
            indeterminate state specifically, set{' '}
            <code className="text-code">ref.current.indeterminate = true</code> yourself alongside
            it.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Use native <code className="text-code">checked</code>/
            <code className="text-code">onChange</code>, not a custom boolean-prop API — it's what
            keeps this compatible with React Hook Form and plain{' '}
            <code className="text-code">&lt;form&gt;</code> submission.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Expecting <code className="text-code">isIndeterminate</code> alone to update
            assistive-technology state — see the accessibility note above.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <Link
          to="/components/switch"
          className="text-small text-primary-600 hover:underline dark:text-primary-400"
        >
          Switch
        </Link>
      </Section>
    </div>
  );
}
