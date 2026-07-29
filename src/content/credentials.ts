import type { CredentialsContent } from "../types/content";

export const credentials: CredentialsContent = {
  title: "Professional Development & Credentials",
  subtitle: "Continuous learning grounded in quality engineering, AI-assisted delivery, and clear communication across teams.",
  groups: [
    {
      title: "Professional Development",
      items: [
        { label: "AI Engineering", value: "Henry", detail: "In progress · Jul 2026 – Sep 2026" },
        { label: "Claude Code in Action", value: "Anthropic Academy", detail: "Completed 2026" },
        { label: "Cypress with TypeScript", value: "Test Automation University" }
      ]
    },
    {
      title: "Education",
      items: [{ label: "Information Technology studies", value: "Escuela Argentina de Negocios", detail: "2019 – 2021 · Degree incomplete" }]
    },
    {
      title: "Languages",
      items: [
        { label: "Spanish", value: "Native" },
        { label: "English", value: "C1 Advanced / Professional working proficiency" }
      ]
    }
  ]
};
