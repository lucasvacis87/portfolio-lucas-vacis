import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "../../content/site";

export function HeroSection(): JSX.Element {
  return (
    <section id="hero" className="relative overflow-hidden rounded-[1.6rem] border border-border/70 bg-surface/55 p-7 md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(91,140,255,0.24),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(55,208,201,0.15),transparent_45%)]" />
      <div className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-accent/20 bg-accent/10 blur-3xl" />
      <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{hero.kicker}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl leading-tight md:text-6xl">{hero.title}</h1>
          <p className="muted mt-5 max-w-3xl text-base leading-7 md:text-lg">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/20 px-5 py-2.5 text-sm font-semibold text-text transition duration-300 hover:-translate-y-0.5 hover:shadow-glow"
            >
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-border bg-surface-2/50 px-5 py-2.5 text-sm font-semibold text-muted transition duration-300 hover:border-accent/40 hover:text-text"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border/80 bg-bg/55 p-5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">Core Stack</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {hero.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border/80 bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
