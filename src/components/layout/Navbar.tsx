import { navigationItems } from "../../content/site";
import { Container } from "./Container";

export function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-bg/85 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href="#hero" className="font-heading text-sm tracking-[0.18em] text-accent">
          LUCAS VACIS
        </a>
        <nav className="hidden gap-5 text-sm text-muted md:flex">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-text">
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

