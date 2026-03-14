import { skills } from "../../content/skills";
import { Section } from "../layout/Section";

export function SkillsSection(): JSX.Element {
  return (
    <Section id="skills" title="Skills" subtitle="Automation-first engineering toolbox.">
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((group) => (
          <article key={group.name} className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="font-heading text-lg">{group.name}</h3>
            <p className="muted mt-2 text-sm">{group.items.join(" · ")}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

