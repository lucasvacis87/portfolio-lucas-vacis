import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" variant="panel" accent="indigo" title="QA + AI" subtitle={qaVision.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="muted leading-7">{qaVision.body}</p>
          <p className="muted mt-4 leading-7">{qaVision.body2}</p>
          <p className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-heading text-sm text-text">{qaVision.emphasis}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-[radial-gradient(circle_at_22%_24%,rgba(91,140,255,0.2),transparent_38%),radial-gradient(circle_at_78%_74%,rgba(55,208,201,0.2),transparent_40%),linear-gradient(150deg,rgba(18,22,27,0.92),rgba(10,14,19,0.88))]">
          <div className="h-full min-h-[210px] bg-[linear-gradient(rgba(155,167,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.08)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        </div>
      </div>
    </Section>
  );
}
