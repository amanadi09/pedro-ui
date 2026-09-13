let counter = 0;

/**
 * Generates a reasonably-unique id, optionally prefixed — useful for
 * `aria-*` wiring (`aria-describedby`, `htmlFor`) where React's own
 * `useId` isn't in scope (e.g. outside components) or a human-readable
 * prefix helps when debugging the DOM.
 *
 * Not cryptographically secure and not guaranteed globally unique across
 * page reloads — for that, use `crypto.randomUUID()` directly.
 *
 * @example
 * generateId('input') // "input-1"
 * generateId('input') // "input-2"
 */
export function generateId(prefix = 'pedro'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
