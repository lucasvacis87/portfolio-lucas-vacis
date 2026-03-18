import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "../../content/site";
import { withBaseUrl } from "../../utils/url";
import { InteractiveQASandbox } from "./InteractiveQASandbox";

export function HeroSection(): JSX.Element {
  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.08
      }
    }
  };

  const revealItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.2, 1, 0.3, 1]
      }
    }
  };

  const resumeHref = hero.tertiaryCta ? withBaseUrl(hero.tertiaryCta.href) : "";

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-6 md:pb-20 md:pt-10"
    >
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-accent-2/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[82%] bg-[radial-gradient(circle_at_16%_20%,rgba(91,140,255,0.22),transparent_44%),radial-gradient(circle_at_84%_34%,rgba(55,208,201,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[76%] bg-[linear-gradient(rgba(155,167,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.07)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-bg/70 to-bg" />
      <div className="relative mx-auto w-full max-w-[84rem] px-5 md:px-8 xl:max-w-[88rem] 2xl:max-w-[96rem]">
        <div className="grid gap-12 px-2 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-3">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-64px" }}
          className="relative"
        >
          <motion.p
            variants={revealItem}
            className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent"
          >
            {hero.kicker}
          </motion.p>
          <motion.h1
            variants={revealItem}
            className="mt-7 max-w-[15.5ch] font-heading text-[2.1rem] leading-[1.06] tracking-[-0.03em] sm:text-[2.8rem] md:max-w-[14.3ch] md:text-[3.55rem]"
          >
            {hero.title}
          </motion.h1>
          <motion.p variants={revealItem} className="muted mt-8 max-w-[60ch] text-base leading-7 md:mt-9 md:max-w-[53ch] md:text-lg">
            {hero.subtitle}
          </motion.p>
          <motion.div variants={revealItem} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-accent/75 bg-accent/20 px-5 py-2.5 text-sm font-semibold text-text transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/28 hover:shadow-[0_0_26px_rgba(91,140,255,0.35)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:shadow-[0_0_0_5px_rgba(91,140,255,0.2)]"
            >
              {hero.primaryCta.label}
              <ArrowRight size={16} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-border bg-surface-2/60 px-5 py-2.5 text-sm font-semibold text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-2 hover:text-text hover:shadow-[0_10px_25px_rgba(7,10,14,0.45)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {hero.secondaryCta.label}
            </a>
            {hero.tertiaryCta && (
              <a
                href={resumeHref}
                download={hero.tertiaryCta.download}
                aria-label="Download Lucas Vacis resume PDF"
                className="inline-flex items-center rounded-full border border-border bg-bg/45 px-5 py-2.5 text-sm font-semibold text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-2/50 hover:bg-surface/80 hover:text-text active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {hero.tertiaryCta.label}
              </a>
            )}
          </motion.div>
          <motion.div variants={revealItem} className="mt-10">
            <div className="flex flex-wrap gap-2.5">
              {hero.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border/85 bg-surface-2/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-surface/85 hover:text-text hover:shadow-[0_10px_20px_rgba(5,9,14,0.35)]"
                >
                  {chip}
                </span>
              ))}
            </div>
            {hero.microLine && <p className="muted mt-6 text-sm leading-6">{hero.microLine}</p>}
          </motion.div>
        </motion.div>
        <InteractiveQASandbox />
        </div>
      </div>
    </section>
  );
}
