import { experience, experienceIntro } from "../../content/experience";
import { Section } from "../layout/Section";

export function ExperienceSection(): JSX.Element {
  return (
    <Section id="experience" title="Experience" subtitle={experienceIntro.subtitle}>
      <div className="space-y-4">
        {experienceIntro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted leading-7">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {experience.map((item) => (
          <article key={item.title} className="rounded-xl border border-border/80 bg-surface/70 px-4 py-3">
            <p className="text-sm text-text">{item.title}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
