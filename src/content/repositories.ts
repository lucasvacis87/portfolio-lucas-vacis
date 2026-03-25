import type { RepositoryItem } from "../types/content";

export const repositories: RepositoryItem[] = [
  {
    name: "playwright-repo",
    label: "Automation",
    tone: "automation",
    priority: "featured",
    description: "Production-grade Playwright architecture built for maintainable UI and API coverage, CI execution, and fast defect signal.",
    stack: ["Playwright", "TypeScript", "CI", "Reporting"],
    impact: "Shows how I structure automation as an engineering system, not a pile of tests: reusable patterns, reliable reporting, and CI-friendly execution.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/playwright-repo" },
      secondary: { label: "Open Project", href: "https://github.com/lucasvacis87/playwright-repo" }
    }
  },
  {
    name: "portfolio-lucas-vacis",
    label: "Automation",
    tone: "automation",
    priority: "secondary",
    description: "Portfolio built as a quality-engineering project with layered testing, Playwright smoke coverage, CI evidence, and custom reporting.",
    stack: ["Playwright", "CI", "Reporting", "React"],
    impact: "Automation-first delivery with unit, component, and E2E coverage, plus failure triage artifacts.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/portfolio-lucas-vacis" },
      secondary: { label: "Live Site", href: "https://lucasvacis87.github.io/portfolio-lucas-vacis/" }
    }
  },
  {
    name: "sweetly",
    label: "Monorepo",
    tone: "product",
    priority: "secondary",
    description: "End-to-end commerce codebase connecting product flows, API integration, and full-stack delivery.",
    stack: ["Monorepo", "Backend", "Frontend", "API"],
    impact: "Reflects product-minded delivery across architecture, integration boundaries, and execution detail.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/sweetly" },
      secondary: { label: "Open Project", href: "https://lucasvacis87.github.io/sweetly-website/" }
    }
  }
];
