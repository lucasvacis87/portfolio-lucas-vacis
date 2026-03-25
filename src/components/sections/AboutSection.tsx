import { motion } from "framer-motion";
import { about } from "../../content/about";

export function AboutSection(): JSX.Element {
  return (
    <section id="impact" className="relative py-2.5 md:py-6">
      <div className="pointer-events-none absolute -left-24 top-10 h-52 w-52 rounded-full bg-accent/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-8 h-52 w-52 rounded-full bg-accent-2/12 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto"
      >
        <header className="mx-auto max-w-[76ch] text-center">
          <h2 className="section-title">{about.title}</h2>
        </header>
        <div className="mt-6 grid gap-4 md:mt-7 md:grid-cols-2">
          {about.items.map((item, index) => (
            <article key={item.metric} className="impact-card group">
              <div className="impact-card-inner">
                <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-accent/80">
                  Achievement {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-[1.3rem] leading-tight tracking-[-0.02em] text-text sm:text-[1.45rem]">
                  {item.metric}
                </h3>
                <p className="muted mt-2 text-[13px] leading-6 sm:text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
