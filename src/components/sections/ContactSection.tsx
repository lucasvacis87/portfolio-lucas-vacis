import { contact } from "../../content/contact";
import { Section } from "../layout/Section";
import { toMailtoLink, withBaseUrl } from "../../utils/url";

export function ContactSection(): JSX.Element {
  const resumeHref = withBaseUrl(contact.resumeFileName);
  const emailHref = toMailtoLink(contact.email, contact.emailSubject);

  return (
    <Section id="contact" variant="panel" accent="indigo" headerAlign="center" title="Let's Connect" subtitle={contact.subtitle}>
      <div className="relative overflow-hidden rounded-2xl border border-border/45 bg-[radial-gradient(circle_at_22%_26%,rgba(78,128,255,0.18),transparent_40%),radial-gradient(circle_at_80%_78%,rgba(125,99,255,0.16),transparent_40%),linear-gradient(145deg,rgba(17,22,29,0.9),rgba(10,14,19,0.86))] px-5 py-6 text-center md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(155,167,180,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(155,167,180,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-45" />
        <p className="relative mx-auto max-w-[62ch] text-sm leading-6 text-muted">{contact.body}</p>
        <div className="relative mt-6 flex flex-wrap justify-center gap-2.5">
          <a
            className="inline-flex items-center rounded-full border border-accent-2/40 bg-accent-2/14 px-4 py-2 text-sm font-semibold text-text transition duration-300 hover:-translate-y-0.5 hover:border-accent-2/60 hover:bg-accent-2/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            href={emailHref}
            aria-label="Email Lucas Vacis"
          >
            Email
          </a>
          <a
            className="inline-flex items-center rounded-full border border-border/65 bg-surface-2/45 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/28 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="inline-flex items-center rounded-full border border-border/65 bg-surface-2/45 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/28 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            href={contact.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="inline-flex items-center rounded-full border border-border/65 bg-surface-2/45 px-4 py-2 text-sm font-semibold text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/28 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            href={resumeHref}
            download="Lucas-Vacis-Resume.pdf"
            aria-label="Download Lucas Vacis resume PDF"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted">
        <span>{contact.email}</span>
        <span>{contact.phone}</span>
        <span>{contact.location}</span>
      </div>
      <p className="muted mt-4 text-center text-sm">{contact.closing}</p>
    </Section>
  );
}
