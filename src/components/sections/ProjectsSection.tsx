import { ExternalLink } from "lucide-react";
import { projects } from "../../content/projects";
import { Section } from "../layout/Section";

export function ProjectsSection(): JSX.Element {
  return (
    <Section
      id="projects"
      title="Featured Work"
      subtitle="Selected work focused on automation, engineering quality, and modern technical execution."
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(55,208,201,0.17),transparent_40%)]" />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">{project.subtitle}</p>
              <h3 className="mt-2 font-heading text-xl">{project.title}</h3>
              <p className="muted mt-3 text-sm leading-6">{project.description}</p>
              <ul className="mt-4 space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="muted text-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-border/80 bg-bg/65 px-2.5 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-text transition hover:shadow-glow"
                  href={project.links.primary.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.links.primary.label}
                  <ExternalLink size={13} />
                </a>
                <a
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-text"
                  href={project.links.secondary.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.links.secondary.label}
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
