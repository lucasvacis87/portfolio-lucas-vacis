import { siteMeta } from "../../content/site";
import { Container } from "./Container";

export function Footer(): JSX.Element {
  return (
    <footer className="relative py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <span className="separator-soft pointer-events-none absolute inset-x-0 top-0 h-px" />
      <Container className="relative flex flex-col items-center gap-2 text-sm text-muted md:flex-row md:justify-between">
        <p>{siteMeta.copyright}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">{siteMeta.tagline}</p>
      </Container>
    </footer>
  );
}
