import { AnimatePresence, motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";

type ExperienceCardProps = {
  item: ExperienceItem;
  mode: "carousel" | "list";
  isActive: boolean;
  carouselVariant?: "active" | "adjacent";
  isInteractive?: boolean;
  onActivate?: () => void;
  listDetailsExpanded?: boolean;
  onToggleListDetails?: () => void;
  reducedMotion: boolean;
};

function formatPeriod(item: ExperienceItem): string {
  return `${item.start} - ${item.end}`;
}

function DetailSection({
  title,
  items,
  compact
}: {
  title: string;
  items: string[];
  compact?: boolean;
}): JSX.Element {
  return (
    <section className="rounded-xl bg-black/18 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text/40">{title}</p>
      <div className={`mt-2.5 space-y-2 ${compact ? "max-h-[9.25rem] overflow-y-auto pr-1.5 no-scrollbar" : ""}`}>
        {items.map((entry) => (
          <p key={entry} className="text-[14px] leading-7 text-text/78">
            {entry}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ExperienceCard({
  item,
  mode,
  isActive,
  carouselVariant = "active",
  isInteractive = true,
  onActivate,
  listDetailsExpanded = false,
  onToggleListDetails,
  reducedMotion
}: ExperienceCardProps): JSX.Element {
  const period = formatPeriod(item);
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.2, 1, 0.3, 1] };
  const isAdjacentCarouselCard = mode === "carousel" && carouselVariant === "adjacent";
  const shouldShowDetails = mode === "carousel" ? isActive && !isAdjacentCarouselCard : listDetailsExpanded;
  const compactCarouselDetails = mode === "list";

  return (
    <motion.article
      role={mode === "carousel" && isInteractive ? "button" : undefined}
      tabIndex={mode === "carousel" ? (isInteractive ? 0 : -1) : undefined}
      aria-pressed={mode === "carousel" ? isActive : undefined}
      aria-current={item.isCurrent ? "true" : undefined}
      onClick={mode === "carousel" && isInteractive ? onActivate : undefined}
      onKeyDown={
        mode === "carousel" && isInteractive
          ? (event) => {
              if ((event.key === "Enter" || event.key === " ") && onActivate) {
                event.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
      className={`relative overflow-hidden rounded-2xl bg-[#101827]/82 px-5 py-4 text-left transition duration-300 md:px-6 md:py-5 ${
        mode === "carousel"
          ? "transform-gpu cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg [backface-visibility:hidden]"
          : ""
      } ${
        mode === "carousel" && isAdjacentCarouselCard
          ? "min-h-[10.5rem] md:min-h-[11.25rem]"
          : mode === "carousel"
            ? "min-h-[22.5rem] md:min-h-[23rem]"
            : ""
      }`}
      animate={
        mode === "carousel"
          ? {
              scale: isActive ? 1.02 : 0.98,
              opacity: isActive ? 1 : 0.68,
              y: 0,
              backgroundColor: isActive ? "rgba(18, 28, 44, 0.9)" : "rgba(16, 24, 39, 0.78)",
              boxShadow: isActive ? "0 18px 38px rgba(0,0,0,0.34), 0 0 20px rgba(78,128,255,0.07)" : "0 8px 20px rgba(0,0,0,0.22)"
            }
          : undefined
      }
      transition={transition}
      style={{
        clipPath: "inset(0 round 1rem)",
        WebkitClipPath: "inset(0 round 1rem)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)"
      }}
    >
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.92,
          y: isActive ? 0 : 2,
          filter: mode === "carousel" ? (isActive ? "blur(0px)" : "blur(1.5px)") : "blur(0px)"
        }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-heading text-[1.18rem] tracking-[-0.02em] text-text md:text-[1.34rem]">{item.role}</h3>
              {item.isCurrent ? (
                <span className="surface-chip rounded-full bg-accent/18 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9fbeff]">
                  Current
                </span>
              ) : null}
            </div>
            <p className="mt-1.5 text-[1.02rem] text-text/78">
              {item.company} | {item.location}
            </p>
            <motion.p
              animate={{ opacity: isActive ? 1 : 0.86, y: isActive ? 0 : 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
              className={`mt-4 text-[1.04rem] leading-8 text-text/92 ${isAdjacentCarouselCard ? "line-clamp-2 text-text/84" : ""}`}
            >
              {item.impactSummary}
            </motion.p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="surface-chip rounded-md bg-bg/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text/65">{period}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(isAdjacentCarouselCard ? item.tech.slice(0, 5) : item.tech).map((tag) => (
            <span key={tag} className="surface-chip rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-text/74">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {shouldShowDetails ? (
          <motion.div
            key="details"
            initial={reducedMotion ? { opacity: 1, height: "auto", y: 0 } : { opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }}
            transition={transition}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-4">
              <DetailSection title="Impact" items={item.details.impact} compact={compactCarouselDetails} />
              <DetailSection title="Responsibilities" items={item.details.responsibilities} compact={compactCarouselDetails} />
              <DetailSection title="Systems / Tech" items={item.details.systems} compact={compactCarouselDetails} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {mode === "list" ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onToggleListDetails}
            aria-expanded={listDetailsExpanded}
            className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-text/82 transition hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {listDetailsExpanded ? "Hide details" : "View details"}
          </button>
        </div>
      ) : null}
    </motion.article>
  );
}



