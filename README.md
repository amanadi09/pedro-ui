# Pedro UI

A production-grade React design system and component library, built the way a frontend
infrastructure team would build one for internal product teams to consume.

[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue)](.github/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Tests](https://img.shields.io/badge/tests-158%20passing-brightgreen)

> **Status: early preview (v0.1.0).** The architecture, tooling, and design-token system are
> complete and production-shaped. The component catalog is a curated first slice — 10 of the ~90
> components in the original spec — built to full production quality rather than 90 components
> built as placeholders. See [Roadmap](#roadmap) for the honest breakdown of what's next.

---

## Table of contents

- [Why this exists](#why-this-exists)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Folder structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Theming](#theming)
- [Components](#components)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## Why this exists

Pedro UI is meant to demonstrate the engineering that sits *around* good components — architecture,
token systems, testing discipline, and documentation — not just the components themselves. Every
decision below is made and explained, not left implicit.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript 5 (strict mode, `noUncheckedIndexedAccess`) |
| Build | Vite 5 (library mode for packages, app mode for `apps/docs`) |
| Styling | Tailwind CSS 3, CSS-variable token bridge (see [Theming](#theming)) |
| Motion | Framer Motion, used sparingly (Tooltip enter/exit only so far) |
| Icons | lucide-react |
| Forms (ready-for) | Native form props throughout, so React Hook Form's `register()`/`Controller` work with zero adapter code — see [Usage](#usage) |
| Testing | Vitest + React Testing Library + jest-dom, `@testing-library/user-event` for real interaction simulation |
| Docs | Storybook 8 + a standalone Vite/React docs site (`apps/docs`) |
| Lint/format | ESLint 9 (flat config) + `typescript-eslint` + `jsx-a11y` + `eslint-plugin-storybook`, Prettier with `prettier-plugin-tailwindcss` |
| Git hooks | Husky + lint-staged |
| CI | GitHub Actions: lint → typecheck → test (with coverage) → build → Storybook build → docs deploy |

> **Known issue:** `npm audit` currently reports vulnerabilities in transitive **dev-tooling**
> dependencies only (esbuild's dev-server request handling via Vite 5, and `uuid` via a Storybook
> addon's transitive dependency) — nothing in the shipped runtime code of any `@pedro-ui/*` package.
> `npm audit fix --force` resolves them by force-upgrading to Vite 8 and downgrading a Storybook
> addon to an incompatible version respectively; both are untested breaking changes, so they're
> intentionally left as-is rather than applied blindly right before a release. Worth revisiting
> deliberately in Phase 2.

## Architecture

**Monorepo via npm workspaces**, not a single flat package, because the spec's own component list
implies genuinely separable concerns:

```
packages/theme  →  packages/utils  ↘
                                     packages/ui (@pedro-ui/react)  →  apps/docs
                    packages/hooks  ↗
```

- **`@pedro-ui/theme`** — design tokens as CSS custom properties (not static Tailwind values), plus
  a Tailwind preset that bridges them into utility classes. This is the one piece every other
  package depends on.
- **`@pedro-ui/utils`** and **`@pedro-ui/hooks`** — framework-light and React-only utilities,
  respectively, split into two packages (not one) so a non-React consumer could theoretically use
  `utils` alone, and so tree-shaking per-package is meaningful.
- **`@pedro-ui/react`** — the component library. Depends on all three packages above.
- **`apps/docs`** — consumes `@pedro-ui/react` the same way an external product team would.

**Deliberate deviations from a literal reading of the original spec**, and why:

- **No separate `stories/` or `tests/` top-level packages.** Storybook stories and unit tests are
  co-located with each component (`Button/Button.tsx`, `Button/Button.stories.tsx`,
  `Button/Button.test.tsx`) instead. This matches how Storybook itself, Testing Library, and most
  real component libraries (Mantine, Chakra, Radix) are actually organized today — centralizing
  tests/stories elsewhere is mostly a maintenance liability (delete a component, forget its test
  file lives three directories away) with no offsetting benefit.
- **No `class-variance-authority`, despite it being the "obvious" choice for a variant system.**
  The spec's own dependency list names `clsx` and `tailwind-merge` but not `cva`, so components
  compose variants through explicit `Record<Variant, Record<ColorScheme, string>>` maps and `cn()`
  (see `Button.tsx`) rather than introducing an unlisted dependency.
- **No dynamically-constructed Tailwind class names anywhere** (e.g. never
  `` `bg-${colorScheme}-600` ``). Tailwind's JIT compiler statically scans source for class-name
  *literals* — an interpolated string never gets generated into the shipped CSS. Every
  variant/colorScheme/size combination is written out explicitly. Verbose, but correct; see the
  comment above `solidStyles` in `Button.tsx` for the long version. This is exactly the kind of bug
  that only shows up in production (dev mode can behave differently), so it was worth getting
  right rather than optimizing the source for brevity.
- **Package source is consumed directly in dev, not built to `dist/` first.** `apps/docs`'s Vite
  config aliases `@pedro-ui/*` straight to each package's `src/index.ts`, so editing a component
  hot-reloads the docs site without an intermediate build step. Each package still has a working
  `vite build` (library mode, ESM+CJS, sourcemaps) for the case that actually matters — publishing
  to npm — configured in its `vite.config.ts`.

## Folder structure

```
pedro-ui/
├── apps/
│   └── docs/                 # Documentation site (Vite + React Router)
├── packages/
│   ├── theme/                 # Design tokens + Tailwind preset
│   ├── utils/                 # cn, format*, debounce/throttle, clipboard, CSV export
│   ├── hooks/                 # 14 React hooks
│   └── ui/                    # @pedro-ui/react — the component library
│       └── src/components/<Component>/
│           ├── <Component>.tsx
│           ├── <Component>.stories.tsx
│           ├── <Component>.test.tsx
│           └── index.ts
├── examples/
│   └── dashboard-example/    # A composed analytics dashboard, real components only
├── .storybook/
├── .github/workflows/ci.yml
└── README.md                 # you are here
```

## Installation

Requires Node ≥ 18.18 and npm ≥ 10 (see `package.json#engines` / `.nvmrc`).

```bash
git clone <this-repo>
cd pedro-ui
npm install
npm run dev          # docs site at http://localhost:5173
npm run storybook     # Storybook at http://localhost:6006
npm test               # full workspace test suite
```

To use Pedro UI **in another project** once it's published:

```bash
npm install @pedro-ui/react @pedro-ui/theme
```

```tsx
// tailwind.config.ts
import pedroPreset from '@pedro-ui/theme/tailwind-preset';

export default {
  presets: [pedroPreset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@pedro-ui/react/**/*.{ts,tsx}'],
};
```

```tsx
// main.tsx
import { ThemeProvider } from '@pedro-ui/react';
import '@pedro-ui/theme/variables.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultMode="system">
    <App />
  </ThemeProvider>,
);
```

## Usage

```tsx
import { Button, Input, Card, Alert } from '@pedro-ui/react';
import { Mail } from 'lucide-react';

function SignupForm() {
  return (
    <Card className="w-96">
      <Input label="Email" leftElement={<Mail />} placeholder="you@company.com" />
      <Button className="mt-4" fullWidth>
        Continue
      </Button>
    </Card>
  );
}
```

**React Hook Form** works without an adapter — every form component forwards native props and a
ref:

```tsx
const { register } = useForm();
<Input label="Email" {...register('email', { required: true })} />;
```

## Theming

Every color — brand ramps and light/dark semantic tokens alike — is a CSS custom property, not a
hard-coded Tailwind value. This means:

1. **Dark mode is a class toggle**, not a second build. `ThemeProvider`/`useDarkMode` add/remove
   `.dark` on `<html>`; every token already has a light and dark value defined in
   `packages/theme/src/css/variables.css`.
2. **Runtime re-theming is possible without forking the library** — override
   `--color-primary-600` etc. in your own CSS and every component picks it up, no rebuild required.
3. **High contrast mode** (`.hc` class) is supported for text/border/focus tokens specifically —
   see `packages/theme/src/tokens/semantic.ts` for why the scope is limited to those.

See the [Theming page](apps/docs/src/pages/Theming.tsx) in the docs site for a live, interactive
version of this section.

## Components

10 components are implemented to full production quality today: **Button, IconButton, Badge,
Avatar, Card, Alert, Input, Checkbox, Switch, Tooltip.** Each one ships with:

- Full TypeScript types and JSDoc on every exported symbol
- Every variant × colorScheme × size combination (where applicable)
- Light and dark mode
- Loading/disabled states where relevant
- Keyboard navigation and ARIA wiring appropriate to the component
- A Storybook story file covering default/variants/sizes/dark mode/loading/disabled/a11y/edge cases
- A test file covering rendering, interaction, keyboard, and accessibility attributes

Run `npm run storybook` for the full interactive catalog, or see the [Components
page](apps/docs/src/pages/ComponentsIndex.tsx) in the docs site, which also lists every
**not-yet-built** component from the original spec so the gap is visible rather than hidden.

## Testing

```bash
npm test                # run once
npm run test:watch      # watch mode
npm run test:coverage   # with coverage report
```
**158 tests passing** across 31 test files (Vitest workspace: `utils`, `hooks`, and `ui`
packages). The `ui` package — the highest-risk code, since it's the actual rendered output — sits
at **~99% statement coverage**, comfortably above the 80% target; coverage intentionally excludes
pure barrel `index.ts` re-export files, which have no logic to test.

Every component test covers, at minimum: renders correctly, responds to the interactions a user
would actually perform (via `@testing-library/user-event`, not synthetic `fireEvent` clicks),
keyboard operability, and the ARIA attributes the a11y notes claim it has — assertions are checked
against real behavior, not just "renders without crashing."

## Accessibility

See the [Accessibility page](apps/docs/src/pages/Accessibility.tsx) for the full, honestly-scoped
breakdown. Short version: keyboard navigation, focus-visible indicators, ARIA wiring, semantic
HTML, and `prefers-reduced-motion` support are implemented and covered by automated checks
(`eslint-plugin-jsx-a11y`, Storybook's a11y addon). A manual/assistive-technology audit has **not**
been done yet — that's called out explicitly in the [Roadmap](#roadmap) rather than implied by
omission.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the component checklist, commit conventions
([Conventional Commits](https://www.conventionalcommits.org/)), and what counts as a breaking
change.

## Roadmap

The full, itemized roadmap lives at [apps/docs/src/pages/Roadmap.tsx](apps/docs/src/pages/Roadmap.tsx)
(rendered at `/roadmap` in the docs site) so it stays next to the code it describes. Summary:

- ✅ **Phase 1 (this delivery):** monorepo + tooling, full token system, utils, hooks, 10
  production components, Storybook, documentation site.
- 🔜 **Phase 2:** remaining ~80 components from the original spec, grouped by category (remaining
  Inputs, Navigation, Data Display incl. virtualized Table, Feedback incl. Modal/Drawer/Toast,
  Layout, Analytics widgets).
- 🔜 **Phase 3:** Chromatic visual regression in CI, manual accessibility audit, npm publish
  pipeline with Changesets, floating-ui-based positioning for Tooltip/Popover/Dropdown.

## License

[MIT](LICENSE)
