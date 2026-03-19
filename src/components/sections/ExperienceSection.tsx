import { experience, experienceIntro } from "../../content/experience";
import { Section } from "../layout/Section";

export function ExperienceSection(): JSX.Element {
  return (
    <Section id="experience" variant="flow" accent="aqua" headerAlign="center" title="Experience" subtitle={experienceIntro.subtitle}>
      <div className="space-y-4">
        {experienceIntro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted leading-7">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-7 space-y-4">
        {experience.map((item) => (
          <article
            key={`${item.role}-${item.period}`}
            className="surface-card rounded-2xl bg-[#111722]/86 px-5 py-4 transition duration-300 hover:shadow-[0_16px_34px_rgba(0,0,0,0.3),0_0_20px_rgba(55,208,201,0.07)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg">{item.role}</h3>
                <p className="muted mt-1 text-sm">{item.context}</p>
              </div>
              <span className="surface-chip rounded-md bg-bg/45 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                {item.period}
              </span>
            </div>
            <p className="muted mt-3 text-sm leading-6">{item.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
