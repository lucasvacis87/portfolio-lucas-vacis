import type { HeroContent, NavigationItem } from "../types/content";

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Impact", href: "#impact" },
  { label: "Experience", href: "#experience" },
  { label: "Engineering Stack", href: "#engineering-capabilities" },
  { label: "What I Bring", href: "#services" },
  { label: "Repositories", href: "#repositories" },
  { label: "QA + AI", href: "#vision" },
  { label: "Contact", href: "#contact" }
];

export const hero: HeroContent = {
  kicker: "Senior QA Automation Engineer · AI-Assisted Quality Engineering",
  title: "Automation is easy to write. Reliable systems are hard to build.",
  subtitle:
    "Senior QA Automation Engineer (SDET) designing scalable UI & API testing systems, CI pipelines, and production-ready quality engineering workflows.",
  proofPoints: [
    "Reduced flakiness and stabilized CI pipelines at scale",
    "Built automation frameworks used across multiple teams",
    "Focused on reliability, speed, and real engineering impact"
  ],
  chips: ["Playwright", "TypeScript", "API Testing", "CI/CD", "Quality Engineering"],
  primaryCta: { label: "View Engineering Work", href: "#repositories" },
  secondaryCta: { label: "Download Resume", href: "resume.pdf", download: "Lucas-Vacis-Resume.pdf" },
  microLine: undefined
};

export const siteMeta = {
  tagline: "Automation-First Quality Engineering",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
