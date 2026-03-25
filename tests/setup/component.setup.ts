import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve(): void {}
}

if (!globalThis.IntersectionObserver) {
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver
  });
}

vi.mock("framer-motion", async () => {
  const motionProps = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileInView",
    "whileHover",
    "whileTap",
    "viewport",
    "layout",
    "layoutId"
  ]);

  const createMotionProxy = (): Record<string, React.ForwardRefExoticComponent<any>> =>
    new Proxy(
      {},
      {
        get: (_, tag: string) =>
          React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
            const cleanProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
            return React.createElement(tag, { ...cleanProps, ref }, children);
          })
      }
    );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: createMotionProxy(),
    useReducedMotion: () => false
  };
});
