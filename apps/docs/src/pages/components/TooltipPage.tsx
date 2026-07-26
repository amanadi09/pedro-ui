import { Link } from 'react-router-dom';
import { Copy } from 'lucide-react';
import { Tooltip, IconButton } from '@nova-ui/react';
import { PageHeader, Section } from '../../components/PageHeader';
import { CodeBlock } from '../../components/CodeBlock';
import { PropsTable, type PropRow } from '../../components/PropsTable';
import { ComponentPreview } from '../../components/ComponentPreview';

const props: PropRow[] = [
  { name: 'content', type: 'ReactNode', description: 'Required.' },
  {
    name: 'children',
    type: 'ReactElement',
    description:
      'A single focusable/hoverable element — cloned to attach handlers, so no extra wrapping DOM node is added around your trigger.',
  },
  {
    name: 'placement',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Which side of the trigger the tooltip renders on.',
  },
  {
    name: 'delayMs',
    type: 'number',
    default: '300',
    description: 'Delay before showing, to avoid flashing on incidental mouse-overs.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Suppresses the tooltip entirely, e.g. while the trigger action is unavailable.',
  },
];

export function TooltipPage() {
  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="A lightweight hover/focus tooltip, positioned with plain CSS — no viewport collision detection. Fine for triggers near the center of the screen; see the note below for edge cases."
      />

      <Section title="Live preview">
        <ComponentPreview>
          <div className="py-8">
            <Tooltip content="Copy to clipboard">
              <IconButton
                aria-label="Copy"
                icon={<Copy />}
                variant="outline"
                colorScheme="neutral"
              />
            </Tooltip>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Code">
        <CodeBlock
          code={`<Tooltip content="Copy to clipboard">
  <IconButton aria-label="Copy" icon={<Copy />} />
</Tooltip>`}
        />
      </Section>

      <Section title="Props">
        <PropsTable rows={props} />
      </Section>

      <Section title="Accessibility notes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Shows on <code className="text-code">focus</code>/
            <code className="text-code">blur</code> as well as{' '}
            <code className="text-code">mouseenter</code>/
            <code className="text-code">mouseleave</code> — keyboard users tabbing through the page
            see it too, not just mouse users.
          </li>
          <li>
            The trigger gets <code className="text-code">aria-describedby</code> pointing at the
            tooltip's <code className="text-code">role="tooltip"</code> content once it's visible.
          </li>
        </ul>
      </Section>

      <Section title="Best practices">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            For a trigger that can sit near a viewport edge (inside a scrolling data grid, for
            instance), this CSS-positioned approach can clip or overflow — that's the one case worth
            reaching for a floating-ui-based positioner instead, intentionally not a Nova UI
            dependency yet.
          </li>
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="list-disc space-y-1.5 pl-5 text-small text-text-secondary">
          <li>
            Wrapping a disabled element (e.g. a disabled Button) directly — disabled elements don't
            fire <code className="text-code">mouseenter</code>/
            <code className="text-code">focus</code> in most browsers, so the tooltip never shows.
            Wrap a non-disabled span around the disabled trigger instead.
          </li>
        </ul>
      </Section>

      <Section title="Related components">
        <Link
          to="/components/alert"
          className="text-small text-primary-600 hover:underline dark:text-primary-400"
        >
          Alert
        </Link>
      </Section>
    </div>
  );
}
