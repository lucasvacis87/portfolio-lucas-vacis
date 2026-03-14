export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type HeroContent = {
  kicker: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

