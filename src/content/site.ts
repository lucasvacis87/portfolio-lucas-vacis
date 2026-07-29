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
  kicker: "QA Automation Lead · Quality Engineering · Test Architecture",
  title: "Quality systems that make delivery faster and release decisions clearer.",
  subtitle:
    "Quality Engineering leader with 8+ years building automation across web, APIs, and integrated services—combining hands-on TypeScript engineering, CI/CD quality gates, and AI-augmented delivery workflows.",
  proofPoints: [
    "Leading critical Cypress-to-Playwright migration and test architecture",
    "Building parallel CI execution and reliable release-quality signals",
    "Validating REST and GraphQL services through evidence-based risk assessment"
  ],
  chips: ["Playwright", "TypeScript", "REST / GraphQL", "CI/CD", "AI-Augmented QA"],
  primaryCta: { label: "View Engineering Work", href: "#repositories" },
  secondaryCta: { label: "Download Resume", href: "resume.pdf", download: "Lucas-Vacis-Resume.pdf" },
  microLine: undefined
};

export const siteMeta = {
  tagline: "Automation-First Quality Engineering",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
