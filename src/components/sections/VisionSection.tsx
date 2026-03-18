import { Bot, Gauge, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { qaVision } from "../../content/vision";
import { Section } from "../layout/Section";

const pillarIcons = [ShieldCheck, Bot, Workflow];
const outcomeIcons = [Gauge, ShieldCheck, Sparkles];

export function VisionSection(): JSX.Element {
  return (
    <Section id="vision" variant="panel" accent="indigo" headerAlign="center" title="QA + AI" subtitle={qaVision.subtitle}>
      <div className="relative overflow-hidden rounded-2xl border border-border/45 bg-[radial-gradient(circle_at_0%_0%,rgba(78,128,255,0.2),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(125,99,255,0.17),transparent_40%),linear-gradient(145deg,rgba(16,20,27,0.95),rgba(10,13,19,0.94))] p-4 md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(155,167,180,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-45" />
        <div className="pointer-events-none absolute -left-14 top-12 h-36 w-36 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-accent-2/15 blur-3xl" />

        <div className="relative grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-border/55 bg-[#111722]/78 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/90">Operating Model</p>
            <h3 className="mt-2 font-heading text-2xl leading-tight text-text">{qaVision.headline}</h3>
            <p className="muted mt-3 leading-7">{qaVision.body}</p>
            <p className="mt-4 rounded-lg border border-border/60 bg-bg/45 px-3 py-2 text-sm text-text/90">{qaVision.operatingNote}</p>
          </article>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {qaVision.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Sparkles;

              return (
                <article key={pillar.title} className="rounded-xl border border-border/55 bg-[#101723]/80 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-accent-2/45 bg-accent-2/12 text-accent-2">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <h4 className="mt-2 text-sm font-semibold text-text">{pillar.title}</h4>
                  <p className="muted mt-1 text-xs leading-5">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 lg:grid-cols-2">
          {qaVision.tracks.map((track) => (
            <article key={track.title} className="rounded-xl border border-border/55 bg-[#0f1622]/82 p-4">
              <h4 className="font-heading text-base text-text">{track.title}</h4>
              <ul className="mt-3 space-y-2">
                {track.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/85" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="relative mt-4 grid gap-3 md:grid-cols-3">
          {qaVision.outcomes.map((outcome, index) => {
            const Icon = outcomeIcons[index] ?? Sparkles;
            return (
              <article key={outcome.label} className="rounded-xl border border-border/55 bg-[#101723]/84 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-accent/40 bg-accent/12 text-accent">
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent/85">{outcome.label}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-text/92">
                  {outcome.value}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
