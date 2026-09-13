# Contributing to Pedro UI

## Local setup

```bash
npm install
npm run dev          # docs site
npm run storybook     # component catalog
npm test               # full test suite
```

## Adding a new component

Every component under `packages/ui/src/components/<Name>/` follows the same shape. Use `Badge` or
`Alert` as a reference — they're the smallest complete examples.

1. `<Name>.tsx` — the component. Requirements:
   - `forwardRef` to the underlying DOM element
   - Full TypeScript props interface, extending the relevant native `*HTMLAttributes` where it
     makes sense (`Omit` any native prop you're intentionally redefining — see `Alert`'s `title`
     for why)
   - JSDoc on the exported component: what it's for, when to reach for it vs. a sibling component,
     any non-obvious a11y behavior, and an `@example`
   - `className` merged via `cn(...)` and always applied to the root element — a prop that's
     accepted but silently dropped is a bug, not a no-op (two of these shipped in the first pass
     and were caught by lint; there's no automated regression test for "is className applied" per
     component, so double-check by hand)
   - No dynamically-constructed Tailwind class names (no `` `bg-${x}-600` ``) — see the README
     architecture section for why. Write out the full `Record<Variant, string>` map.
2. `<Name>.test.tsx` — cover: renders, keyboard operability (real `userEvent`, not `fireEvent`),
   the specific ARIA attributes your JSDoc claims exist, disabled/loading states if applicable,
   and `className` merging.
3. `<Name>.stories.tsx` — CSF3 format, `tags: ['autodocs']`. Include at minimum: `Default`,
   `Variants` (if any), `Sizes` (if any), a dark-mode story, and one "edge case" story (long
   content, empty state, or similar).
4. `index.ts` — barrel export of the component and its exported types.
5. Add it to `packages/ui/src/components/index.ts`.
6. Add a real usage of it somewhere in `apps/docs` or `examples/dashboard-example` if the
   composition reveals anything a unit test wouldn't (spacing against siblings, etc.).

Run `npm run typecheck && npm run lint && npm test` before opening a PR — CI runs the same three
gates plus a build.

## Commit conventions

[Conventional Commits](https://www.conventionalcommits.org/): `feat(scope): ...`, `fix(scope):
...`, `docs: ...`, `chore: ...`, `test: ...`. Scope is usually the package or component name
(`feat(hooks): add useDebounce`, `fix(button): correct focus ring in dark mode`).

## What counts as a breaking change

Pedro UI is pre-1.0, so semver is best-effort, but treat these as breaking regardless of current
version:

- Removing or renaming an exported component, hook, or util
- Removing or renaming a prop
- Changing a prop's default value in a way that changes visual output
- Changing a CSS variable's *name* (changing its *value* — e.g. adjusting `--color-primary-600`'s
  hex — is not breaking; that's the point of the token system)

Not breaking: adding a new optional prop, adding a new variant option, adding a new component.

## Code style

Enforced by CI, not convention: ESLint (flat config, `typescript-eslint` + `jsx-a11y` +
`eslint-plugin-storybook`) and Prettier (`prettier-plugin-tailwindcss` auto-sorts class lists —
don't hand-order them). Husky + lint-staged run both on every commit.
