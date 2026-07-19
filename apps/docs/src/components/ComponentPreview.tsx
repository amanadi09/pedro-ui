import type { ReactNode } from 'react';

/** Wraps a live component demo in a consistent bordered canvas — the
 * "Live Preview" region every component doc page includes. */
export function ComponentPreview({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-surface p-8">
      {children}
    </div>
  );
}
