import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
  variant?: "panel" | "flow";
  accent?: "aqua" | "indigo";
  headerAlign?: "left" | "center";
}>;

export function Section({
  id,
  title,
  subtitle,
  variant = "panel",
  accent = "aqua",
  headerAlign = "left",
  children
}: SectionProps): JSX.Element {
  const baseClasses = "relative py-2.5 md:py-6";
  const panelClasses = "section-card surface-panel p-4 sm:p-6 md:p-8";
  const flowClasses = "px-0.5 md:px-2";
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
          <span className="separator-soft pointer-events-none absolute inset-x-0 -top-1 h-px" />
          <span className="pointer-events-none absolute -left-8 top-10 h-36 w-36 rounded-full bg-[var(--section-accent)] opacity-[0.07] blur-3xl" />
        </>
      ) : null}
      <header className={`mb-5 md:mb-6 ${headerAlign === "center" ? "mx-auto max-w-[76ch] text-center" : ""}`}>
        <h2 className="section-title">{title}</h2>
        {subtitle ? (
          <p className={`muted mt-2 text-sm leading-6 md:text-base md:leading-7 ${headerAlign === "center" ? "mx-auto max-w-[62ch]" : "max-w-2xl"}`}>
            {subtitle}
          </p>
        ) : null}
      </header>
      {children}
    </motion.section>
  );
}
