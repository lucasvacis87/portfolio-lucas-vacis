import { contact } from "../../content/contact";
import { Section } from "../layout/Section";

export function ContactSection(): JSX.Element {
  return (
    <Section id="contact" title="Contact" subtitle={contact.subtitle}>
      <div className="flex flex-col gap-3 text-sm md:text-base">
        <a className="text-accent transition hover:text-accent-2" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        <a className="muted transition hover:text-text" href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
          {contact.phone}
        </a>
        <p className="muted">{contact.location}</p>
        <a className="muted transition hover:text-text" href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="muted transition hover:text-text" href={contact.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </Section>
  );
}
