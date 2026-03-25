# AGENTS.md

## Project Purpose

This repository contains the personal portfolio website of Lucas Vacis, positioned as:
- Senior QA Automation Engineer
- SDET / Quality Engineering professional
- AI-assisted engineering practitioner

The site is production-facing and must communicate technical depth, credibility, and strategic impact.

## Core Goals

- Maintain a premium modern single-page experience
- Keep content concise, senior, and professionally defensible
- Preserve scalable frontend architecture
- Keep static deployment compatibility with GitHub Pages
- Balance visual richness with performance and accessibility

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- GitHub Actions + GitHub Pages

## Deployment Constraints

- Must remain statically deployable on GitHub Pages
- Do not introduce backend/server runtime requirements for core portfolio behavior
- Prefer static assets and frontend-safe integrations
- Keep `vite.config.ts` Pages-compatible base behavior intact

## Product and Brand Direction

- Dark premium technology aesthetic
- Black / charcoal foundation with subtle intelligent accents
- Professional, modern, strategic tone
- Emphasize:
  - automation architecture
  - UI/API quality engineering
  - CI/CD quality workflows
  - AI-assisted delivery

Avoid generic personal-brand copy, buzzword inflation, and unverifiable claims.

## UX and Interaction Rules

- Use purposeful motion (scroll reveal, subtle transitions, meaningful hover states)
- Preserve strong spacing rhythm and section hierarchy
- Avoid flat-looking cards/sections
- Prefer layered depth (gradient, glow, texture/grid) with restraint
- Maintain good readability and contrast in dark mode
- Keep responsive behavior solid on mobile and desktop

## Content Strategy Rules

- Keep structured content in `src/content/*`
- Keep type definitions aligned in `src/types/content.ts`
- UI components should render data, not hold large hardcoded copy
- Maintain curated sections:
  - Hero
  - About
  - Core Expertise
  - What I Bring
  - Featured Work
  - Featured Repositories
  - Experience
  - QA + AI
  - Contact

## Code Organization Rules

- Preserve modular section-based architecture in `src/components/sections/*`
- Keep shared layout primitives in `src/components/layout/*`
- Keep edits scoped to the requested objective
- Avoid unnecessary cross-cutting refactors
- Prefer maintainable implementations over quick hacks

## Featured Repositories Rules

Featured repositories are curated evidence, not an automated GitHub feed.

Prioritize repositories that support technical positioning, such as:
- `playwright-repo`
- `portfolio-lucas-vacis`
- `sweetly`

Do not use stars/forks as primary value indicators.

## Quality Checklist Before Finishing

- Project builds successfully (`npm run build`)
- No broken section anchors or CTA links
- Responsive layout still works
- Styling remains visually consistent
- GitHub Pages compatibility is preserved
- No dead code or unnecessary dependencies introduced

## Working Style for Codex

- For medium/large changes, outline a short plan before implementation
- Prefer targeted edits with clear intent
- Explain major structural decisions briefly
- Keep tone collaborative and practical
- If uncertain, choose the simplest production-safe option

## Future-Friendly Direction

Keep the codebase ready for:
- downloadable resume updates (`public/resume.pdf`)
- richer case studies
- optional multilingual content
- extended project detail pages
- optional blog/articles section

Any future work should preserve static deployability and current brand positioning.
