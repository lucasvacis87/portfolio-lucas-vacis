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
    title: "Cata Vinos",
    subtitle: "Product-oriented frontend project",
    description:
      "A web product project that demonstrates frontend implementation, UI structure, and product-focused delivery beyond QA-specific work, adding breadth to my engineering profile.",
    highlights: ["Frontend implementation", "Product UI thinking", "Responsive design", "Structured component approach"],
    stack: ["Frontend", "Responsive UI", "Component Architecture"],
    links: {
      primary: { label: "View Repository", href: "https://github.com/lucasvacis87/cata-vinos" },
      secondary: { label: "Live Demo", href: "https://github.com/lucasvacis87/cata-vinos" }
    }
  }
];
