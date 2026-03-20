import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "../../../types/content";
import { ExperienceCard } from "./ExperienceCard";

type ExperienceCarouselProps = {
  items: ExperienceItem[];
  activeIndex: number;
  onChangeActive: (nextIndex: number) => void;
  reducedMotion: boolean;
  scrollEnabled: boolean;
  onEnableScroll: () => void;
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

export function ExperienceCarousel({
  items,
  activeIndex,
  onChangeActive,
  reducedMotion,
  scrollEnabled,
  onEnableScroll
}: ExperienceCarouselProps): JSX.Element {
  const boardRef = useRef<HTMLDivElement | null>(null);
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

  const virtualIndexRef = useRef(activeIndex);
  const scrollEnabledRef = useRef(scrollEnabled);
  const itemsLengthRef = useRef(items.length);

  const setVirtualPosition = (position: number): void => {
    const clamped = clampPosition(position, items.length);
    virtualIndexRef.current = clamped;
    setVirtualIndex(clamped);
  };

  const snapTo = (projectedPosition: number): void => {
    const snapped = clampIndex(Math.round(projectedPosition), items.length);
    virtualIndexRef.current = snapped;
    setVirtualIndex(snapped);
    onChangeActive(snapped);
  };

  useEffect(() => {
    scrollEnabledRef.current = scrollEnabled;
  }, [scrollEnabled]);

  useEffect(() => {
    itemsLengthRef.current = items.length;
  }, [items.length]);

  useEffect(() => {
    if (isDragging || isWheeling) {
      return;
    }

    virtualIndexRef.current = activeIndex;
    setVirtualIndex(activeIndex);
  }, [activeIndex, isDragging, isWheeling]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) {
      return;
    }

    const onWheelNative = (event: WheelEvent): void => {
      if (!scrollEnabledRef.current || itemsLengthRef.current <= 1) {
        return;
      }

      const atTopEdge = virtualIndexRef.current <= 0.001;
      const atBottomEdge = virtualIndexRef.current >= itemsLengthRef.current - 1 - 0.001;
      const isScrollingUp = event.deltaY < 0;
      const isScrollingDown = event.deltaY > 0;
      const shouldReleaseToPage = (atTopEdge && isScrollingUp) || (atBottomEdge && isScrollingDown);

      if (shouldReleaseToPage) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();
      const previousAt = lastMoveAtRef.current || now;
      const dt = Math.max(now - previousAt, 1);

      const deltaIndex = event.deltaY / DRAG_STEP_PX;
      const currentPosition = virtualIndexRef.current;
      const nextPosition = clampPosition(currentPosition + deltaIndex, itemsLengthRef.current);

      velocityIndexRef.current = deltaIndex / dt;
      lastMoveAtRef.current = now;
      virtualIndexRef.current = nextPosition;
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
    };

    board.addEventListener("wheel", onWheelNative, { passive: false });

    return () => {
      board.removeEventListener("wheel", onWheelNative);
    };
  }, [items.length, onChangeActive]);

  const moveBy = (step: number): void => {
    snapTo(activeIndex + step);
  };

  const canTriggerClick = (): boolean => Date.now() > justDraggedUntilRef.current;

  const focusIndex = useMemo(() => clampIndex(Math.round(virtualIndex), items.length), [virtualIndex, items.length]);
  const isSettled = !isDragging && !isWheeling && Math.abs(virtualIndex - focusIndex) < 0.02;

  return (
    <div
      ref={boardRef}
      aria-label="Experience timeline carousel"
      role="region"
      tabIndex={0}
      className={`relative h-[46rem] overflow-hidden rounded-[1.4rem] bg-transparent p-0 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
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
        if (!scrollEnabled || items.length <= 1) {
          return;
        }

        dragStartYRef.current = event.clientY;
        dragStartPosRef.current = virtualIndexRef.current;
        lastMoveYRef.current = event.clientY;
        lastMoveAtRef.current = performance.now();
        velocityIndexRef.current = 0;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!scrollEnabled || !isDragging) {
          return;
        }

        const now = performance.now();
        const dt = Math.max(now - lastMoveAtRef.current, 1);
        const dy = event.clientY - lastMoveYRef.current;

        velocityIndexRef.current = -dy / DRAG_STEP_PX / dt;
        lastMoveYRef.current = event.clientY;
        lastMoveAtRef.current = now;

        const deltaFromStart = event.clientY - dragStartYRef.current;
        setVirtualPosition(dragStartPosRef.current - deltaFromStart / DRAG_STEP_PX);
      }}
      onPointerUp={(event) => {
        if (!scrollEnabled || !isDragging) {
          return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        const projected = virtualIndexRef.current + velocityIndexRef.current * DRAG_STEP_PX * INERTIA_GAIN;
        snapTo(projected);
        velocityIndexRef.current = 0;
        justDraggedUntilRef.current = Date.now() + 180;
      }}
      onPointerCancel={(event) => {
        if (!scrollEnabled || !isDragging) {
          return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }

        setIsDragging(false);
        snapTo(virtualIndexRef.current);
        velocityIndexRef.current = 0;
      }}
    >
      {!scrollEnabled ? (
        <button
          type="button"
          onClick={onEnableScroll}
          className="absolute inset-0 z-40 flex items-center justify-center rounded-[1.4rem] bg-[#0c121b]/70 backdrop-blur-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          aria-label="Enable carousel scrolling"
        >
          <span className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-semibold text-text/86 shadow-[0_10px_24px_rgba(0,0,0,0.32)]">
            Click to enable carousel scroll
          </span>
        </button>
      ) : null}

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
        Scroll or use controls to explore.
      </p>
    </div>
  );
}
