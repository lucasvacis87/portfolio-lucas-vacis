# Portfolio Lucas Vacis

Single-page premium dark portfolio for a QA Automation Engineer with AI-oriented positioning.

## Final stack

- Vite
- React 18
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- GitHub Actions + GitHub Pages

## Folder structure

```txt
.
├── .github/workflows/deploy-pages.yml
├── src
│   ├── app
│   ├── components
│   │   ├── layout
│   │   └── sections
│   ├── content
│   └── types
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## Base app initialization plan

1. `npm install`
2. `npm run dev`
3. Replace placeholder content in `src/content/*`
4. Expand section internals without breaking typed content contracts

## Design tokens strategy

- Tokens live in `src/app/styles.css` as CSS variables (`--color-*`)
- Tailwind maps semantic names to variables in `tailwind.config.ts`
- All components consume semantic classes (`bg-surface`, `text-muted`, `border-border`)
- Keep motion timings and larger token sets centralized in a future `src/config` phase

## Section/component architecture

- `app/App.tsx` composes all sections in expected order
- Shared structure via `components/layout/Section.tsx`
- Section files in `components/sections/*`
- Core layout elements in `components/layout/*`

## Content organization

- Content files in `src/content/*`
- Types in `src/types/content.ts`
- UI components only render typed data (avoid hardcoding product copy in components)

## GitHub Pages deployment workflow

- Workflow file: `.github/workflows/deploy-pages.yml`
- Builds static artifact with `npm run build`
- Deploys `dist` through official Pages actions
- `vite.config.ts` sets `base` dynamically in GitHub Actions from repository name

## Codex collaboration conventions

- Keep strict TypeScript enabled
- One section per file, one concern per component
- Prefer content edits in `src/content/*`
- Keep component APIs small and typed
- Use semantic token classes over hardcoded colors
- Use conventional commits:
  - `feat(section): ...`
  - `style(theme): ...`
  - `chore(deploy): ...`

## Next phase focus

- Build richer cards and timeline components
- Add smooth in-page navigation state
- Add SEO metadata and Open Graph image
- Add accessibility passes and reduced-motion handling
