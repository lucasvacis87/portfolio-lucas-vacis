import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
}>;

export function Section({ id, title, subtitle, children }: SectionProps): JSX.Element {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="section-card p-6 md:p-8 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28"
    >
      <header className="mb-5">
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="muted mt-2 max-w-2xl">{subtitle}</p> : null}
      </header>
      {children}
    </motion.section>
  );
}
