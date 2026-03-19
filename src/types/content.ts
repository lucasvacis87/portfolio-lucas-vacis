export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type HeroContent = {
  kicker: string;
  title: string;
  subtitle: string;
  proofPoints: string[];
  chips: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; download?: string };
  systemsPanel: {
    title: string;
    subtitle: string;
    lanes: { title: string; detail: string }[];
    footer: string;
  };
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
};

export type ExperienceItem = {
  role: string;
  context: string;
  period: string;
  summary: string;
};

export type QAVisionPrinciple = {
  title: string;
  description: string;
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

export type ContactAction = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  download?: string;
  ariaLabel?: string;
  tone: "primary" | "secondary";
  icon: "mail" | "linkedin" | "github" | "resume";
};

export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type ContactContent = {
  title: string;
  subtitle: string;
  body: string;
  availabilityNote: string;
  closing: string;
  actions: ContactAction[];
  details: ContactDetail[];
};
