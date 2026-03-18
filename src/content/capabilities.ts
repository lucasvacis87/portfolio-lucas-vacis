import type { EngineeringStackColumn } from "../types/content";

export const engineeringStackColumns: EngineeringStackColumn[] = [
  {
    title: "UI Automation",
    accent: "blue",
    summary: "Playwright · Cypress\nComponent testing · E2E strategy",
    items: ["Playwright", "Cypress", "Testing Library", "Component testing"]
  },
  {
    title: "API & Data",
    accent: "indigo",
    summary: "REST / GraphQL · Contract testing\nData management · Mocking strategy",
    items: ["REST / GraphQL", "Contract testing", "Test data management", "Mocking strategies"]
  },
  {
    title: "CI/CD & Infrastructure",
    accent: "teal",
    summary: "GitHub Actions · Parallel execution\nPR environments · Test pipelines",
    items: ["GitHub Actions", "Parallel execution", "PR environments", "Test pipelines"]
  },
  {
    title: "AI & Productivity",
    accent: "purple",
    summary: "AI-assisted generation · Debugging\nCode automation · Quality insights",
    items: ["AI-assisted test generation", "Debugging workflows", "Code automation", "Quality insights"]
  }
];
