import { siteMeta } from "../../content/site";
import { Container } from "./Container";

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border/60 py-8">
      <Container className="flex flex-col items-center gap-2 text-sm text-muted md:flex-row md:justify-between">
        <p>{siteMeta.copyright}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em]">{siteMeta.tagline}</p>
      </Container>
    </footer>
  );
}
