import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    title: "Playwright Automation Framework",
    subtitle: "Production-ready E2E automation architecture",
    description:
      "A modern Playwright-based automation repository focused on maintainability, CI integration, parallel execution, and reliable reporting. Designed as a practical example of scalable UI automation with TypeScript and engineering-focused structure.",
    highlights: [
      "Playwright + TypeScript",
      "Parallel execution strategy",
      "CI-ready workflow",
      "Reporting and traceability",
      "Scalable project structure"
    ],
    stack: ["Playwright", "TypeScript", "GitHub Actions", "Reporting"],
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/playwright-repo" },
      secondary: { label: "View Report", href: "https://github.com/lucasvacis87/playwright-repo" }
    }
  },
  {
    title: "Portfolio Website",
    subtitle: "Personal brand website with modern frontend architecture",
    description:
      "A premium single-page portfolio built to present my professional profile with a modern technology aesthetic, modular frontend structure, motion-driven UI, and scalable content architecture.",
    highlights: [
      "React / TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GitHub Pages deployment",
      "Modular UI structure"
    ],
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/portfolio-lucas-vacis" },
      secondary: { label: "Live Site", href: "https://lucasvacis87.github.io/portfolio-lucas-vacis/" }
    }
  },
  {
    title: "Sweetly",
    subtitle: "Real-world e-commerce monorepo (backend + frontend)",
    description:
      "A real e-commerce project built for my mother's venture, delivered as a full-stack monorepo with integrated checkout and end-to-end product flow. The store later migrated to Tiendanube as a business platform decision.",
    highlights: [
      "Monorepo structure (back + front)",
      "Checkout-enabled e-commerce flow",
      "API and UI integration",
      "Production usage in a real business context",
      "Scalable project organization"
    ],
    stack: ["Monorepo", "Backend", "Frontend", "API Integration"],
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/sweetly" },
      secondary: { label: "Live Demo", href: "https://lucasvacis87.github.io/sweetly-website/" }
    }
  }
];
