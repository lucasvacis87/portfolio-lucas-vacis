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
  kicker: "Senior QA Automation Engineer | AI-Assisted Quality Engineering",
  title: "Building scalable test automation, quality systems, and modern QA workflows powered by AI.",
  subtitle:
    "I design and implement automation frameworks, E2E and API testing strategies, CI-integrated quality workflows, and AI-assisted engineering practices that help teams ship faster with more confidence.",
  chips: ["Playwright", "Cypress", "TypeScript", "API Testing", "CI/CD", "Test Architecture", "AI Workflows"],
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" }
};

export const siteMeta = {
  tagline: "Quality Engineering at Scale",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
