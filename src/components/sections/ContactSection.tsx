import { contact } from "../../content/contact";
import { Section } from "../layout/Section";
import { toMailtoLink, withBaseUrl } from "../../utils/url";

export function ContactSection(): JSX.Element {
  const resumeHref = withBaseUrl(contact.resumeFileName);
  const emailHref = toMailtoLink(contact.email, contact.emailSubject);

  return (
    <Section id="contact" title={contact.title} subtitle={contact.subtitle}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <p className="muted max-w-3xl leading-7">{contact.body}</p>
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-[radial-gradient(circle_at_22%_26%,rgba(91,140,255,0.18),transparent_40%),radial-gradient(circle_at_80%_78%,rgba(55,208,201,0.2),transparent_40%),linear-gradient(145deg,rgba(17,22,29,0.92),rgba(10,14,19,0.9))]">
          <div className="h-full min-h-[200px] bg-[linear-gradient(rgba(155,167,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-75" />
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
