import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { engineeringStackColumns } from "../../content/capabilities";

const accentStyles = {
  blue: {
    border: "rgba(78,128,255,0.28)",
    bg: "radial-gradient(circle_at_50%_20%, rgba(78,128,255,0.16), rgba(15,20,29,0.9) 60%)",
    glow: "0 0 26px rgba(78,128,255,0.2)"
  },
  indigo: {
    border: "rgba(108,122,255,0.28)",
    bg: "radial-gradient(circle_at_50%_20%, rgba(108,122,255,0.16), rgba(15,20,29,0.9) 60%)",
    glow: "0 0 26px rgba(108,122,255,0.2)"
  },
  teal: {
    border: "rgba(75,171,195,0.28)",
    bg: "radial-gradient(circle_at_50%_20%, rgba(75,171,195,0.16), rgba(15,20,29,0.9) 60%)",
    glow: "0 0 26px rgba(75,171,195,0.18)"
  },
  purple: {
    border: "rgba(125,99,255,0.28)",
    bg: "radial-gradient(circle_at_50%_20%, rgba(125,99,255,0.16), rgba(15,20,29,0.9) 60%)",
    glow: "0 0 26px rgba(125,99,255,0.2)"
  }
} as const;

export function SkillsSection(): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const onChange = (): void => setIsMobile(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const onChange = (): void => setIsDesktop(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <section
      id="engineering-capabilities"
      className="relative py-3 md:py-6 lg:-mx-12 lg:px-16 xl:-mx-32 xl:px-24 2xl:-mx-48 2xl:px-28"
    >
      <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-accent-2/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-56 w-56 rounded-full bg-accent/12 blur-3xl" />

      <header className="mx-auto max-w-[76ch] text-center">
        <h2 className="section-title">Engineering Stack & Systems</h2>
        <p className="muted mt-2 leading-7">Core systems and tooling behind my quality engineering workflows.</p>
      </header>

      <div className="mx-auto mt-8 max-w-[74rem] overflow-hidden rounded-2xl border border-border/45 bg-[#0f141c]/84 shadow-[0_18px_42px_rgba(0,0,0,0.3)]">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:flex lg:flex-row">
          {engineeringStackColumns.map((column, index) => {
            const isExpanded = hoveredIndex === index || (isMobile && activeMobileIndex === index);
            const accent = accentStyles[column.accent];
            const animateValues = isDesktop
              ? {
                  flexGrow: hoveredIndex === null ? 1 : isExpanded ? 1.55 : 0.82
                }
              : {};

            return (
              <motion.button
                key={column.title}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (!isMobile) {
                    return;
                  }
                  setActiveMobileIndex((current) => (current === index ? null : index));
                }}
                className="relative -ml-px -mt-px h-[520px] border border-border/45 p-0 text-left transition-[flex-grow] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset md:h-[620px] lg:h-[720px] lg:w-auto"
                animate={animateValues}
                style={
                  isDesktop
                    ? {
                        flexBasis: 0
                      }
                    : undefined
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isExpanded ? accent.bg : "rgba(15,20,29,0.88)",
                    boxShadow: isExpanded ? `inset 0 0 0 1px ${accent.border}, ${accent.glow}` : "none"
                  }}
                />
                <div className="relative flex h-full flex-col p-5">
                  <motion.div
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    animate={{
                      opacity: isExpanded ? 0 : 1,
                      y: isExpanded ? -8 : 0
                    }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                  >
                    <h3 className="font-heading text-[1.35rem] tracking-[-0.02em] text-text">{column.title}</h3>
                    <p className="mt-3 whitespace-pre-line text-[12px] leading-6 text-text/70">{column.summary}</p>
                  </motion.div>
                  <motion.div
                    className="flex h-full flex-col items-center justify-center"
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      y: isExpanded ? 0 : 8
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <motion.h3
                      className="text-center font-heading text-xl tracking-[-0.02em] text-text"
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        y: isExpanded ? 0 : 8
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      {column.title}
                    </motion.h3>

                    <motion.ul className="mt-6 flex flex-col items-center space-y-2.5 text-center">
                      {column.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          className="text-sm text-text/85"
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            y: isExpanded ? 0 : 8
                          }}
                          transition={{
                            duration: 0.22,
                            delay: isExpanded ? 0.03 + itemIndex * 0.04 : 0,
                            ease: "easeOut"
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
