import { LinkButton } from '../components/LinkButton';

export function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="text-display text-text-primary">404</p>
      <p className="mt-2 text-body text-text-secondary">This page doesn't exist yet.</p>
      <LinkButton to="/" className="mt-6">
        Back to Introduction
      </LinkButton>
    </div>
  );
}
