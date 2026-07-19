import type { ReactNode } from 'react';

export function PageHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-heading text-text-primary">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-body text-text-secondary">{description}</p>}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-title text-text-primary">{title}</h2>
      {children}
    </section>
  );
}
