import { skills } from "../../content/skills";
import { Section } from "../layout/Section";

export function SkillsSection(): JSX.Element {
  return (
    <Section
      id="skills"
      title="Core Expertise"
      subtitle="Modern quality engineering, automation architecture, and AI-assisted delivery."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group) => (
          <article
            key={group.name}
            className="rounded-2xl border border-border/80 bg-surface/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35"
          >
            <h3 className="font-heading text-lg">{group.name}</h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="muted text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="muted mt-6 max-w-3xl text-sm md:text-base">
        My focus is not only on automating tests, but on building automation that teams can trust, scale, and evolve.
      </p>
    </Section>
  );
}
