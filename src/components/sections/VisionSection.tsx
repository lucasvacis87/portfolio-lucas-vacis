import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";
import aiOrbit from "../../assets/visuals/ai-orbit.svg";

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" title="QA + AI" subtitle={qaVision.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="muted leading-7">{qaVision.body}</p>
          <p className="muted mt-4 leading-7">{qaVision.body2}</p>
          <p className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 font-heading text-sm text-text">{qaVision.emphasis}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface/70">
          <img src={aiOrbit} alt="Abstract AI-assisted quality orchestration orbit" className="h-full w-full object-cover opacity-90" loading="lazy" />
        </div>
      </div>
    </Section>
  );
}
