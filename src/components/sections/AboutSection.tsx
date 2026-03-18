import { motion } from "framer-motion";
import { about } from "../../content/about";

export function AboutSection(): JSX.Element {
  return (
    <section id="about" className="relative py-3 md:py-6 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28">
      <div className="pointer-events-none absolute -left-20 top-10 h-44 w-44 rounded-full bg-accent-2/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-20 h-52 w-52 rounded-full bg-accent/8 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto max-w-[76ch] text-center"
      >
        <h2 className="section-title">{about.title}</h2>
        <p className="muted mt-3 leading-7">{about.subtitle}</p>
        <div className="mx-auto mt-5 max-w-[64ch] space-y-3">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="muted text-sm leading-6">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
