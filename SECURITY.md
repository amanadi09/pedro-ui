# Security Policy

## Supported versions

Pedro UI is pre-1.0 (`0.x`). Only the latest published version of each package receives security
fixes — there is no long-term-support branch yet.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, use [GitHub's private vulnerability reporting](../../security/advisories/new) for this
repository (Security tab → "Report a vulnerability"), or email the maintainer directly (see the
repository's GitHub profile) with:

- A description of the vulnerability and its potential impact
- Steps to reproduce, or a minimal repro repository if possible
- The affected package(s) and version(s)

You should expect an initial response within 5 business days. If confirmed, a fix will be
prioritized and a GitHub Security Advisory published once a patched version is available.

## Scope

The published runtime packages (`@pedro-ui/react`, `@pedro-ui/hooks`, `@pedro-ui/utils`,
`@pedro-ui/theme`) are in scope. Vulnerabilities in this repository's own devDependencies
(build/test/documentation tooling — Vite, Vitest, Storybook, ESLint, etc.) that do not affect the
published package output are tracked via Dependabot rather than as security advisories, since they
never reach a consumer's `node_modules` through installing a Pedro UI package.
