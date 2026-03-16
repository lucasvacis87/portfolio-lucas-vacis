import type { HeroContent, NavigationItem } from "../types/content";

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Repositories", href: "#repositories" },
  { label: "Experience", href: "#experience" },
  { label: "QA + AI", href: "#vision" },
  { label: "Contact", href: "#contact" }
];

export const hero: HeroContent = {
  kicker: "Senior QA Automation Engineer \u00B7 AI-Assisted Quality Engineering",
  title: "Building scalable test automation, quality systems, and AI-assisted engineering workflows.",
  subtitle:
    "I design maintainable UI and API automation frameworks, CI-integrated quality workflows, and testing systems that help teams ship with confidence.",
  chips: ["Playwright", "Cypress", "TypeScript", "Jest", "API Testing", "CI/CD", "GitHub Actions", "AI Workflows", "Test Architecture", "CodeX", "Agents"],
  primaryCta: { label: "View Work", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
  tertiaryCta: { label: "Download Resume", href: "resume.pdf", download: "Lucas-Vacis-Resume.pdf" },
  microLine: "Focused on test architecture, reporting strategy, parallel execution, and modern QA systems."
};

export const siteMeta = {
  tagline: "Quality Engineering at Scale",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
