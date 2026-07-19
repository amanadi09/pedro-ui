import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Input } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'label',
    type: 'string',
    description: 'Rendered as a real <label>, associated via htmlFor/id.',
  },
  {
    name: 'helperText',
    type: 'string',
    description: 'Shown below the input; hidden once errorText is set.',
  },
  {
    name: 'errorText',
    type: 'string',
    description: 'Implies isInvalid; takes priority over helperText.',
  },
  {
    name: 'isInvalid',
    type: 'boolean',
    default: 'false',
    description: 'Sets aria-invalid and the error border without requiring errorText.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and font size.',
  },
  {
    name: 'leftElement / rightElement',
    type: 'ReactNode',
    description: 'Icon or text adornments.',
  },
];

export function InputPage() {
  const [invalid, setInvalid] = useState(false);

  return (
    <div>
      <PageHeader
        title="Input"
        description="A labeled text input with built-in helper/error messaging. Drops directly into React Hook Form's register() — it's a plain native <input> under the hood."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <div className="w-72">
            <Input
              label="Email address"
              placeholder="you@company.com"
              leftElement={<Mail />}
              isInvalid={invalid}
              errorText={invalid ? 'Please enter a valid email address.' : undefined}
              helperText={!invalid ? "We'll never share your email." : undefined}
            />
          </div>
        </ComponentPreview>
        <label className="mt-4 flex items-center gap-2 text-small text-text-secondary">
          <input
            type="checkbox"
            checked={invalid}
            onChange={(e) => setInvalid(e.target.checked)}
            className="size-4"
          />
          Show invalid state
        </label>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Input
  label="Email address"
  placeholder="you@company.com"
  leftElement={<Mail />}${invalid ? '\n  isInvalid\n  errorText="Please enter a valid email address."' : '\n  helperText="We\'ll never share your email."'}
/>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            The label uses a real <code className="text-code">htmlFor</code>/
            <code className="text-code">id</code> pair (via{' '}
            <code className="text-code">useId()</code>), not just visual proximity — clicking the
            label focuses the input.
          </li>
          <li>
            <code className="text-code">aria-describedby</code> automatically points at whichever of
            helper/error text is currently shown.
          </li>
          <li>
            <code className="text-code">aria-invalid</code> follows{' '}
            <code className="text-code">isInvalid</code>/
            <code className="text-code">errorText</code>.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Always pass a <code className="text-code">label</code> — if the design truly has no
            visible label, pass <code className="text-code">aria-label</code> instead, never
            neither.
          </li>
          <li>
            Prefer <code className="text-code">errorText</code> with a specific, actionable message
            over a generic "Invalid input."
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Setting both <code className="text-code">helperText</code> and{' '}
            <code className="text-code">errorText</code> and expecting both to show — only one
            renders at a time, by design, so the message doesn't get cut off in narrow layouts.
          </li>
        </ul>
      </Section>
    </div>
  );
}
