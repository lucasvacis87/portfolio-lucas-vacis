import { useRef } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceCarouselProps = {
  items: ExperienceItem[];
  activeIndex: number;
  onChangeActive: (nextIndex: number) => void;
  reducedMotion: boolean;
};

function clampIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

export function ExperienceCarousel({ items, activeIndex, onChangeActive, reducedMotion }: ExperienceCarouselProps): JSX.Element {
  const lastWheelAtRef = useRef(0);
  const spacing = 220;

  const goTo = (index: number): void => {
    const clamped = clampIndex(index, items.length);
    if (clamped === activeIndex) {
      return;
    }

    onChangeActive(clamped);
  };

  const moveBy = (step: number): void => {
    goTo(activeIndex + step);
  };

  return (
    <div
      aria-label="Experience timeline carousel"
      role="region"
      tabIndex={0}
      className="relative h-[36rem] overflow-hidden rounded-[1.4rem] border border-white/[0.06] bg-[#0c121b]/72 p-3 shadow-[0_24px_48px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:p-4"
      onWheel={(event) => {
        if (items.length <= 1) {
          return;
        }

        if (Math.abs(event.deltaY) < 8) {
          return;
        }

        const now = Date.now();
        if (now - lastWheelAtRef.current < 220) {
          event.preventDefault();
          return;
        }

        const direction = event.deltaY > 0 ? 1 : -1;
        const targetIndex = clampIndex(activeIndex + direction, items.length);
        if (targetIndex !== activeIndex) {
          event.preventDefault();
          moveBy(direction);
          lastWheelAtRef.current = now;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          moveBy(1);
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          moveBy(-1);
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          goTo(0);
        }
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0c121b] via-[#0c121b]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c121b] via-[#0c121b]/70 to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[19rem] -translate-y-1/2 rounded-2xl border border-white/[0.07] bg-white/[0.01]" />

      <div className="relative h-full">
        {items.map((item, index) => {
          const distance = index - activeIndex;
          const isActive = distance === 0;
          const isInFrame = Math.abs(distance) <= 2;

          return (
            <motion.div
              key={`${item.role}-${item.company}-${item.start}`}
              aria-hidden={!isInFrame}
              className="absolute left-2 right-2 top-1/2 -translate-y-1/2 sm:left-3 sm:right-3"
              animate={{
                y: distance * spacing
              }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.2, 1, 0.3, 1] }}
              style={{
                zIndex: 30 - Math.abs(distance),
                pointerEvents: isInFrame ? "auto" : "none"
              }}
            >
              <ExperienceCard
                item={item}
                mode="carousel"
                isActive={isActive}
                isInteractive={isInFrame}
                onActivate={() => goTo(index)}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          );
        })}
      </div>

      <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-text/45">
        Scroll, arrow keys, or click a card to move focus.
      </p>
    </div>
  );
}

