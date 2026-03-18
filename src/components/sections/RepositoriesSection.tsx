import { ExternalLink } from "lucide-react";
import { repositories } from "../../content/repositories";
import { Section } from "../layout/Section";

export function RepositoriesSection(): JSX.Element {
  return (
    <Section
      id="repositories"
      title="Featured Repositories"
      subtitle="Selected repositories that reflect how I build, structure, and scale engineering work."
    >
      <div className="mb-5 overflow-hidden rounded-2xl border border-border/80 bg-[radial-gradient(circle_at_18%_20%,rgba(91,140,255,0.2),transparent_36%),radial-gradient(circle_at_86%_78%,rgba(55,208,201,0.18),transparent_40%),linear-gradient(145deg,rgba(17,22,29,0.92),rgba(10,14,19,0.9))]">
        <div className="h-40 w-full bg-[linear-gradient(rgba(155,167,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-75 md:h-48" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {repositories.map((repo) => (
          <article
            key={repo.name}
            className="rounded-2xl border border-border/80 bg-surface/75 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent-2/45 hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-mono text-sm text-text">{repo.name}</h3>
              <span className="rounded-full border border-border/80 bg-bg/65 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-accent">
                {repo.label}
              </span>
            </div>
            <p className="muted mt-3 text-sm leading-6">{repo.description}</p>
            <p className="mt-3 text-sm text-text">{repo.demonstrates}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {repo.stack.map((tag) => (
                <span key={tag} className="rounded-full border border-border/80 bg-bg/60 px-2.5 py-1 text-xs text-muted">
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
