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
    name: "cata-vinos",
    label: "Product Implementation",
    description:
      "A product-oriented frontend project that demonstrates UI execution, structure, and delivery beyond QA-focused repositories.",
    stack: ["Frontend", "UI", "Responsive Design"],
    demonstrates: "Breadth in product implementation and interface quality beyond automation work.",
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/cata-vinos" },
      secondary: { label: "Live Demo", href: "https://github.com/lucasvacis87/cata-vinos" }
    }
  }
];
