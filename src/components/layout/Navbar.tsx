import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Menu, X } from "lucide-react";
import { navigationItems } from "../../content/site";
import { containerClassName } from "./Container";

export function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#hero");

  const closeMenu = (): void => setIsOpen(false);

  useEffect(() => {
    const updateActiveSection = (): void => {
      let nextActive = "#hero";

      navigationItems.forEach((item) => {
        const section = document.querySelector<HTMLElement>(item.href);
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          nextActive = item.href;
        }
      });

      setActiveHref(nextActive);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border/45 bg-bg/78 backdrop-blur-xl">
      <div className={`relative ${containerClassName}`}>
        <div className="flex h-14 items-center gap-4">
          <a
            href="#hero"
            aria-label="Go to hero section"
            className="shrink-0 rounded-sm bg-accent-2/14 p-2 text-accent-2 transition hover:bg-accent-2/24"
          >
            <FlaskConical size={28} aria-hidden="true" />
          </a>
          <nav className="ml-auto hidden items-center gap-1.5 text-[12px] text-muted md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
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
          <a
            href="#contact"
            className="hidden rounded-sm bg-surface-2/35 px-3 py-1.5 text-[12px] font-semibold text-muted transition-all duration-200 hover:bg-accent-2/14 hover:text-text md:inline-flex"
          >
            Contact
          </a>
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
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-[#1b222c] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#repositories"
                    onClick={closeMenu}
                    className="mt-2 block rounded-xl bg-accent/10 px-3 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    View Repositories
                  </a>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
