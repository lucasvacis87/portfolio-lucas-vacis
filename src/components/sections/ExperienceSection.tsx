import { experience } from "../../content/experience";
import { Section } from "../layout/Section";

export function ExperienceSection(): JSX.Element {
  return (
    <Section id="experience" title="Experience" subtitle="Quality leadership and delivery impact.">
      <div className="space-y-4">
        {experience.map((role) => (
          <article key={role.role + role.company} className="rounded-2xl border border-border bg-surface/70 p-4">
            <p className="font-heading">
              {role.role} · <span className="text-accent">{role.company}</span>
            </p>
            <p className="muted mt-1 text-sm">{role.period}</p>
            <p className="muted mt-2 text-sm">{role.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

