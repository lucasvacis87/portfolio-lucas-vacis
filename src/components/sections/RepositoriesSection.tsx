import { ExternalLink } from "lucide-react";
import { repositories } from "../../content/repositories";
import { Section } from "../layout/Section";

const repositoryToneStyles = {
  automation: {
    badge: "text-[#78a9ff] bg-[#78a9ff]/10 border-[#78a9ff]/20",
    edge: "from-[#78a9ff]/70 via-[#3d66ff]/35 to-transparent",
    border: "border-[#78a9ff]/18 hover:border-[#78a9ff]/34",
    glow: "hover:shadow-[0_20px_48px_rgba(0,0,0,0.34),0_0_34px_rgba(120,169,255,0.14)]",
    tint: "bg-[radial-gradient(circle_at_16%_18%,rgba(120,169,255,0.16),transparent_32%),radial-gradient(circle_at_86%_110%,rgba(61,102,255,0.12),transparent_34%)]"
  },
  frontend: {
    badge: "text-[#9ca7ff] bg-[#9ca7ff]/10 border-[#9ca7ff]/20",
    edge: "from-[#9ca7ff]/70 via-[#6f7cff]/30 to-transparent",
    border: "border-[#9ca7ff]/18 hover:border-[#9ca7ff]/34",
    glow: "hover:shadow-[0_20px_48px_rgba(0,0,0,0.34),0_0_34px_rgba(156,167,255,0.14)]",
    tint: "bg-[radial-gradient(circle_at_14%_16%,rgba(156,167,255,0.15),transparent_30%),radial-gradient(circle_at_88%_105%,rgba(111,124,255,0.12),transparent_34%)]"
  },
  product: {
    badge: "text-[#88d7ff] bg-[#88d7ff]/10 border-[#88d7ff]/20",
    edge: "from-[#88d7ff]/70 via-[#8d7bff]/28 to-transparent",
    border: "border-[#88d7ff]/18 hover:border-[#9d95ff]/30",
    glow: "hover:shadow-[0_20px_48px_rgba(0,0,0,0.34),0_0_34px_rgba(136,215,255,0.12)]",
    tint: "bg-[radial-gradient(circle_at_14%_16%,rgba(136,215,255,0.15),transparent_30%),radial-gradient(circle_at_88%_105%,rgba(141,123,255,0.12),transparent_36%)]"
  }
} as const;

export function RepositoriesSection(): JSX.Element {
  const featuredRepository = repositories.find((repo) => repo.priority === "featured") ?? repositories[0];
  const secondaryRepositories = repositories.filter((repo) => repo !== featuredRepository);
  const featuredTone = repositoryToneStyles[featuredRepository.tone];

  return (
    <Section
      id="repositories"
      variant="flow"
      accent="indigo"
      headerAlign="center"
      title="Repository Highlights"
      subtitle="Selected codebases that reflect how I structure, scale, and ship engineering work."
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.92fr)] lg:items-stretch">
        <article
          className={`group relative overflow-hidden rounded-[1.65rem] border bg-[#0d131d]/88 p-6 transition duration-300 ease-out hover:-translate-y-1 ${featuredTone.border} ${featuredTone.glow} md:p-7 lg:min-h-[32rem]`}
        >
          <div className={`pointer-events-none absolute inset-0 ${featuredTone.tint}`} />
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${featuredTone.edge}`} />
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)] opacity-40 blur-3xl transition duration-300 group-hover:opacity-60" />

          <div className="relative flex h-full flex-col">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <span className={`inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${featuredTone.badge}`}>
                  {featuredRepository.label}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text/36">Featured codebase</p>
                  <h3 className="mt-2 font-heading text-[1.7rem] tracking-[-0.04em] text-text sm:text-[2rem]">
                    {featuredRepository.name}
                  </h3>
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-7 text-text/88">
              {featuredRepository.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredRepository.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-text/72"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/8 bg-black/18 p-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text/42">Impact</p>
              <p className="mt-2 max-w-[50ch] text-sm leading-6 text-text/82">{featuredRepository.impact}</p>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0a1018] transition duration-200 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href={featuredRepository.links.primary.href}
                target="_blank"
                rel="noreferrer"
              >
                {featuredRepository.links.primary.label}
                <ExternalLink size={14} />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-text/80 transition duration-200 hover:border-white/18 hover:bg-white/[0.055] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                href={featuredRepository.links.secondary.href}
                target="_blank"
                rel="noreferrer"
              >
                {featuredRepository.links.secondary.label}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </article>

        <div className="grid gap-5">
          {secondaryRepositories.map((repo) => {
            const tone = repositoryToneStyles[repo.tone];

            return (
              <article
                key={repo.name}
                className={`group relative overflow-hidden rounded-[1.4rem] border bg-[#0d131d]/84 p-5 transition duration-300 ease-out hover:-translate-y-1 ${tone.border} ${tone.glow} md:p-6`}
              >
                <div className={`pointer-events-none absolute inset-0 ${tone.tint}`} />
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tone.edge}`} />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${tone.badge}`}>
                        {repo.label}
                      </span>
                      <h3 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.03em] text-text sm:text-[1.35rem]">
                        {repo.name}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 max-w-[40ch] text-sm leading-6 text-text/80">{repo.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {repo.stack.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/7 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-text/68"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-text/56">{repo.impact}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-text/84 transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      href={repo.links.primary.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.links.primary.label}
                      <ExternalLink size={12} />
                    </a>
                    <a
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-text/54 transition hover:text-text/82 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      href={repo.links.secondary.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repo.links.secondary.label}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
