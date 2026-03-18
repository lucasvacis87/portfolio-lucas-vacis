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

export type CapabilityNode = {
  id: string;
  name: string;
  description: string;
  position: {
    x: number;
    y: number;
  };
};

export type CapabilityConnection = {
  from: CapabilityNode["id"];
  to: CapabilityNode["id"];
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
