import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" title="QA + AI" subtitle={qaVision.subtitle}>
      <p className="muted leading-7">{qaVision.body}</p>
      <p className="muted mt-4 leading-7">{qaVision.body2}</p>
      <p className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-heading text-sm text-text">{qaVision.emphasis}</p>
    </Section>
  );
}
