import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
  variant?: "panel" | "flow";
  accent?: "aqua" | "indigo";
}>;

export function Section({
  id,
  title,
  subtitle,
  variant = "panel",
  accent = "aqua",
  children
}: SectionProps): JSX.Element {
  const baseClasses = "relative py-4 md:py-7 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28";
  const panelClasses = "section-card p-6 md:p-8";
  const flowClasses = "px-1 md:px-2";
  const accentClass = accent === "indigo" ? "section-accent-indigo" : "section-accent-aqua";

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`${baseClasses} ${accentClass} ${variant === "panel" ? panelClasses : flowClasses}`}
    >
      {variant === "flow" ? (
        <>
          <span className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
          <span className="pointer-events-none absolute -left-8 top-10 h-36 w-36 rounded-full bg-[var(--section-accent)] opacity-[0.07] blur-3xl" />
        </>
      ) : null}
      <header className="mb-6">
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="muted mt-2 max-w-2xl">{subtitle}</p> : null}
      </header>
      {children}
    </motion.section>
  );
}
