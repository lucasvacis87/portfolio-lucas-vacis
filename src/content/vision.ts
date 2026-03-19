import type { QAVisionPrinciple } from "../types/content";

export const qaVision: {
  subtitle: string;
  headline: string;
  body: string;
  operatingNote: string;
  principles: QAVisionPrinciple[];
} = {
  subtitle: "Quality strategy for AI-accelerated delivery.",
  headline: "Velocity is easy to fake. Trust is engineered.",
  body: "I use AI to compress execution time, but production confidence comes from deterministic quality systems, explicit release criteria, and repeatable engineering decisions.",
  operatingNote: "AI increases throughput. QA protects truth.",
  principles: [
    {
      title: "Control Before Speed",
      description: "Acceleration is useful only when outcomes remain predictable."
    },
    {
      title: "Evidence Over Confidence",
      description: "Quality is proven by signals, gates, and reproducibility."
    },
    {
      title: "Systems Over Heroics",
      description: "Scalable workflows outperform one-off prompt wins."
    }
  ]
};
