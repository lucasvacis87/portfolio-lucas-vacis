import type { HeroContent, NavigationItem } from "../types/content";

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#engineering-capabilities" },
  { label: "Repositories", href: "#repositories" },
  { label: "Experience", href: "#experience" },
  { label: "QA + AI", href: "#vision" },
  { label: "Contact", href: "#contact" }
];

export const hero: HeroContent = {
  kicker: "Senior QA Automation Engineer · AI-Assisted Quality Systems",
  title: "Building automation systems teams actually trust.",
  subtitle: "From flaky tests to reliable feedback systems.\nCI-ready automation, real confidence at scale.",
  chips: ["Playwright", "TypeScript", "API Testing", "CI/CD", "AI Workflows"],
  primaryCta: { label: "View Work", href: "#repositories" },
  secondaryCta: { label: "Contact", href: "#contact" },
  tertiaryCta: { label: "Resume", href: "resume.pdf", download: "Lucas-Vacis-Resume.pdf" },
  microLine: undefined
};

export const siteMeta = {
  tagline: "Automation-First Quality Engineering",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
