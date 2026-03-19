import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { hero } from "../../content/site";
import { withBaseUrl } from "../../utils/url";
import { containerClassName } from "../layout/Container";
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

  const resumeHref = withBaseUrl(hero.secondaryCta.href);

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden pb-24 pt-16 md:pb-28 md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,19,0.96)_0%,rgba(7,10,15,1)_78%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(78,128,255,0.14),transparent_44%),radial-gradient(circle_at_88%_14%,rgba(55,208,201,0.11),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(155,167,180,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.05)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />
      <div className={`relative ${containerClassName}`}>
        <div className="grid gap-12 px-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-center lg:gap-10 md:px-3">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-64px" }}
            className="relative max-w-3xl"
          >
            <motion.p variants={revealItem} className="font-heading text-lg tracking-[-0.02em] text-text md:text-xl">
              Lucas Vacis
            </motion.p>
            <motion.p
              variants={revealItem}
              className="mt-4 inline-flex rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
            >
              {hero.kicker}
            </motion.p>
            <motion.h1
              id="hero-title"
              variants={revealItem}
              className="mt-7 max-w-[15ch] font-heading text-[2.15rem] leading-[1.04] tracking-[-0.03em] text-text sm:text-[2.9rem] md:text-[3.55rem]"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="mt-6 max-w-[64ch] text-base font-medium leading-8 text-text/85 md:text-[1.05rem]"
            >
              {hero.subtitle}
            </motion.p>
            <motion.ul variants={revealItem} className="mt-8 space-y-3">
              {hero.proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium leading-6 text-text/86 md:text-[0.95rem]">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={revealItem} className="mt-9 flex flex-wrap items-center gap-2.5">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(78,128,255,0.33)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_10px_24px_rgba(78,128,255,0.36)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {hero.primaryCta.label}
                <ArrowRight size={15} />
              </a>
              <a
                href={resumeHref}
                download={hero.secondaryCta.download}
                aria-label="Download Lucas Vacis resume PDF"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/40 px-4 py-2 text-sm font-semibold text-text/92 transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:text-text active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Download size={15} />
                {hero.secondaryCta.label}
              </a>
            </motion.div>
            <motion.div variants={revealItem} className="mt-6">
              <div className="flex flex-wrap gap-2">
                {hero.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-border/75 bg-surface/72 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-text/80"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
            {hero.microLine ? (
              <motion.p variants={revealItem} className="mt-4 text-xs text-muted">
                {hero.microLine}
              </motion.p>
            ) : null}
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-64px" }}
            className="mx-auto w-full lg:self-center"
          >
            <InteractiveQASandbox />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
