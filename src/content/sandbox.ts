import type { SandboxContent } from "../types/content";

export const sandbox: SandboxContent = {
  title: "Interactive QA Sandbox",
  badge: "QA",
  helperText: {
    manual: "Find and report the bugs yourself.",
    automation: "Watch the system detect and report issues automatically."
  },
  modes: {
    manual: "Manual Mode",
    automation: "Automation Mode"
  },
  statusLabels: {
    ready: "Ready",
    scanning: "Scanning...",
    detected: "Issue detected",
    reporting: "Reporting issues",
    complete: "Complete",
    bugReported: "Bug reported"
  },
  footerLabels: {
    mode: "Mode",
    bugsFound: "Bugs found",
    status: "Status",
    reset: "Reset"
  },
  messageLabels: {
    bugReported: "Bug reported"
  },
  metrics: {
    totalBugs: 8
  },
  timings: {
    scanMs: 680,
    detectMs: 420,
    reportMs: 460,
    toastMs: 900
  }
};
