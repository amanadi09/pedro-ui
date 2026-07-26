import { Avatar } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'src',
    type: 'string',
    description: 'Falls back to initials automatically if missing or if the image fails to load.',
  },
  {
    name: 'name',
    type: 'string',
    description:
      'Used for the <img alt>, to derive fallback initials, and as the aria-label when showing initials.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Controls the diameter and initials font size together.',
  },
  {
    name: 'colorScheme',
    type: 'NovaColorScheme',
    default: "'neutral'",
    description: 'Fallback-initials background. Ignored once an image loads.',
  },
  {
    name: 'status',
    type: "'online' | 'offline' | 'away' | 'busy'",
    description: 'Renders a small ringed status dot.',
  },
];

export function AvatarPage() {
  return (
    <div>
      <PageHeader
        title="Avatar"
        description="Shows an image when it loads successfully, and falls back to initials automatically — including when the URL is broken or the network request fails, not just when src is missing entirely."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <div className="flex items-end gap-4">
            <Avatar name="Ada Lovelace" size="lg" colorScheme="primary" status="online" />
            <Avatar
              src="https://this-domain-does-not-exist.example/broken.jpg"
              name="Grace Hopper"
              size="lg"
            />
            <Avatar name="Alan Turing" size="lg" colorScheme="success" status="busy" />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock code={`<Avatar src={user.avatarUrl} name={user.fullName} status="online" />`} />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Whichever state renders — image or initials — the person's actual name is what a screen
            reader announces, not "AL" as literal text. The image gets{' '}
            <code className="text-code">alt={'{name}'}</code>; the initials fallback carries the
            same name via <code className="text-code">aria-label</code> on the wrapping element
            instead.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Always pass <code className="text-code">name</code>, even when you also pass{' '}
            <code className="text-code">src</code> — it's the only way the broken-image fallback has
            anything to show.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Passing only <code className="text-code">src</code> with no{' '}
            <code className="text-code">name</code> — a failed image load then falls back to a bare
            "?" instead of initials, and the accessible name is empty.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <span className="text-small text-text-secondary">Badge (no page yet)</span>
      </Section>
    </div>
  );
}
