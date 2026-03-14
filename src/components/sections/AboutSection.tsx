import { about } from "../../content/about";
import { Section } from "../layout/Section";

export function AboutSection(): JSX.Element {
  return (
    <Section id="about" title="About" subtitle={about.subtitle}>
      <div className="space-y-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted leading-7">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {about.highlights.map((highlight) => (
          <article key={highlight} className="rounded-xl border border-border/80 bg-surface/70 px-4 py-3">
            <p className="text-sm text-text">{highlight}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
