import { contact } from "../../content/contact";
import { Section } from "../layout/Section";
import { toMailtoLink, withBaseUrl } from "../../utils/url";

export function ContactSection(): JSX.Element {
  const resumeHref = withBaseUrl(contact.resumeFileName);
  const emailHref = toMailtoLink(contact.email, contact.emailSubject);

  return (
    <Section id="contact" variant="flow" accent="indigo" title={contact.title} subtitle={contact.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <p className="muted max-w-3xl leading-7">{contact.body}</p>
        <div className="relative min-h-[200px]">
          <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-accent-2/75 to-transparent" />
          <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(91,140,255,0.16),transparent_46%),radial-gradient(circle_at_75%_70%,rgba(55,208,201,0.14),transparent_42%)]" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <a
          className="inline-flex items-center rounded-full border border-accent/55 bg-accent/15 px-4 py-2 text-sm font-semibold text-text transition duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          href={emailHref}
          aria-label="Email Lucas Vacis"
        >
          Email Me
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          href={contact.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="inline-flex items-center rounded-full border border-border bg-surface-2/55 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          href={resumeHref}
          download="Lucas-Vacis-Resume.pdf"
          aria-label="Download Lucas Vacis resume PDF"
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
