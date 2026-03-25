import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Menu, X } from "lucide-react";
import { navigationItems } from "../../content/site";
import { containerClassName } from "./Container";

function getActiveHref(offset = 120): string {
  let nextActive = "#hero";
  let bestDistance = Number.POSITIVE_INFINITY;

  navigationItems.forEach((item) => {
    const section = document.querySelector<HTMLElement>(item.href);
    if (!section) {
      return;
    }

    const style = window.getComputedStyle(section);
    if (style.display === "none" || style.visibility === "hidden") {
      return;
    }

    const rect = section.getBoundingClientRect();
    const isInViewBand = rect.top <= window.innerHeight * 0.6 && rect.bottom >= offset;
    const distance = Math.abs(rect.top - offset);

    if (isInViewBand && distance < bestDistance) {
      bestDistance = distance;
      nextActive = item.href;
      return;
    }

    if (bestDistance === Number.POSITIVE_INFINITY && rect.top <= offset) {
      nextActive = item.href;
    }
  });

  return nextActive;
}

export function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#hero");
  const mobileNavigationItems = navigationItems.filter((item) => item.href !== "#engineering-capabilities");

  const closeMenu = (): void => setIsOpen(false);
  const handleNavClick = (href: string): void => {
    setActiveHref(href);
    closeMenu();
    requestAnimationFrame(() => {
      setActiveHref(getActiveHref());
    });
  };

  useEffect(() => {
    const updateActiveSection = (): void => {
      setActiveHref(getActiveHref());
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-bg/78 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <div className={`relative ${containerClassName}`}>
        <span className="separator-soft pointer-events-none absolute inset-x-0 bottom-0 h-px" />
        <div className="flex h-14 items-center gap-4">
          <a
            href="#hero"
            aria-label="Go to hero section"
            className="shrink-0 rounded-sm bg-accent-2/14 p-1.5 text-accent-2 transition hover:bg-accent-2/24 sm:p-2"
          >
            <FlaskConical className="h-6 w-6 md:h-7 md:w-7" aria-hidden="true" />
          </a>
          <nav className="ml-auto hidden items-center gap-1.5 text-[12px] text-muted md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={`group relative whitespace-nowrap rounded-sm px-2.5 py-1.5 transition-all duration-200 ${
                  activeHref === item.href
                    ? "text-text"
                    : "text-muted/65 hover:bg-surface-2/45 hover:text-text"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-200 ${
                    activeHref === item.href
                      ? "w-[70%] opacity-100 shadow-[0_0_10px_rgba(78,128,255,0.35)]"
                      : "w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-70"
                  }`}
                />
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((current) => !current)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md bg-surface-2/60 text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu backdrop"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 top-16 z-30 bg-black/55 md:hidden"
              />
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, y: -10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.22, ease: [0.2, 1, 0.3, 1] }}
                className="absolute left-0 right-0 top-[calc(100%-0.35rem)] z-40 md:hidden"
              >
                <nav className="mt-2 overflow-hidden rounded-xl bg-[#0f141b] p-2 shadow-[0_22px_48px_rgba(0,0,0,0.55)]">
                  {mobileNavigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      aria-current={activeHref === item.href ? "page" : undefined}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-[#1b222c] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
