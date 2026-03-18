import { experience, experienceIntro } from "../../content/experience";
import { Section } from "../layout/Section";

export function ExperienceSection(): JSX.Element {
  return (
    <Section id="experience" variant="flow" accent="aqua" title="Experience" subtitle={experienceIntro.subtitle}>
      <div className="space-y-4">
        {experienceIntro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted leading-7">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {experience.map((item, index) => (
          <article key={item.title} className="relative border-l border-border/75 pl-4">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent/85 shadow-[0_0_12px_rgba(55,208,201,0.35)]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent/80">Track {String(index + 1).padStart(2, "0")}</p>
            <p className="mt-1 text-sm leading-6 text-text">{item.title}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
