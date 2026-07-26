import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'label',
    type: 'string',
    description:
      'Rendered inside the same <label> as the track, so clicking it toggles the switch.',
  },
  {
    name: 'labelPosition',
    type: "'start' | 'end'",
    default: "'end'",
    description: 'Places the label before or after the track.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Track and thumb dimensions together.',
  },
  {
    name: 'colorScheme',
    type: 'NovaColorScheme',
    default: "'primary'",
    description: 'Track color when checked.',
  },
  {
    name: 'checked / onChange',
    type: 'native',
    description: 'Same native-prop philosophy as Checkbox.',
  },
];

export function SwitchPage() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      <PageHeader
        title="Switch"
        description="An on/off toggle for settings and preferences. Semantically still a checkbox (role='switch' on a real <input type=checkbox>) styled to look like a switch — use this for immediate-effect settings, use Checkbox for form fields submitted together."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <Switch
            label="Email notifications"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Switch label="Email notifications" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            <code className="text-code">role="switch"</code> on the real input tells screen readers
            to announce "on"/"off" rather than "checked"/"unchecked" — a more accurate description
            of what flipping it actually does.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            A Switch should take effect immediately, without a separate "Save" step — that's the
            behavioral contract the switch shape communicates to users. If the change needs
            confirming, use Checkbox instead.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Using Switch inside a form that requires an explicit Submit button — the affordance
            mismatch confuses users about whether the setting is already active.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <Link
          to="/components/checkbox"
          className="text-small text-primary-600 hover:underline dark:text-primary-400"
        >
          Checkbox
        </Link>
      </Section>
    </div>
  );
}
