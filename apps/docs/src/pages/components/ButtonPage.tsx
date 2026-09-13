import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button, Badge } from '@pedro-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'ghost' | 'link'",
    default: "'solid'",
    description: 'Visual treatment.',
  },
  {
    name: 'colorScheme',
    type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'",
    default: "'primary'",
    description: 'Semantic color.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height, padding, and font size.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a spinner and disables the button.',
  },
  {
    name: 'loadingText',
    type: 'string',
    default: "'Loading'",
    description: 'Screen-reader announcement while loading.',
  },
  {
    name: 'leftIcon / rightIcon',
    type: 'ReactNode',
    description: 'Icon slots either side of the label.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches to 100% of the container width.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Native HTML disabled — also set automatically while isLoading.',
  },
];

export function ButtonPage() {
  const [variant, setVariant] = useState<'solid' | 'outline' | 'ghost' | 'link'>('solid');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [colorScheme, setColorScheme] = useState<
    'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'
  >('primary');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <PageHeader
        title="Button"
        description="The primary action trigger. Every variant/colorScheme/size combination shares one styling matrix — see the source for the full rationale on why it's hand-written rather than dynamically constructed."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <Button
            variant={variant}
            size={size}
            colorScheme={colorScheme}
            isLoading={isLoading}
            leftIcon={variant !== 'link' ? <Plus /> : undefined}
          >
            {isLoading ? 'Saving' : 'New project'}
          </Button>
        </ComponentPreview>

        <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-4">
          <label className="flex flex-col gap-1 text-caption text-text-secondary">
            Variant
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
              className="rounded-md border border-border-strong bg-surface px-2 py-1 text-small text-text-primary"
            >
              {(['solid', 'outline', 'ghost', 'link'] as const).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-caption text-text-secondary">
            Color scheme
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value as typeof colorScheme)}
              className="rounded-md border border-border-strong bg-surface px-2 py-1 text-small text-text-primary"
            >
              {(
                ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const
              ).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-caption text-text-secondary">
            Size
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as typeof size)}
              className="rounded-md border border-border-strong bg-surface px-2 py-1 text-small text-text-primary"
            >
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 pt-4 text-small text-text-secondary">
            <input
              type="checkbox"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
              className="size-4"
            />
            Loading
          </label>
        </div>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Button variant="${variant}" colorScheme="${colorScheme}" size="${size}"${isLoading ? '\n  isLoading' : ''}>
  New project
</Button>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Renders a native <code className="text-code">&lt;button type="button"&gt;</code>, so
            Space/Enter activation and disabled semantics are free.
          </li>
          <li>
            <code className="text-code">isLoading</code> sets{' '}
            <code className="text-code">aria-busy</code> and adds a polite{' '}
            <code className="text-code">role="status"</code> live region with{' '}
            <code className="text-code">loadingText</code>, so screen reader users hear a status
            update instead of silence.
          </li>
          <li>
            Focus ring uses <code className="text-code">focus-visible</code>, so it only appears for
            keyboard users.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Use{' '}
            <Badge size="sm" variant="outline">
              solid
            </Badge>{' '}
            for the single primary action in a view; use{' '}
            <Badge size="sm" variant="outline">
              outline
            </Badge>
            /
            <Badge size="sm" variant="outline">
              ghost
            </Badge>{' '}
            for secondary actions nearby, so the hierarchy is visually unambiguous.
          </li>
          <li>
            Set <code className="text-code">loadingText</code> to something specific ("Saving
            changes") rather than the default — it's what screen reader users actually hear.
          </li>
          <li>
            For an icon-only trigger, use <code className="text-code">IconButton</code> instead of
            Button with only an icon child — it enforces an{' '}
            <code className="text-code">aria-label</code> at the type level.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Wrapping a router <code className="text-code">&lt;Link&gt;</code> inside{' '}
            <code className="text-code">&lt;Button&gt;</code> — Button renders a real{' '}
            <code className="text-code">&lt;button&gt;</code>, and nesting an{' '}
            <code className="text-code">&lt;a&gt;</code> inside it is invalid HTML. Use a link
            styled like a button instead (see this site's own{' '}
            <code className="text-code">LinkButton</code> helper).
          </li>
          <li>
            Passing <code className="text-code">disabled</code> instead of{' '}
            <code className="text-code">isLoading</code> for async actions —{' '}
            <code className="text-code">disabled</code> alone gives no visual feedback that
            something is happening.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <div className="flex gap-2">
          <Link
            to="/components/icon-button"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            IconButton
          </Link>
        </div>
      </Section>
    </div>
  );
}
