import { Github, Moon, Sun, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme, IconButton, Badge } from '@pedro-ui/react';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { resolvedMode, toggleMode } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <IconButton
          aria-label="Toggle navigation"
          icon={<Menu />}
          variant="ghost"
          colorScheme="neutral"
          size="sm"
          className="md:hidden"
          onClick={onMenuClick}
        />
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary-600 text-small font-bold text-white dark:bg-primary-500 dark:text-neutral-950">
            P
          </span>
          <span className="text-title text-text-primary">Pedro UI</span>
          <Badge size="sm" variant="outline" colorScheme="neutral">
            v0.1.0
          </Badge>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <IconButton
          aria-label={resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          icon={resolvedMode === 'dark' ? <Sun /> : <Moon />}
          variant="ghost"
          colorScheme="neutral"
          onClick={toggleMode}
        />
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="inline-flex size-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4"
        >
          <Github />
        </a>
      </div>
    </header>
  );
}
