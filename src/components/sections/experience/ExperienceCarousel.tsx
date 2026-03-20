import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceCarouselProps = {
  items: ExperienceItem[];
  activeIndex: number;
  onChangeActive: (nextIndex: number) => void;
  reducedMotion: boolean;
};

type CarouselSlot = "prev" | "active" | "next";

type SlotItem = {
  slot: CarouselSlot;
  index: number;
  y: number;
};

const SLOT_OFFSET = 300;
const WHEEL_THROTTLE_MS = 220;
const DRAG_THRESHOLD_PX = 16;
const DRAG_RESET_MS = 180;

function clampIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

function getVisibleSlots(activeIndex: number, length: number): SlotItem[] {
  const slots: SlotItem[] = [];

  if (activeIndex > 0) {
    slots.push({ slot: "prev", index: activeIndex - 1, y: -SLOT_OFFSET });
  }

  slots.push({ slot: "active", index: activeIndex, y: 0 });

  if (activeIndex + 1 < length) {
    slots.push({ slot: "next", index: activeIndex + 1, y: SLOT_OFFSET });
  }

  return slots;
}

export function ExperienceCarousel({ items, activeIndex, onChangeActive, reducedMotion }: ExperienceCarouselProps): JSX.Element {
  const lastWheelAtRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartAtRef = useRef(0);
  const dragLastYRef = useRef(0);
  const dragLastAtRef = useRef(0);
  const justDraggedUntilRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasManyItems = items.length > 1;

  const visibleSlots = useMemo(() => getVisibleSlots(activeIndex, items.length), [activeIndex, items.length]);

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

  const canTriggerClick = (): boolean => Date.now() > justDraggedUntilRef.current;

  const finishDrag = (pointerId?: number, currentTarget?: HTMLDivElement): void => {
    if (!isDragging) {
      return;
    }

    if (pointerId !== undefined && currentTarget?.hasPointerCapture(pointerId)) {
      currentTarget.releasePointerCapture(pointerId);
    }

    setIsDragging(false);

    const totalDelta = dragLastYRef.current - dragStartYRef.current;
    const elapsed = Math.max(dragLastAtRef.current - dragStartAtRef.current, 1);
    const velocity = (dragLastYRef.current - dragStartYRef.current) / elapsed;
    const projected = totalDelta + velocity * 220;
    const projectedSteps = Math.round(projected / SLOT_OFFSET);
    const shouldSnap = Math.abs(totalDelta) >= DRAG_THRESHOLD_PX || Math.abs(projectedSteps) > 0;

    if (shouldSnap) {
      const targetIndex = clampIndex(activeIndex - projectedSteps, items.length);
      onChangeActive(targetIndex);
      justDraggedUntilRef.current = Date.now() + DRAG_RESET_MS;
    }

    setDragOffset(0);
  };

  return (
    <div
      aria-label="Experience timeline carousel"
      role="region"
      tabIndex={0}
      className={`relative h-[42rem] overflow-hidden rounded-[1.4rem] border border-white/[0.06] bg-[#0c121b]/72 p-3 shadow-[0_24px_48px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:p-4 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onWheel={(event) => {
        if (!hasManyItems || isDragging) {
          return;
        }

        if (Math.abs(event.deltaY) < 8) {
          return;
        }

        const now = Date.now();
        if (now - lastWheelAtRef.current < WHEEL_THROTTLE_MS) {
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
      onPointerDown={(event) => {
        if (!hasManyItems) {
          return;
        }

        dragStartYRef.current = event.clientY;
        dragLastYRef.current = event.clientY;
        dragStartAtRef.current = performance.now();
        dragLastAtRef.current = dragStartAtRef.current;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!isDragging) {
          return;
        }

        dragLastYRef.current = event.clientY;
        dragLastAtRef.current = performance.now();
        setDragOffset(event.clientY - dragStartYRef.current);
      }}
      onPointerUp={(event) => {
        finishDrag(event.pointerId, event.currentTarget);
      }}
      onPointerCancel={(event) => {
        finishDrag(event.pointerId, event.currentTarget);
      }}
      onPointerLeave={(event) => {
        if (isDragging && !event.currentTarget.hasPointerCapture(event.pointerId)) {
          finishDrag();
        }
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c121b] via-[#0c121b]/62 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c121b] via-[#0c121b]/60 to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[20rem] -translate-y-1/2 rounded-2xl border border-white/[0.07] bg-white/[0.01]" />

      <div className="relative h-full touch-none select-none">
        {visibleSlots.map(({ slot, index, y }) => {
          const item = items[index];
          if (!item) {
            return null;
          }

          const isActive = slot === "active";
          const variant = isActive ? "active" : "adjacent";

          return (
            <motion.div
              key={`${slot}-${item.role}-${item.company}-${item.start}`}
              className="absolute left-2 right-2 top-1/2 -translate-y-1/2 sm:left-3 sm:right-3"
              animate={{
                y: y + (isDragging ? dragOffset : 0)
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : isDragging
                    ? { duration: 0 }
                    : { duration: 0.28, ease: [0.2, 1, 0.3, 1] }
              }
              style={{
                zIndex: slot === "active" ? 30 : 20
              }}
            >
              <ExperienceCard
                item={item}
                mode="carousel"
                carouselVariant={variant}
                isActive={isActive}
                isInteractive={!isDragging}
                onActivate={() => {
                  if (!canTriggerClick()) {
                    return;
                  }

                  goTo(index);
                }}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          );
        })}
      </div>

      <p className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-text/45">
        Scroll, drag, arrow keys, or click a card to move focus.
      </p>
    </div>
  );
}
