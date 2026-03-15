import { about } from "../../content/about";
import { Section } from "../layout/Section";
import qaSignalMesh from "../../assets/visuals/qa-signal-mesh.svg";

export function AboutSection(): JSX.Element {
  return (
    <Section id="about" title="About" subtitle={about.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="muted leading-7">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface/70">
          <img src={qaSignalMesh} alt="Abstract QA signal mesh visualization" className="h-full w-full object-cover opacity-90" loading="lazy" />
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {about.highlights.map((highlight) => (
          <article
            key={highlight}
            className="rounded-xl border border-border/80 bg-surface/70 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-glow"
          >
            <p className="text-sm text-text">{highlight}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
