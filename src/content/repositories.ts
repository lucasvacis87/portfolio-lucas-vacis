import type { RepositoryItem } from "../types/content";

export const repositories: RepositoryItem[] = [
  {
    name: "playwright-repo",
    label: "Automation Architecture",
    description:
      "A practical example of modern test automation design using Playwright, TypeScript, CI workflows, parallel execution, and reporting strategy.",
    stack: ["Playwright", "TypeScript", "CI", "Reporting"],
    demonstrates: "How I structure scalable automation with engineering-level maintainability.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/playwright-repo" },
      secondary: { label: "Open Project", href: "https://github.com/lucasvacis87/playwright-repo" }
    }
  },
  {
    name: "portfolio-lucas-vacis",
    label: "Frontend Delivery",
    description:
      "The repository behind this portfolio, built with a modular frontend architecture, premium UI direction, and scalable content structure.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    demonstrates: "How I present technical positioning with clean architecture and production-ready delivery.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/portfolio-lucas-vacis" },
      secondary: { label: "Live Site", href: "https://lucasvacis87.github.io/portfolio-lucas-vacis/" }
    }
  },
  {
    name: "sweetly",
    label: "Full-Stack Monorepo",
    description:
      "A real e-commerce project for my mother's venture, built as a backend + frontend monorepo with checkout and complete purchase flow.",
    stack: ["Monorepo", "Backend", "Frontend", "API Integration"],
    demonstrates:
      "How I deliver production-ready commerce flows end-to-end, from architecture to execution; later migrated to Tiendanube for platform operations.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/sweetly" },
      secondary: { label: "Live Demo", href: "https://lucasvacis87.github.io/sweetly-website/" }
    }
  }
];
