# Portfolio Lucas Vacis

Single-page premium dark portfolio for a QA Automation Engineer with AI-oriented positioning.

## Stack

- Vite
- React 18
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- GitHub Actions + GitHub Pages

## Project structure

```txt
.
|-- .github
|   |-- CODEOWNERS
|   |-- pull_request_template.md
|   `-- workflows
|       |-- auto-open-pr.yml
|       |-- ci.yml
|       `-- deploy-pages.yml
|-- src
|   |-- app
|   |-- components
|   |-- content
|   `-- types
|-- index.html
|-- package.json
|-- tailwind.config.ts
`-- vite.config.ts
```

## Local development

1. `npm install`
2. `npm run dev`
3. `npm run build`
4. `npm test`

## Branch naming

Use one topic branch per change and keep branch names short, explicit, and PR-friendly.

- Preferred prefixes:
  - `codex/feat-...`
  - `codex/fix-...`
  - `codex/chore-...`
  - `codex/content-...`
  - `codex/test-...`
- Recommended style:
  - lowercase
  - words separated with hyphens
  - one branch per topic
  - avoid generic names like `update`, `changes`, or `new-branch`
- Examples:
  - `codex/fix-page-containers`
  - `codex/feat-add-qa-ai-section`
  - `codex/content-refresh-hero-copy`
  - `codex/chore-improve-pages-workflow`
  - `codex/test-add-sandbox-machine-cases`

## Content and UI conventions

- Keep structured content in `src/content/*`
- Keep type contracts in `src/types/content.ts`
- Prefer UI components that render data instead of holding large hardcoded copy
- Keep section-based architecture in `src/components/sections/*`
- Keep shared layout primitives in `src/components/layout/*`

## GitHub workflow model

This repository is set up to work with pull requests first and deploy only after merge to `main`.

- `Auto Open PR` workflow:
  - triggers on pushes to non-`main` branches in this repository
  - creates a draft pull request to `main` if the branch does not already have one
  - gives every remote topic branch its own PR automatically
  - starts on the first push to the remote branch, not on local branch creation
- `CI` workflow:
  - triggers on pull requests to `main`
  - also validates pushes to `main`
  - runs `npm ci`, `npm run build`, and `npm test`
  - exposes the stable required check `CI / build-and-test`
- `Deploy` workflow:
  - triggers on pushes to `main`
  - builds the site and deploys `dist` to GitHub Pages
  - does not run on pull requests
  - exposes the deploy check `Deploy / github-pages`

## Recommended repository settings

Apply these settings on GitHub for a professional PR-based flow:

- Protect `main`
- Require a pull request before merging
- Require status checks to pass before merging
- Require the `CI / build-and-test` check
- Require branches to be up to date before merging
- Require conversation resolution before merging
- Require one code owner approval before merging
- Allow only squash merges
- Disable merge commits and rebase merges

## GitHub Pages compatibility

- The site remains statically deployable
- `vite.config.ts` keeps Pages-safe dynamic `base` behavior in GitHub Actions
- The deploy artifact continues to come from `dist`

## Next phase

- Expand unit and content validation coverage
- Add Playwright-based UI automation in a separate PR workflow
- Keep deploy isolated from future UI automation jobs
