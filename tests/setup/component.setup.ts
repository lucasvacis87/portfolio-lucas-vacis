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

class MockResizeObserver {
  disconnect(): void {}
  observe(): void {}
  unobserve(): void {}
}
if (!globalThis.IntersectionObserver) {
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver
  });
}

if (!globalThis.ResizeObserver) {
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    value: MockResizeObserver
  });
}

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
}

if (!document.execCommand) {
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue(true)
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
        get: (_, tag: string) => {
          return React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
            const cleanProps = Object.fromEntries(Object.entries(props).filter(([key]) => !motionProps.has(key)));
            return React.createElement(tag, { ...cleanProps, ref }, children);
          });
        }
      }
    );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    motion: createMotionProxy(),
    useReducedMotion: () => false
  };
});
