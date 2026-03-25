# Lucas Vacis Portfolio

This repository contains the source code for my personal portfolio website.

It is built to do two things well:

- present me clearly as a Senior QA Automation Engineer / SDET,
- show that I care about engineering quality, not just visual polish.

The site is intentionally small and static, but the way it is built matters. It reflects how I think about frontend structure, maintainability, testing strategy, CI visibility, and production-safe delivery.

## What This Project Is

This is a single-page portfolio built with React, TypeScript, and Vite, designed for GitHub Pages deployment.

It is meant to be easy to scan:

- for recruiters, it gives a fast understanding of profile, strengths, and experience,
- for technical reviewers, it shows code organization, testing depth, reporting, and CI discipline.

## What It Tries to Communicate

The product direction behind the site is deliberate.

I wanted it to feel:

- modern,
- technical,
- focused,
- credible,
- easy to navigate.

Content is kept concise on purpose. The goal is not to say everything, but to say the right things clearly and defensibly.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### Testing

- Vitest
- Testing Library
- Playwright

### Delivery

- GitHub Actions
- GitHub Pages

## Project Structure

The repo is organized to keep content, UI, and test responsibilities separate.

```txt
.
|-- .github/
|   `-- workflows/
|       |-- auto-open-pr.yml
|       |-- ci.yml
|       `-- deploy-pages.yml
|-- e2e/
|   |-- pages/
|   `-- tests/
|-- public/
|   |-- CNAME
|   |-- favicon.png
|   `-- resume.pdf
|-- scripts/
|   `-- e2e-report.ts
|-- src/
|   |-- app/
|   |-- components/
|   |   |-- layout/
|   |   `-- sections/
|   |-- content/
|   |-- types/
|   `-- utils/
|-- tests/
|   |-- component/
|   |-- setup/
|   `-- unit/
|-- playwright.config.ts
|-- package.json
`-- vite.config.ts
```

### How the app is organized

- `src/app/*`
  App bootstrap and global styling.

- `src/components/layout/*`
  Shared layout building blocks such as containers, navbar, footer, and section wrappers.

- `src/components/sections/*`
  The portfolio sections themselves. This keeps the page modular and easy to evolve.

- `src/content/*`
  Structured content used by the UI. This is important because the copy should be maintainable without burying long text blocks inside components.

- `src/types/content.ts`
  Type contracts for content-driven sections.

- `tests/unit/*`
  Small, focused logic and contract tests.

- `tests/component/*`
  UI behavior tests at component level.

- `e2e/*`
  Browser-level smoke and visual checks.

- `scripts/e2e-report.ts`
  A custom reporting script that turns Playwright results into a cleaner summary report for CI review.

## Content Approach

One of the most important choices in this project is that content is treated as structured data rather than scattered hardcoded copy.

That makes it easier to:

- refresh wording without rewriting components,
- keep messaging consistent,
- extend the site later with richer case studies or additional sections,
- keep the structure easy to explain and maintain.

## Main Sections

The page is built around a small set of curated sections:

- Hero
- About
- Core Expertise / Capabilities
- What I Bring / Services
- Featured Repositories
- Experience
- QA + AI
- Contact

These sections are meant to balance personal positioning with technical evidence.

## Local Setup

### Install dependencies

```bash
npm install
```

### Start local development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

## Useful Commands

### Type checking

```bash
npm run typecheck
```

### Unit tests

```bash
npm run test:unit
```

### Component tests

```bash
npm run test:component
```

### End-to-end smoke tests

```bash
npm run test:e2e
```

### Local CI-style test run

```bash
npm run test:ci
```

## Testing Strategy

This project uses layered testing because that is closer to how I approach quality in real work: fast feedback where possible, browser-level validation where it adds real value.

### Unit tests

Used for lightweight logic and content contracts.

Good for:

- utility functions,
- data integrity checks,
- simple business rules,
- protecting content-driven structures.

### Component tests

Used to validate behavior at the React component level without the cost of a full browser run.

Good for:

- navigation behavior,
- rendering conditions,
- accessibility states,
- CTA visibility and interaction,
- section-level UI expectations.

### End-to-end tests

Used for the paths that matter most in the actual browser.

Current focus areas include:

- navigation flow,
- CTA link coverage,
- smoke validation of core sections,
- visual regression checks for key layout areas.

## Playwright Setup

The Playwright configuration is intentionally CI-friendly.

Key choices:

- full parallel execution,
- retries enabled in CI,
- reduced worker count in CI for stability,
- screenshots kept on failure,
- videos kept on failure,
- traces kept on failure,
- HTML, JSON, and JUnit reporters enabled together,
- local preview server used as the test target.

Relevant file: [playwright.config.ts](C:/Users/lucas/Documentos/Repos/portfolio-lucas-vacis/playwright.config.ts)

## Reporting

The reporting flow is one of the most useful parts of this repo from a quality-engineering perspective.

When Playwright runs, it produces the usual native reports, and then a custom script builds a more readable summary for fast triage.

### Native Playwright outputs

- HTML report: `artifacts/playwright/html`
- JSON report: `artifacts/playwright/results.json`
- JUnit report: `artifacts/playwright/junit.xml`
- failure evidence: `artifacts/playwright/test-results`

### Custom report

Generated by [scripts/e2e-report.ts](C:/Users/lucas/Documentos/Repos/portfolio-lucas-vacis/scripts/e2e-report.ts)

Outputs:

- `report/index.html`
- `artifacts/playwright/custom/index.html`
- `artifacts/playwright/custom/metrics.json`

The custom report highlights:

- total test count,
- pass / fail / flaky / skipped breakdown,
- retry rate,
- duration,
- failure analysis,
- direct links to screenshots, videos, traces, and error context.

### Regenerate the custom report

```bash
npm run report:e2e
```

### Open the native Playwright HTML report

```bash
npm run report:e2e:open
```

### Regenerate and open the custom report

```bash
npm run report:e2e:custom:open
```

## CI Pipeline

Main workflow: [ci.yml](C:/Users/lucas/Documentos/Repos/portfolio-lucas-vacis/.github/workflows/ci.yml)

It runs on:

- pull requests into `main`,
- pushes to `main`,
- manual workflow dispatch,
- weekday schedule.

### `quality` job

This job covers the fast, foundational checks:

- install dependencies,
- typecheck,
- production build,
- unit tests,
- component tests.

Why it exists:

- it catches structural issues early,
- it avoids wasting E2E time on obvious failures,
- it keeps the first stage of feedback quick and practical.

### `e2e-smoke` job

This job handles browser-level validation and evidence generation:

- builds the app,
- installs Chromium,
- runs Playwright,
- generates the custom report,
- exports summary metrics,
- uploads artifacts,
- writes a GitHub summary,
- comments on PRs,
- fails the job at the end if E2E failed.

This matters because a red pipeline is much more useful when it comes with evidence rather than just a failed status.

### CI artifacts

The workflow uploads:

- `artifacts/playwright/*`
- `report/*`

That means a failed run still leaves behind:

- screenshots,
- videos,
- traces,
- Playwright reports,
- the custom summary report.

## Intentional Failure Mode

There is also support for a manual CI run that intentionally fails an E2E scenario.

This is useful when I want to validate the reporting pipeline itself, not just the application behavior.

Workflow input:

- `force_e2e_failure`

Environment flag used in CI:

- `PLAYWRIGHT_INTENTIONAL_FAILURE=true`

Why this is useful:

- it proves the reporting pipeline works,
- it helps test artifact publishing,
- it creates a realistic run for validating failure triage and evidence collection.

## Deployment

The portfolio is intentionally static and GitHub Pages friendly.

That means:

- no backend is required for the core experience,
- the production output comes from `dist`,
- the Vite setup remains Pages-compatible,
- the site can be deployed simply and predictably.

Related workflow: [deploy-pages.yml](C:/Users/lucas/Documentos/Repos/portfolio-lucas-vacis/.github/workflows/deploy-pages.yml)

## Why This Repo Matters

This is not a large product, and it does not need to be. Its value is that it is small enough to understand quickly, but intentional enough to discuss in depth.

For recruiters, it shows:

- clear positioning,
- polished presentation,
- focused communication,
- evidence of seniority and ownership.

For engineers and hiring managers, it shows:

- clean frontend structure,
- content separation,
- layered testing,
- CI discipline,
- useful reporting,
- practical debugging support,
- production-safe static delivery.

## Branch Naming

Suggested naming style:

- `codex/feat-...`
- `codex/fix-...`
- `codex/chore-...`
- `codex/content-...`
- `codex/test-...`

Examples:

- `codex/fix-e2e-custom-report`
- `codex/content-refresh-hero-copy`
- `codex/test-add-navigation-coverage`
