import type { HeroContent, NavigationItem } from "../types/content";

export const navigationItems: NavigationItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" }
];

export const hero: HeroContent = {
  kicker: "Senior QA Automation Engineer | SDET | AI-Assisted Quality Engineering",
  title: "I build scalable quality engineering systems for fast, confident product delivery.",
  subtitle:
    "7+ years driving automation strategy across web, API, and integrated systems with Cypress, TypeScript, Jest, GraphQL, and CI/CD quality gates.",
  primaryCta: { label: "View Experience", href: "#experience" },
  secondaryCta: { label: "Contact Me", href: "#contact" }
};

export const siteMeta = {
  tagline: "Quality Engineering at Scale",
  copyright: `© ${new Date().getFullYear()} Lucas Vacis`
};
