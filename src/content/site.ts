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
  systemsPanel: {
    title: "Reliable Systems Architecture",
    subtitle: "End-to-end quality signals designed for stable releases and fast engineering feedback.",
    lanes: [
      {
        title: "UI Reliability Layer",
        detail: "Deterministic selectors, resilient test design, and failure diagnostics teams can trust."
      },
      {
        title: "API Contract Layer",
        detail: "Version-aware API validation and risk-based coverage for service-level confidence."
      },
      {
        title: "CI Quality Gates",
        detail: "Pipeline guardrails that reduce flaky noise and protect release cadence."
      }
    ],
    footer: "Built to keep quality measurable, explainable, and actionable in real delivery workflows."
  },
  microLine: undefined
};

export const siteMeta = {
  tagline: "Automation-First Quality Engineering",
  copyright: `(c) ${new Date().getFullYear()} Lucas Vacis`
};
