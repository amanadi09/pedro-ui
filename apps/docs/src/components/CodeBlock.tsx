import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useClipboard } from '@pedro-ui/hooks';
import { cn } from '@pedro-ui/utils';
import { IconButton } from '@pedro-ui/react';

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const { copy, copied } = useClipboard();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-lg border border-border bg-neutral-950 dark:bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-caption text-neutral-400">{language}</span>
        <IconButton
          aria-label={copied ? 'Copied' : 'Copy code'}
          icon={copied ? <Check className="text-success-400" /> : <Copy />}
          size="sm"
          variant="ghost"
          colorScheme="neutral"
          className={cn('text-neutral-400 hover:bg-white/10', !hovered && !copied && 'opacity-0')}
          onClick={() => copy(code)}
        />
      </div>
      <pre className="overflow-x-auto p-4 text-code text-neutral-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
