import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { engineeringStackColumns } from "../../content/capabilities";

const accentStyles = {
  blue: {
    color: "#4C6EF5",
    rgb: "76,110,245"
  },
  teal: {
    color: "#2F9E8F",
    rgb: "47,158,143"
  },
  violet: {
    color: "#5F3DC4",
    rgb: "95,61,196"
  },
  amber: {
    color: "#C08A2E",
    rgb: "192,138,46"
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
    <section id="engineering-capabilities" className="relative py-3 md:py-6">
      <div className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-[#7a8aa8]/6 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-56 w-56 rounded-full bg-[#63718f]/8 blur-3xl" />

      <header className="mx-auto max-w-[76ch] text-center">
        <h2 className="section-title">Engineering Stack & Systems</h2>
        <p className="muted mt-2 leading-7">Core systems and tooling behind my quality engineering workflows.</p>
      </header>

      <div className="surface-panel mx-auto mt-8 max-w-[74rem] overflow-hidden rounded-2xl bg-[#0f141c]/84 shadow-[0_18px_42px_rgba(0,0,0,0.3)]">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:flex lg:flex-row">
          {engineeringStackColumns.map((column, index) => {
            const isExpanded = hoveredIndex === index || (isMobile && activeMobileIndex === index);
            const hasActiveColumn = hoveredIndex !== null || (isMobile && activeMobileIndex !== null);
            const isMuted = hasActiveColumn && !isExpanded;
            const accent = accentStyles[column.accent];
            const animateValues = isDesktop
              ? {
                  flexGrow: hoveredIndex === null ? 1 : isExpanded ? 1.55 : 0.82,
                  opacity: isMuted ? 0.66 : 1
                }
              : {
                  opacity: isMuted ? 0.7 : 1
                };
            const panelBackground = isExpanded
              ? `linear-gradient(165deg, rgba(15,20,29,0.92), rgba(12,16,24,0.96)),
                 radial-gradient(circle at 52% 8%, rgba(${accent.rgb},0.13), transparent 58%),
                 radial-gradient(circle at 50% 120%, rgba(${accent.rgb},0.08), transparent 62%)`
              : `linear-gradient(165deg, rgba(15,20,29,0.92), rgba(12,16,24,0.94)),
                 radial-gradient(circle at 52% 8%, rgba(${accent.rgb},0.045), transparent 62%)`;
            const panelShadow = isExpanded
              ? `inset 0 1px 0 rgba(255,255,255,0.04),
                 inset 0 0 0 1px rgba(${accent.rgb},0.32),
                 0 18px 34px rgba(0,0,0,0.35),
                 0 0 26px rgba(${accent.rgb},0.12)`
              : `inset 0 1px 0 rgba(255,255,255,0.025),
                 inset 0 0 0 1px rgba(${accent.rgb},0.16)`;

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
                className="relative h-[520px] bg-[#0f141c]/80 p-0 text-left transition-[flex-grow,opacity,filter] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset md:h-[620px] lg:h-[720px] lg:w-auto"
                animate={animateValues}
                style={
                  isDesktop
                    ? {
                        flexBasis: 0,
                        filter: isMuted ? "saturate(0.84) brightness(0.92)" : "saturate(1) brightness(1)"
                      }
                    : {
                        filter: isMuted ? "saturate(0.86) brightness(0.93)" : "saturate(1) brightness(1)"
                      }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: panelBackground,
                    boxShadow: panelShadow
                  }}
                />
                <motion.div
                  className="pointer-events-none absolute bottom-6 left-[1px] top-6 w-[2px] rounded-full"
                  style={{
                    background: `linear-gradient(180deg, rgba(${accent.rgb},0), rgba(${accent.rgb},${isExpanded ? "0.7" : "0.34"}) 18%, rgba(${accent.rgb},${isExpanded ? "0.64" : "0.3"}) 82%, rgba(${accent.rgb},0))`,
                    boxShadow: isExpanded ? `0 0 10px rgba(${accent.rgb},0.2)` : "none"
                  }}
                  animate={{
                    opacity: isExpanded ? 1 : 0.72,
                    scaleY: isExpanded ? 1 : 0.92
                  }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
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
                    <h3 className="font-heading text-[1.35rem] tracking-[-0.02em]" style={{ color: accent.color }}>
                      {column.title}
                    </h3>
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
                      className="text-center font-heading text-xl tracking-[-0.02em]"
                      style={{ color: accent.color }}
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
