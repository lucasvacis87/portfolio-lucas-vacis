import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { experience, experienceIntro } from "../../content/experience";
import { Section } from "../layout/Section";
import { ExperienceCard } from "./experience/ExperienceCard";
import { ExperienceCarousel } from "./experience/ExperienceCarousel";
import { NavigationControls } from "./experience/NavigationControls";

type ViewMode = "carousel" | "list";

function clampIndex(index: number): number {
  if (experience.length === 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, experience.length - 1));
}

export function ExperienceSection(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [isMobile, setIsMobile] = useState(false);
  const [expandedListIndex, setExpandedListIndex] = useState<number | null>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncBreakpoint = (): void => {
      const mobile = mediaQuery.matches;
      setIsMobile(mobile);
      setViewMode(mobile ? "list" : "carousel");
    };

    syncBreakpoint();
    mediaQuery.addEventListener("change", syncBreakpoint);

    return () => {
      mediaQuery.removeEventListener("change", syncBreakpoint);
    };
  }, []);

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < experience.length - 1;
  const showCurrentRoleButton = activeIndex !== 0;

  const activeRoleLabel = useMemo(() => {
    const item = experience[activeIndex];
    return item ? `${item.role} at ${item.company}` : "Current role";
  }, [activeIndex]);

  return (
    <Section id="experience" variant="flow" accent="aqua" headerAlign="center" title="Experience" subtitle={experienceIntro.subtitle}>
      <div className="space-y-4">
        {experienceIntro.paragraphs.map((paragraph) => (
          <p key={paragraph} className="muted leading-7">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#0f161f]/74 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_28px_rgba(0,0,0,0.2)] md:px-4">
        <p className="text-xs text-text/62 sm:text-sm">
          Active focus: <span className="font-semibold text-text/85">{activeRoleLabel}</span>
        </p>
        <div role="group" aria-label="Experience section view toggle" className="inline-flex rounded-xl bg-[#0b1118] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <button
            type="button"
            onClick={() => setViewMode("carousel")}
            aria-pressed={viewMode === "carousel"}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
              viewMode === "carousel"
                ? "bg-white text-[#09111a]"
                : "text-text/70 hover:bg-white/[0.08] hover:text-text"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
          >
            Carousel view
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
              viewMode === "list"
                ? "bg-white text-[#09111a]"
                : "text-text/70 hover:bg-white/[0.08] hover:text-text"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
          >
            List view
          </button>
        </div>
      </div>

      {viewMode === "carousel" ? (
        <div className="mt-6 rounded-[1.5rem] bg-[#0c121b]/62 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_18px_40px_rgba(0,0,0,0.3)]">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_9.5rem] lg:items-start">
            <ExperienceCarousel
              items={experience}
              activeIndex={activeIndex}
              onChangeActive={(nextIndex) => {
                setActiveIndex(clampIndex(nextIndex));
              }}
              reducedMotion={Boolean(prefersReducedMotion)}
            />

            <NavigationControls
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              showCurrentRole={showCurrentRoleButton}
              onPrevious={() => setActiveIndex((index) => clampIndex(index - 1))}
              onNext={() => setActiveIndex((index) => clampIndex(index + 1))}
              onCurrentRole={() => setActiveIndex(0)}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {isMobile ? (
            <p className="text-xs text-text/50">List view is default on mobile for faster recruiter scanning.</p>
          ) : null}
          {experience.map((item, index) => (
            <ExperienceCard
              key={`${item.role}-${item.company}-${item.start}`}
              item={item}
              mode="list"
              isActive={index === activeIndex}
              listDetailsExpanded={expandedListIndex === index}
              onToggleListDetails={() => setExpandedListIndex((current) => (current === index ? null : index))}
              reducedMotion={Boolean(prefersReducedMotion)}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

