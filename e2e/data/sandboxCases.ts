import { createSandboxCases } from "./contracts";

export const sandboxCases = createSandboxCases("sandboxCases", {
  progress: {
    initial: "0/8",
    firstBug: "1/8",
    completed: "8/8"
  },
  status: {
    bugReported: "Bug reported",
    scanning: "Scanning",
    completed: "Complete"
  },
  mode: {
    automation: "Automation Mode"
  },
  timeoutMs: {
    completion: 25000
  }
} as const);
