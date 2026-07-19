import { useTheme } from '@nova-ui/react';
import { PageHeader, Section } from '../components/PageHeader';
import { CodeBlock } from '../components/CodeBlock';

const swatchGroups = [
  { name: 'primary', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'success', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'danger', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'neutral', steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
];

export function Theming() {
  const { mode, resolvedMode, setMode, highContrast, setHighContrast } = useTheme();

  return (
    <div>
      <PageHeader
        title="Theming"
        description="Nova UI's tokens are CSS custom properties, not hard-coded Tailwind values — light, dark, and high-contrast are all runtime states, not separate builds."
      />

      <Section title="Try it">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="text-small text-text-secondary">Mode:</span>
          {(['light', 'dark', 'system'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 text-small transition-colors ${
                mode === m
                  ? 'bg-primary-600 text-white dark:bg-primary-500 dark:text-neutral-950'
                  : 'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {m}
            </button>
          ))}
          <span className="ml-2 text-caption text-text-secondary">
            (resolved: <strong className="text-text-primary">{resolvedMode}</strong>)
          </span>
          <label className="ml-auto flex items-center gap-2 text-small text-text-secondary">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="size-4"
            />
            High contrast
          </label>
        </div>
      </Section>

      <Section title="Color ramps">
        <p className="mb-4 text-small text-text-secondary">
          Every semantic color exposes the full 50–900 ramp. Components mostly reach for 600 in
          light mode and 500/400 in dark mode — see any component's source for the exact steps used.
          These swatches read the same CSS variables the components do (via inline styles here,
          since the set of classes is data-driven rather than static — see the note in{' '}
          <code className="text-code">Button.tsx</code> about why Tailwind classes can't be built
          with string interpolation).
        </p>
        <div className="flex flex-col gap-3">
          {swatchGroups.map((group) => (
            <div key={group.name} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-caption capitalize text-text-secondary">
                {group.name}
              </span>
              <div className="flex flex-1 overflow-hidden rounded-md">
                {group.steps.map((step) => (
                  <div
                    key={step}
                    className="h-8 flex-1"
                    style={{ backgroundColor: `rgb(var(--color-${group.name}-${step}))` }}
                    title={`${group.name}-${step}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Semantic tokens">
        <p className="mb-3 text-small text-text-secondary">
          Reach for these in app code instead of raw neutral steps — they're what actually flips
          between light and dark, so you get correct contrast automatically.
        </p>
        <CodeBlock
          language="tsx"
          code={`<div className="bg-surface text-text-primary border border-border">
  <p className="text-text-secondary">Muted description text</p>
</div>`}
        />
      </Section>

      <Section title="Custom branding">
        <p className="mb-3 text-small text-text-secondary">
          Because every token is a CSS variable, a product team can override just the accent color
          without forking Nova UI or waiting on a new release:
        </p>
        <CodeBlock
          code={`/* your-app/brand-override.css */
:root {
  --color-primary-600: 190 60 30; /* space-separated R G B */
}`}
        />
      </Section>
    </div>
  );
}
