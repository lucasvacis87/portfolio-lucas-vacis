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
  kicker: "QA Automation Engineer · AI-Oriented",
  title: "I build reliable test automation systems for fast, confident releases.",
  subtitle:
    "Quality strategy, automation architecture, and intelligent QA practices that improve delivery speed without sacrificing confidence.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" }
};

export const siteMeta = {
  tagline: "Testing Intelligence Layer",
  copyright: `© ${new Date().getFullYear()} Lucas Vacis`
};

