import type { SandboxContent } from "../types/content";

export const sandbox: SandboxContent = {
  title: "QA Detection Sandbox",
  badge: "Live Tool",
  helperText: {
    manual: "Find and report the bugs manually.",
    automation: "Watch the system detect and report them automatically."
  },
  modes: {
    manual: "Manual Mode",
    automation: "Automation Mode"
  },
  statusLabels: {
    ready: "Awaiting input",
    scanning: "Scanning",
    detected: "Issue detected",
    reporting: "Reporting",
    complete: "Complete",
    bugReported: "Bug reported"
  },
  footerLabels: {
    mode: "Mode",
    bugsFound: "Bugs reported",
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
