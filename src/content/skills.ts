import type { SkillGroup } from "../types/content";

export const skills: SkillGroup[] = [
  {
    name: "Test Automation",
    items: [
      "End-to-end test automation",
      "UI automation frameworks",
      "API test automation",
      "Cross-browser testing",
      "Regression strategy",
      "Stable selector strategy",
      "Maintainable test design"
    ]
  },
  {
    name: "Architecture & Quality Engineering",
    items: [
      "Test framework architecture",
      "Scalable automation design",
      "Page Object Model and modern alternatives",
      "Reusable fixtures and utilities",
      "Environment-aware test configuration",
      "Quality process improvement",
      "Shift-left quality practices"
    ]
  },
  {
    name: "CI/CD & Execution Strategy",
    items: [
      "GitHub Actions integration",
      "Parallel test execution",
      "Concurrency-aware execution strategy",
      "Pipeline reliability improvements",
      "Quality gates in delivery workflows",
      "Test run optimization",
      "Failure analysis and debugging support"
    ]
  },
  {
    name: "API & Backend Validation",
    items: [
      "API testing with Jest and TypeScript",
      "Request/response validation",
      "Contract and integration-oriented validation",
      "Data setup and cleanup strategies",
      "Auth/session-aware test flows",
      "Backend verification for frontend quality"
    ]
  },
  {
    name: "Reporting & Observability",
    items: [
      "Test reporting strategy",
      "Actionable failure visibility",
      "Public report publishing",
      "CI reporting workflows",
      "Traceability between failures and features",
      "Better signal for engineering teams"
    ]
  },
  {
    name: "AI-Assisted Engineering",
    items: [
      "Codex-assisted implementation workflows",
      "GitHub Copilot-assisted development",
      "AI-supported test design",
      "AI-enhanced QA productivity",
      "Intelligent documentation generation",
      "Workflow acceleration with AI tools"
    ]
  }
];
