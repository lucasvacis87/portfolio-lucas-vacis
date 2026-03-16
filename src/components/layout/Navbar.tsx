import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationItems } from "../../content/site";

export function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8 lg:max-w-[84rem] xl:max-w-[88rem] 2xl:max-w-[96rem]">
        <div className="flex h-16 items-center gap-5">
          <a href="#hero" className="shrink-0 font-heading text-sm tracking-[0.18em] text-accent">
            Lucas Vacis | QA Automation Engineer
          </a>
          <nav className="ml-auto hidden items-center gap-4 text-sm text-muted md:flex">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-text">
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((current) => !current)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2/60 text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
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
                <nav className="mt-2 overflow-hidden rounded-2xl border border-border/85 bg-[#0f141b] p-2 shadow-[0_22px_48px_rgba(0,0,0,0.55)]">
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
                    href="#projects"
                    onClick={closeMenu}
                    className="mt-2 block rounded-xl border border-accent/45 bg-accent/10 px-3 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    View Work
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
