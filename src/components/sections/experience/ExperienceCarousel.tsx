import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceCarouselProps = {
  items: ExperienceItem[];
  activeIndex: number;
  onChangeActive: (nextIndex: number) => void;
  reducedMotion: boolean;
};

const WHEEL_SNAP_DELAY_MS = 140;
const DRAG_STEP_PX = 300;
const ACTIVE_TOP_PX = 104;
const SLOT_OFFSET_PX = 372;
const RENDER_DISTANCE = 2.2;
const INERTIA_GAIN = 0.2;

function clampIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

function clampPosition(position: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(position, 0), length - 1);
}

export function ExperienceCarousel({ items, activeIndex, onChangeActive, reducedMotion }: ExperienceCarouselProps): JSX.Element {
  const [virtualIndex, setVirtualIndex] = useState(activeIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [isWheeling, setIsWheeling] = useState(false);

  const dragStartYRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastMoveYRef = useRef(0);
  const lastMoveAtRef = useRef(0);
  const velocityIndexRef = useRef(0);
  const wheelTimeoutRef = useRef<number | null>(null);
  const justDraggedUntilRef = useRef(0);

  useEffect(() => {
    if (isDragging || isWheeling) {
      return;
    }

    setVirtualIndex(activeIndex);
  }, [activeIndex, isDragging, isWheeling]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  const snapTo = (projectedPosition: number): void => {
    const snapped = clampIndex(Math.round(projectedPosition), items.length);
    setVirtualIndex(snapped);
    onChangeActive(snapped);
  };

  const moveBy = (step: number): void => {
    snapTo(activeIndex + step);
  };

  const canTriggerClick = (): boolean => Date.now() > justDraggedUntilRef.current;

  const focusIndex = useMemo(() => clampIndex(Math.round(virtualIndex), items.length), [virtualIndex, items.length]);
  const isSettled = !isDragging && !isWheeling && Math.abs(virtualIndex - focusIndex) < 0.02;

  return (
    <div
      aria-label="Experience timeline carousel"
      role="region"
      tabIndex={0}
      className={`relative h-[46rem] overflow-hidden rounded-[1.4rem] bg-transparent p-0 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onWheel={(event) => {
        if (items.length <= 1) {
          return;
        }

        event.preventDefault();

        const now = performance.now();
        const previousAt = lastMoveAtRef.current || now;
        const dt = Math.max(now - previousAt, 1);

        const deltaIndex = event.deltaY / DRAG_STEP_PX;
        const nextPosition = clampPosition(virtualIndex + deltaIndex, items.length);

        velocityIndexRef.current = deltaIndex / dt;
        lastMoveAtRef.current = now;
        setVirtualIndex(nextPosition);
        setIsWheeling(true);

        if (wheelTimeoutRef.current !== null) {
          window.clearTimeout(wheelTimeoutRef.current);
        }

        wheelTimeoutRef.current = window.setTimeout(() => {
          setIsWheeling(false);
          const projected = nextPosition + velocityIndexRef.current * DRAG_STEP_PX * INERTIA_GAIN;
          snapTo(projected);
          velocityIndexRef.current = 0;
        }, WHEEL_SNAP_DELAY_MS);
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
          snapTo(0);
        }
      }}
      onPointerDown={(event) => {
        if (items.length <= 1) {
          return;
        }

        dragStartYRef.current = event.clientY;
        dragStartPosRef.current = virtualIndex;
        lastMoveYRef.current = event.clientY;
        lastMoveAtRef.current = performance.now();
        velocityIndexRef.current = 0;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!isDragging) {
          return;
        }

        const now = performance.now();
        const dt = Math.max(now - lastMoveAtRef.current, 1);
        const dy = event.clientY - lastMoveYRef.current;

        velocityIndexRef.current = -dy / DRAG_STEP_PX / dt;
        lastMoveYRef.current = event.clientY;
        lastMoveAtRef.current = now;

        const deltaFromStart = event.clientY - dragStartYRef.current;
        const nextPosition = clampPosition(dragStartPosRef.current - deltaFromStart / DRAG_STEP_PX, items.length);
        setVirtualIndex(nextPosition);
      }}
      onPointerUp={(event) => {
        if (!isDragging) {
          return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        const projected = virtualIndex + velocityIndexRef.current * DRAG_STEP_PX * INERTIA_GAIN;
        snapTo(projected);
        velocityIndexRef.current = 0;
        justDraggedUntilRef.current = Date.now() + 180;
      }}
      onPointerCancel={(event) => {
        if (!isDragging) {
          return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        snapTo(virtualIndex);
        velocityIndexRef.current = 0;
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c121b] via-[#0c121b]/62 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c121b] via-[#0c121b]/60 to-transparent" />
      <div className="relative h-full touch-none select-none">
        {items.map((item, index) => {
          const distance = index - virtualIndex;
          if (Math.abs(distance) > RENDER_DISTANCE) {
            return null;
          }

          const isFocus = index === focusIndex;
          const isInteractive = !isDragging && !isWheeling;
          const variant = isSettled && isFocus ? "active" : "adjacent";

          return (
            <motion.div
              key={`${item.role}-${item.company}-${item.start}`}
              className="absolute left-0 right-0"
              style={{
                top: `${ACTIVE_TOP_PX}px`,
                zIndex: 30 - Math.round(Math.abs(distance) * 10)
              }}
              animate={{
                y: distance * SLOT_OFFSET_PX,
                opacity: Math.abs(distance) > 1.4 ? 0 : 1
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : isDragging || isWheeling
                    ? { duration: 0 }
                    : { duration: 0.28, ease: [0.2, 1, 0.3, 1] }
              }
            >
              <ExperienceCard
                item={item}
                mode="carousel"
                carouselVariant={variant}
                isActive={isSettled && isFocus}
                isInteractive={isInteractive}
                onActivate={() => {
                  if (!canTriggerClick()) {
                    return;
                  }

                  snapTo(index);
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

