import { ExternalLink } from "lucide-react";
import { repositories } from "../../content/repositories";
import { Section } from "../layout/Section";

export function RepositoriesSection(): JSX.Element {
  return (
    <Section
      id="repositories"
      variant="flow"
      accent="indigo"
      title="Featured Repositories"
      subtitle="Selected repositories that reflect how I build, structure, and scale engineering work."
    >
      <div className="space-y-5">
        {repositories.map((repo) => (
          <article
            key={repo.name}
            className="border-b border-border/70 pb-5 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-mono text-sm text-text md:text-base">{repo.name}</h3>
              <span className="rounded-full border border-border/70 bg-bg/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-accent">
                {repo.label}
              </span>
            </div>
            <p className="muted mt-3 text-sm leading-6">{repo.description}</p>
            <p className="mt-3 text-sm text-text">{repo.demonstrates}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {repo.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-border/70 bg-bg/45 px-2.5 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-text transition duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href={repo.links.primary.href}
                target="_blank"
                rel="noreferrer"
              >
                {repo.links.primary.label}
                <ExternalLink size={13} />
              </a>
              <a
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href={repo.links.secondary.href}
                target="_blank"
                rel="noreferrer"
              >
                {repo.links.secondary.label}
                <ExternalLink size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
