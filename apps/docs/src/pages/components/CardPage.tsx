import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Card, Button, IconButton } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  {
    name: 'variant',
    type: "'elevated' | 'outlined' | 'flat'",
    default: "'elevated'",
    description: 'Elevated uses a shadow in light mode, a border in dark mode.',
  },
  {
    name: 'noPadding',
    type: 'boolean',
    default: 'false',
    description: 'Removes default padding — for edge-to-edge content like a Table.',
  },
  {
    name: 'interactive',
    type: 'boolean',
    default: 'false',
    description:
      'Adds hover/focus visual affordance. You still supply role="button"/tabIndex/onClick/onKeyDown yourself.',
  },
];

export function CardPage() {
  return (
    <div>
      <PageHeader
        title="Card"
        description="The base container almost everything else in a dashboard composes on top of. Card.Header / Card.Body / Card.Footer cover the common three-region layout; pass children directly for simpler cases."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <Card className="w-80">
            <Card.Header>
              <h3 className="text-title text-text-primary">Team members</h3>
              <IconButton
                aria-label="More options"
                icon={<MoreHorizontal />}
                variant="ghost"
                colorScheme="neutral"
                size="sm"
              />
            </Card.Header>
            <Card.Body>You have 12 members across 3 teams.</Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm">Manage</Button>
            </Card.Footer>
          </Card>
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Card>
  <Card.Header>
    <h3>Team members</h3>
  </Card.Header>
  <Card.Body>You have 12 members across 3 teams.</Card.Body>
  <Card.Footer>
    <Button size="sm">Manage</Button>
  </Card.Footer>
</Card>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Card renders a plain <code className="text-code">&lt;div&gt;</code> — it doesn't assume
            a role. If a card is a click target (a link-styled dashboard tile, say), you own adding{' '}
            <code className="text-code">role="button"</code>,{' '}
            <code className="text-code">tabIndex={'{0}'}</code>, and an{' '}
            <code className="text-code">onKeyDown</code> handler for Enter/Space, exactly like the
            "Interactive" story in Storybook demonstrates.{' '}
            <code className="text-code">interactive</code> only supplies the visual hover/focus
            styling, deliberately — baking in a fake button role by default would be wrong for the
            (more common) case of a card that isn't clickable at all.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            In dark mode, Card uses a 1px border instead of a heavier shadow for elevation — a
            shadow barely registers against a dark canvas. Don't manually add{' '}
            <code className="text-code">shadow-lg</code> in dark mode; it won't look intentional.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Adding <code className="text-code">onClick</code> to a Card without also adding{' '}
            <code className="text-code">interactive</code>,{' '}
            <code className="text-code">role="button"</code>, and keyboard handling — it'll work for
            mouse users and silently exclude keyboard/screen-reader users.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <div className="flex items-center gap-3">
          <Link
            to="/components/alert"
            className="text-small text-primary-600 hover:underline dark:text-primary-400"
          >
            Alert
          </Link>
          <span className="text-small text-text-secondary">Badge (no page yet)</span>
        </div>
      </Section>
    </div>
  );
}
