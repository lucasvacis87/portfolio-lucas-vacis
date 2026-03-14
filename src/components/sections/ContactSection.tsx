import { contact } from "../../content/contact";
import { Section } from "../layout/Section";

export function ContactSection(): JSX.Element {
  return (
    <Section id="contact" title={contact.title} subtitle={contact.subtitle}>
      <p className="muted max-w-3xl leading-7">{contact.body}</p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <a
          className="inline-flex items-center rounded-full border border-accent/55 bg-accent/15 px-4 py-2 text-sm font-semibold text-text transition hover:shadow-glow"
          href={`mailto:${contact.email}`}
        >
          Email Me
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text"
          href={contact.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text"
          href={contact.resume}
          target="_blank"
          rel="noreferrer"
        >
          Download Resume
        </a>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
        <span>{contact.location}</span>
      </div>
      <p className="muted mt-4 text-sm">{contact.closing}</p>
    </Section>
  );
}
