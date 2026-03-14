import { ArrowRight } from "lucide-react";
import { hero } from "../../content/site";

export function HeroSection(): JSX.Element {
  return (
    <section id="hero" className="pt-8 md:pt-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{hero.kicker}</p>
      <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight md:text-6xl">{hero.title}</h1>
      <p className="muted mt-5 max-w-2xl text-lg">{hero.subtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={hero.primaryCta.href}
          className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-5 py-2.5 text-sm font-semibold text-text transition hover:shadow-glow"
        >
          {hero.primaryCta.label}
          <ArrowRight size={16} />
        </a>
        <a
          href={hero.secondaryCta.href}
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition hover:text-text"
        >
          {hero.secondaryCta.label}
        </a>
      </div>
    </section>
  );
}

