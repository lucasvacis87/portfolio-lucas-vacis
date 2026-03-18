import type { QAVisionOutcome, QAVisionPillar, QAVisionTrack } from "../types/content";

export const qaVision: {
  subtitle: string;
  headline: string;
  body: string;
  operatingNote: string;
  pillars: QAVisionPillar[];
  tracks: QAVisionTrack[];
  outcomes: QAVisionOutcome[];
} = {
  subtitle: "A pragmatic operating model where AI accelerates delivery and QA engineering keeps confidence measurable.",
  headline: "QA + AI as a Delivery System",
  body: "I apply AI where it removes friction in test design, triage, and communication, while automation architecture and quality gates preserve reliability at release time.",
  operatingNote: "Speed without quality discipline scales risk. AI works best when paired with repeatable QA systems.",
  pillars: [
    {
      title: "Engineering Rigor",
      description: "Versioned frameworks, deterministic suites, and CI quality gates that keep signal trustworthy."
    },
    {
      title: "AI-Augmented Execution",
      description: "AI support for repetitive implementation work, scenario drafting, and faster quality decision loops."
    },
    {
      title: "Shared Quality Language",
      description: "Clear artifacts, triage narratives, and risk framing aligned with engineering and product stakeholders."
    }
  ],
  tracks: [
    {
      title: "Where AI Adds Value",
      points: [
        "Scenario expansion from existing regression intent",
        "Defect report drafting with reproducible context",
        "Fast synthesis of noisy execution outputs"
      ]
    },
    {
      title: "Where QA Owns Control",
      points: [
        "Coverage strategy and release readiness criteria",
        "Suite architecture, stability, and flakiness controls",
        "CI gates, environment parity, and risk sign-off"
      ]
    }
  ],
  outcomes: [
    { label: "Delivery", value: "Faster feedback loops with fewer blind spots" },
    { label: "Reliability", value: "Higher trust in automation signals for go/no-go decisions" },
    { label: "Collaboration", value: "Cleaner QA-dev-product alignment on quality risk" }
  ]
};
