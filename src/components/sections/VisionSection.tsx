import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" title="QA + AI Vision" subtitle={qaVision.subtitle}>
      <p className="muted leading-7">{qaVision.body}</p>
    </Section>
  );
}

