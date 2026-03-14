export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type HeroContent = {
  kicker: string;
  title: string;
  subtitle: string;
  chips: string[];
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
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export type ExperienceItem = {
  title: string;
};

export type RepositoryItem = {
  name: string;
  label: string;
  description: string;
  stack: string[];
  demonstrates: string;
  links: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};
