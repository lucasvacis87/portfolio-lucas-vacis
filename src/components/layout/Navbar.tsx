import { navigationItems } from "../../content/site";
import { Container } from "./Container";

export function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-5">
        <a href="#hero" className="shrink-0 font-heading text-sm tracking-[0.18em] text-accent">
          LUCAS VACIS
        </a>
        <nav className="no-scrollbar flex grow items-center gap-4 overflow-x-auto text-xs uppercase tracking-[0.08em] text-muted md:text-sm md:normal-case md:tracking-normal">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-text">
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
