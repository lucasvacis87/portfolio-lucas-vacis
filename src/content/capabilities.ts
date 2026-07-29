import type { EngineeringStackColumn } from "../types/content";

export const engineeringStackColumns: EngineeringStackColumn[] = [
  {
    title: "UI Automation",
    accent: "blue",
    summary: "Playwright · Cypress\nTypeScript · Jest",
    items: ["Playwright", "Cypress", "TypeScript", "Jest", "Reusable fixtures & page objects"]
  },
  {
    title: "API Quality",
    accent: "teal",
    summary: "REST · GraphQL · Postman\nIntegration testing · Test data",
    items: ["REST and GraphQL", "Postman", "API integration testing", "Cucumber", "Test data management"]
  },
  {
    title: "CI/CD & Infrastructure",
    accent: "violet",
    summary: "GitHub Actions · Parallel execution\nPR, preview, and staging quality gates",
    items: ["GitHub Actions", "Parallel execution", "Quality gates", "CI diagnostics", "Release readiness"]
  },
  {
    title: "Technical Leadership & AI",
    accent: "amber",
    summary: "Automation strategy · Mentoring\nCodex · Copilot · Guardrails",
    items: ["Engineering standards", "Risk-based testing", "OpenAI Codex & GitHub Copilot", "Agentic QA workflows", "Evidence-driven reporting"]
  }
];
