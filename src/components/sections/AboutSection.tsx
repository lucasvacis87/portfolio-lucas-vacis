import { about } from "../../content/about";
import { Section } from "../layout/Section";

export function AboutSection(): JSX.Element {
  return (
    <Section id="about" title="About" subtitle={about.subtitle}>
      <p className="muted leading-7">{about.body}</p>
    </Section>
  );
}

