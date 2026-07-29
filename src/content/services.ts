import type { Service } from "../types/content";

export const services: Service[] = [
  {
    title: "Quality Strategy & Prioritization",
    description: "Set automation strategy and risk-based validation around product and release impact.",
    managerLens: "Align teams on critical coverage, evidence, and release confidence."
  },
  {
    title: "Release Risk Governance",
    description: "Design CI/CD quality gates across pull requests, preview environments, and staging.",
    managerLens: "Turn release readiness into a reliable engineering signal."
  },
  {
    title: "Test Architecture Stewardship",
    description: "Build maintainable UI and API test architecture with reusable fixtures, page objects, and conventions.",
    managerLens: "Preserve delivery speed without sacrificing long-term suite health."
  },
  {
    title: "Technical Enablement & Standards",
    description: "Establish engineering standards, mentoring, and AI-assisted workflows with practical guardrails.",
    managerLens: "Scale quality outcomes across teams while keeping review and validation explicit."
  }
];
