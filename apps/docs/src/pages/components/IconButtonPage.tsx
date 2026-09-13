import { Link } from 'react-router-dom';
import { Trash2, Bell } from 'lucide-react';
import { IconButton } from '@pedro-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'aria-label',
    type: 'string',
    description:
      'Required — the only accessible name available, since IconButton has no visible text. Enforced at the type level, not just documented.',
  },
  { name: 'icon', type: 'ReactElement', description: 'The icon to render.' },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'ghost' | 'link'",
    default: "'solid'",
    description: 'Shares Button\u2019s exact styling matrix.',
  },
  {
    name: 'colorScheme',
    type: 'PedroColorScheme',
    default: "'primary'",
    description: 'Same 7-value union as every other component.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Renders as a square of that size.',
  },
  {
    name: 'isRound',
    type: 'boolean',
    default: 'false',
    description: 'Circle instead of rounded square.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    description: 'Spinner in place of the icon, disables the button.',
  },
];

export function IconButtonPage() {
  return (
    <div>
      <PageHeader
        title="IconButton"
        description="A square (or round) icon-only button. Shares Button's variant/colorScheme styling matrix rather than duplicating it — see Button.tsx for the shared buttonVariantStyles export."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <div className="flex items-center gap-3">
            <IconButton
              aria-label="Delete"
              icon={<Trash2 />}
              colorScheme="danger"
              variant="ghost"
            />
            <IconButton
              aria-label="Notifications"
              icon={<Bell />}
              variant="outline"
              colorScheme="neutral"
              isRound
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<IconButton aria-label="Delete item" icon={<Trash2 />} colorScheme="danger" variant="ghost" />`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            <code className="text-code">aria-label</code> is a required TypeScript prop, not
            optional — the component won't compile without it.
          </li>
          <li>
            Everything else (keyboard activation, <code className="text-code">aria-busy</code> while
            loading) is inherited from the same native-button foundation as Button.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Write the label for what the action <em>does</em> ("Delete item"), not what the icon{' '}
            <em>is</em> ("Trash icon").
          </li>
          <li>
            Pair with Tooltip in toolbars so sighted users get a visible label too, not just screen
            reader users.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Using Button with only an icon child instead of IconButton — you lose the
            required-aria-label safety net and the square aspect ratio.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <div className="flex gap-3">
          <Link
            to="/components/button"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            Button
          </Link>
          <Link
            to="/components/tooltip"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            Tooltip
          </Link>
        </div>
      </Section>
    </div>
  );
}
