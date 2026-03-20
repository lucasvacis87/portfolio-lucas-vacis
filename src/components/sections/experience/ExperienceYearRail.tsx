import { motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";

type ExperienceYearRailProps = {
  items: ExperienceItem[];
  position: number;
  reducedMotion: boolean;
};

const STEP_PX = 72;

function getYearLabel(value: string): string {
  if (value.toLowerCase() === "present") {
    return "Now";
  }

  const match = value.match(/\d{4}/);
  return match ? match[0] : value;
}

function getPeriodLabel(item: ExperienceItem): string {
  return `${getYearLabel(item.start)} - ${getYearLabel(item.end)}`;
}

export function ExperienceYearRail({ items, position, reducedMotion }: ExperienceYearRailProps): JSX.Element {
  const nearestIndex = Math.round(position);

  return (
    <aside className="hidden h-[46rem] w-[6.25rem] lg:block" aria-hidden="true">
      <div className="relative h-full overflow-hidden rounded-2xl bg-[#0f161f]/28">
        <div className="pointer-events-none absolute inset-y-0 left-2 w-px bg-gradient-to-b from-transparent via-white/22 to-transparent" />
        {items.map((item, index) => {
          const distance = index - position;
          const isActive = index === nearestIndex;

          return (
            <motion.div
              key={`${item.role}-${item.company}-years`}
              className="absolute left-3 right-2 top-1/2 -translate-y-1/2"
              animate={{
                y: distance * STEP_PX,
                opacity: Math.abs(distance) > 2.4 ? 0 : isActive ? 1 : 0.62
              }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.2, 1, 0.3, 1] }}
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.13em] ${
                  isActive ? "text-text/86" : "text-text/45"
                }`}
              >
                {getPeriodLabel(item)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}
