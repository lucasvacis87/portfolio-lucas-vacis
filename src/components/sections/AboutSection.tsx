import { motion } from "framer-motion";
import { about } from "../../content/about";

export function AboutSection(): JSX.Element {
  const contentReveal = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 1, 0.3, 1]
      }
    }
  };

  const paragraphStack = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.08
      }
    }
  };

  const paragraphItem = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="relative py-3 md:py-6 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28">
      <div className="pointer-events-none absolute -left-20 top-6 h-44 w-44 rounded-full bg-accent-2/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-20 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />
      <div className="grid gap-8 lg:grid-cols-1">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={contentReveal}>
          <header className="mx-auto max-w-[76ch] text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Philosophy</p>
            <h2 className="section-title">{about.title}</h2>
            <p className="muted mt-3 leading-7">{about.subtitle}</p>
          </header>
          <motion.div
            variants={paragraphStack}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-6 max-w-[72ch] space-y-4 text-left"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent/90">Engineering quality systems, not just writing tests.</p>
            {about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                variants={paragraphItem}
                className={index === 0 ? "text-base leading-7 text-text/95" : "muted leading-7"}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-8 flex max-w-[72ch] items-center gap-3"
          >
            <span className="h-px flex-1 bg-border/80" />
            <p className="shrink-0 text-xs uppercase tracking-[0.12em] text-muted">Translating this approach into scalable systems</p>
            <span className="h-px flex-1 bg-border/80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
