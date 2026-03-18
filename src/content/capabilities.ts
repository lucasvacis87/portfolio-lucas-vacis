import type { CapabilityConnection, CapabilityNode } from "../types/content";

export const capabilityNodes: CapabilityNode[] = [
  {
    id: "test-architecture",
    name: "Test Architecture",
    description: "Designing scalable, maintainable automation frameworks and system-level testing structures.",
    position: { x: 18, y: 14 }
  },
  {
    id: "ui-automation",
    name: "UI Automation",
    description: "Building resilient UI automation with reliable selectors, reusable patterns, and high-signal scenarios.",
    position: { x: 78, y: 14 }
  },
  {
    id: "api-testing",
    name: "API Testing",
    description: "Validating service behavior through contract-aware checks, data integrity workflows, and backend confidence.",
    position: { x: 20, y: 50 }
  },
  {
    id: "ci-parallel-execution",
    name: "CI & Parallel Execution",
    description: "Structuring fast, deterministic pipelines with parallel execution and actionable quality gates.",
    position: { x: 80, y: 50 }
  },
  {
    id: "ai-assisted-qa",
    name: "AI-Assisted QA",
    description: "Using AI to accelerate test design, implementation, and debugging while preserving engineering rigor.",
    position: { x: 50, y: 31 }
  }
];

export const capabilityConnections: CapabilityConnection[] = [
  { from: "test-architecture", to: "ui-automation" },
  { from: "test-architecture", to: "api-testing" },
  { from: "test-architecture", to: "ci-parallel-execution" },
  { from: "ui-automation", to: "ci-parallel-execution" },
  { from: "api-testing", to: "ci-parallel-execution" },
  { from: "ai-assisted-qa", to: "test-architecture" },
  { from: "ai-assisted-qa", to: "ui-automation" },
  { from: "ai-assisted-qa", to: "api-testing" },
  { from: "ai-assisted-qa", to: "ci-parallel-execution" }
];

export const defaultActiveCapability = "test-architecture";
