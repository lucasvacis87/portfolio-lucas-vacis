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
    <section id="hero" className="relative overflow-hidden pb-28 pt-14 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/14 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-accent-2/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(78,128,255,0.18),transparent_52%),radial-gradient(circle_at_84%_34%,rgba(125,99,255,0.18),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(7,10,15,0.85),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(155,167,180,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.06)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]" />
      <div className="relative mx-auto w-full max-w-[84rem] px-5 md:px-8 xl:max-w-[88rem] 2xl:max-w-[96rem]">
        <div className="grid gap-12 px-2 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-3">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-64px" }}
            className="relative"
          >
            <motion.p variants={revealItem} className="font-heading text-lg tracking-[-0.02em] text-text md:text-xl">
              Lucas Vacis
            </motion.p>
            <motion.p
              variants={revealItem}
              className="mt-3 inline-flex rounded-full bg-accent-2/14 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-2"
            >
              {hero.kicker}
            </motion.p>
            <motion.h1
              variants={revealItem}
              className="mt-7 max-w-[13.4ch] font-heading text-[2.2rem] leading-[1.03] tracking-[-0.03em] sm:text-[2.9rem] md:max-w-[12ch] md:text-[3.45rem]"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              variants={revealItem}
              className="mt-5 max-w-[56ch] whitespace-pre-line text-base font-medium leading-7 text-text/90 md:mt-6 md:max-w-[47ch] md:text-[1.05rem] md:leading-8"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div variants={revealItem} className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(78,128,255,0.38)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_10px_28px_rgba(125,99,255,0.42)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {hero.primaryCta.label}
                <ArrowRight size={15} />
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center rounded-full bg-surface-2/50 px-4 py-2 text-sm font-semibold text-muted transition-all duration-200 hover:scale-[1.03] hover:bg-surface-2/80 hover:text-text active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {hero.secondaryCta.label}
              </a>
              {hero.tertiaryCta && (
                <a
                  href={resumeHref}
                  download={hero.tertiaryCta.download}
                  aria-label="Download Lucas Vacis resume PDF"
                  className="inline-flex items-center rounded-full bg-bg/38 px-4 py-2 text-sm font-semibold text-muted transition-all duration-200 hover:scale-[1.03] hover:bg-surface/70 hover:text-text active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {hero.tertiaryCta.label}
                </a>
              )}
            </motion.div>
            <motion.div variants={revealItem} className="mt-6">
              <div className="flex flex-wrap gap-2.5">
                {hero.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md bg-surface-2/75 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-text/80 transition-all duration-200 hover:bg-surface-2/90 hover:text-text hover:shadow-[0_0_14px_rgba(78,128,255,0.18)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <InteractiveQASandbox />
        </div>
      </div>
    </section>
  );
}
