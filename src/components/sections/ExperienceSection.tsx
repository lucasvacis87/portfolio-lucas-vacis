import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { experience, experienceIntro } from "../../content/experience";
import { Section } from "../layout/Section";
import { ExperienceCard } from "./experience/ExperienceCard";
import { ExperienceCarousel } from "./experience/ExperienceCarousel";
import { NavigationControls } from "./experience/NavigationControls";
import { ExperienceYearRail } from "./experience/ExperienceYearRail";

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
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [isMobile, setIsMobile] = useState(false);
  const [isCarouselScrollEnabled, setIsCarouselScrollEnabled] = useState(false);

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
  const boardPosition = viewMode === "carousel" ? carouselPosition : activeIndex;

  return (
    <Section id="experience" variant="flow" accent="aqua" headerAlign="center" title="Experience" subtitle={experienceIntro.subtitle}>
      {experienceIntro.paragraphs.length > 0 ? (
        <div className="space-y-4">
          {experienceIntro.paragraphs.map((paragraph) => (
            <p key={paragraph} className="muted leading-7">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-6 rounded-[1.5rem] border border-white/[0.04] bg-[#0d141e]/68 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_20px_42px_rgba(0,0,0,0.32)] sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_6.25rem_9.5rem] lg:items-start">
          {viewMode === "carousel" ? (
            <ExperienceCarousel
              items={experience}
              activeIndex={activeIndex}
              onChangeActive={(nextIndex) => {
                setActiveIndex(clampIndex(nextIndex));
              }}
              onPositionChange={setCarouselPosition}
              reducedMotion={Boolean(prefersReducedMotion)}
              scrollEnabled={isCarouselScrollEnabled}
              onEnableScroll={() => setIsCarouselScrollEnabled(true)}
            />
          ) : (
            <div className="relative rounded-[1.25rem] bg-[#0d141e]/74 p-1 shadow-[0_18px_36px_rgba(0,0,0,0.24)] sm:p-2">
              <div className="space-y-2.5">
                {experience.map((item, index) => (
                  <ExperienceCard
                    key={`${item.role}-${item.company}-${item.start}`}
                    item={item}
                    mode="list"
                    isActive={index === activeIndex}
                    listStatic
                    reducedMotion={Boolean(prefersReducedMotion)}
                  />
                ))}
              </div>
              {isMobile ? (
                <p className="pointer-events-none sticky bottom-0 mt-3 bg-gradient-to-t from-[#0d141e]/90 to-transparent pt-8 text-[11px] text-text/44">
                  List view is default on mobile for faster recruiter scanning.
                </p>
              ) : null}
            </div>
          )}

          {viewMode === "carousel" ? (
            <ExperienceYearRail items={experience} position={boardPosition} reducedMotion={Boolean(prefersReducedMotion)} />
          ) : (
            <div className="hidden lg:block" aria-hidden="true" />
          )}

          <NavigationControls
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            disableCarouselToggle={isMobile}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            showCurrentRole={showCurrentRoleButton}
            showTimelineControls={viewMode === "carousel"}
            timelineDisabled={viewMode === "carousel" && !isCarouselScrollEnabled}
            onPrevious={() => setActiveIndex((index) => clampIndex(index - 1))}
            onNext={() => setActiveIndex((index) => clampIndex(index + 1))}
            onCurrentRole={() => setActiveIndex(0)}
          />
        </div>
      </div>
    </Section>
  );
}

