import { projects } from "../../content/projects";
import { Section } from "../layout/Section";

export function ProjectsSection(): JSX.Element {
  return (
    <Section id="projects" title="Projects" subtitle="Selected QA automation and reliability initiatives.">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-2xl border border-border bg-surface/70 p-4">
            <h3 className="font-heading">{project.title}</h3>
            <p className="muted mt-2 text-sm">{project.description}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-2">
              {project.stack.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

