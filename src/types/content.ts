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
  tertiaryCta?: { label: string; href: string; download?: string };
  microLine?: string;
};

export type SandboxContent = {
  title: string;
  badge: string;
  helperText: {
    manual: string;
    automation: string;
  };
  modes: {
    manual: string;
    automation: string;
  };
  statusLabels: {
    ready: string;
    scanning: string;
    detected: string;
    reporting: string;
    complete: string;
    bugReported: string;
  };
  footerLabels: {
    mode: string;
    bugsFound: string;
    status: string;
    reset: string;
  };
  messageLabels: {
    bugReported: string;
  };
  metrics: {
    totalBugs: number;
  };
  timings: {
    scanMs: number;
    detectMs: number;
    reportMs: number;
    toastMs: number;
  };
};

export type EngineeringStackColumn = {
  title: string;
  accent: "blue" | "indigo" | "teal" | "purple";
  summary: string;
  items: string[];
};

export type Service = {
  title: string;
  description: string;
  managerLens: string;
};

export type ImpactAchievementItem = {
  metric: string;
  description: string;
};

export type ImpactAchievementsContent = {
  title: string;
  items: ImpactAchievementItem[];
};

export type ExperienceItem = {
  role: string;
  context: string;
  period: string;
  summary: string;
};

export type QAVisionPillar = {
  title: string;
  description: string;
};

export type QAVisionTrack = {
  title: string;
  points: string[];
};

export type QAVisionOutcome = {
  label: string;
  value: string;
};

export type RepositoryItem = {
  name: string;
  label: string;
  tone: "automation" | "frontend" | "product";
  priority: "featured" | "secondary";
  description: string;
  stack: string[];
  impact: string;
  links: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};
