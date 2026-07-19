import { ArrowRight, Accessibility as AccessibilityIcon, Palette, Package } from 'lucide-react';
import { Card, Badge } from '@nova-ui/react';
import { Section } from '../components/PageHeader';
import { CodeBlock } from '../components/CodeBlock';
import { LinkButton } from '../components/LinkButton';

export function Introduction() {
  return (
    <div>
      <div className="mb-10">
        <Badge variant="outline" colorScheme="primary" className="mb-4">
          v0.1.0 — early preview
        </Badge>
        <h1 className="text-display text-text-primary">Nova UI</h1>
        <p className="mt-3 max-w-xl text-body text-text-secondary">
          A production-grade, accessible React component library and design system for enterprise
          dashboards and B2B SaaS products.
        </p>
        <div className="mt-6 flex gap-3">
          <LinkButton to="/components">
            Browse components
            <ArrowRight className="size-4" />
          </LinkButton>
          <LinkButton to="/roadmap" variant="outline" colorScheme="neutral">
            View roadmap
          </LinkButton>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card variant="outlined">
          <Palette className="mb-3 size-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-title text-text-primary">Token-driven theming</h3>
          <p className="mt-1 text-small text-text-secondary">
            Every color is a CSS variable — light, dark, and high-contrast mode ship for free, and
            re-theming doesn't require forking the library.
          </p>
        </Card>
        <Card variant="outlined">
          <AccessibilityIcon className="mb-3 size-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-title text-text-primary">Accessible by default</h3>
          <p className="mt-1 text-small text-text-secondary">
            Keyboard navigation, focus management, and ARIA wiring are built in, not bolted on — see
            the Accessibility page for specifics per component.
          </p>
        </Card>
        <Card variant="outlined">
          <Package className="mb-3 size-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-title text-text-primary">Tree-shakeable</h3>
          <p className="mt-1 text-small text-text-secondary">
            Hooks, utils, and theme tokens ship as separate packages, so you can use just the parts
            you need.
          </p>
        </Card>
      </div>

      <Section title="Installation">
        <CodeBlock language="bash" code={'npm install @nova-ui/react @nova-ui/theme'} />
      </Section>

      <Section title="Quick start">
        <p className="mb-3 text-small text-text-secondary">
          Wrap your app in <code className="text-code">ThemeProvider</code>, import the token
          stylesheet once, and Nova UI's components are ready to use.
        </p>
        <CodeBlock
          code={`import { ThemeProvider, Button } from '@nova-ui/react';
import '@nova-ui/theme/variables.css';

export function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Button colorScheme="primary">Get started</Button>
    </ThemeProvider>
  );
}`}
        />
      </Section>

      <Section title="Tailwind setup">
        <p className="mb-3 text-small text-text-secondary">
          Nova UI's components are styled with Tailwind utility classes, so your app's Tailwind
          config needs to scan the package and extend the shared preset:
        </p>
        <CodeBlock
          code={`// tailwind.config.ts
import novaPreset from '@nova-ui/theme/tailwind-preset';

export default {
  presets: [novaPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nova-ui/react/**/*.{ts,tsx}',
  ],
};`}
        />
      </Section>
    </div>
  );
}
