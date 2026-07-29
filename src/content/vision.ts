import type { QAVisionPrinciple } from "../types/content";

export const qaVision: {
  subtitle: string;
  headline: string;
  body: string;
  operatingNote: string;
  principles: QAVisionPrinciple[];
} = {
  subtitle: "AI-augmented workflows with engineering controls that teams can trust.",
  headline: "AI accelerates execution. Evidence protects the release.",
  body: "I use Codex and Copilot for repository analysis, test implementation, code review, CI diagnostics, staging validation, and pull-request delivery—then validate changes through review, automated tests, staging, and CI.",
  operatingNote: "Acceleration is useful when quality signals stay explicit and repeatable.",
  principles: [
    {
      title: "Guardrails Before Scale",
      description: "Reusable architecture and review standards keep AI-assisted changes maintainable and aligned with the test system."
    },
    {
      title: "Evidence Over Assumption",
      description: "Code review, automated tests, staging validation, and CI diagnostics turn accelerated work into release evidence."
    },
    {
      title: "Systems Over One-Offs",
      description: "Agentic workflows, quality gates, and evidence-driven reporting make the practice reusable across teams."
    }
  ]
};
