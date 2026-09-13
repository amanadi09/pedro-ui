import { NavLink } from 'react-router-dom';
import { cn } from '@pedro-ui/utils';
import { navSections } from '../lib';

export function Sidebar({ className }: { className?: string }) {
  return (
    <nav className={cn('w-56 shrink-0 overflow-y-auto', className)} aria-label="Documentation">
      {navSections.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="mb-2 px-3 text-label uppercase tracking-wide text-text-secondary">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-md px-3 py-1.5 text-small transition-colors',
                      isActive
                        ? 'dark:bg-primary-950/50 bg-primary-50 font-medium text-primary-700 dark:text-primary-300'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
