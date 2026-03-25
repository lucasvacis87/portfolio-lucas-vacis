import type { LucideIcon } from "lucide-react";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { contact } from "../../content/contact";
import type { ContactAction } from "../../types/content";
import { Section } from "../layout/Section";
import { withBaseUrl } from "../../utils/url";

type EmailFeedback = {
  tone: "success" | "error";
  message: string;
};

export function ContactSection(): JSX.Element {
  const [emailFeedback, setEmailFeedback] = useState<EmailFeedback | null>(null);

  const actionIconByKey: Record<ContactAction["icon"], LucideIcon> = {
    mail: Mail,
    linkedin: Linkedin,
    github: Github,
    resume: FileText
  };

  const primaryActionClassName =
    "inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(78,128,255,0.35)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(125,99,255,0.4)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:px-4 sm:text-sm";
  const secondaryActionClassName =
    "inline-flex min-h-10 items-center gap-2 rounded-full bg-surface-2/42 px-3.5 py-2 text-[13px] font-semibold text-muted transition duration-200 hover:-translate-y-0.5 hover:bg-surface-2/72 hover:text-text active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:px-4 sm:text-sm";
  const emailFallbackAddress = useMemo(() => {
    const emailAction = contact.actions.find((action) => action.id === "email");
    if (!emailAction) {
      return "";
    }

    const match = emailAction.href.match(/^mailto:([^?]+)/i);
    return match?.[1] ? decodeURIComponent(match[1]) : "";
  }, []);

  useEffect(() => {
    if (!emailFeedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setEmailFeedback(null);
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [emailFeedback]);

  const copyEmailToClipboard = async (): Promise<boolean> => {
    if (!emailFallbackAddress) {
      return false;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailFallbackAddress);
        return true;
      }
    } catch {
      // Fallback below for browsers without clipboard API support.
    }

    if (typeof document === "undefined") {
      return false;
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = emailFallbackAddress;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  };

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
    event.preventDefault();

    if (typeof window === "undefined") {
      return;
    }

    setEmailFeedback(null);

    let mailClientLikelyOpened = false;

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") {
        mailClientLikelyOpened = true;
      }
    };

    const onWindowBlur = (): void => {
      mailClientLikelyOpened = true;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur, { once: true });

    window.location.href = href;

    window.setTimeout(async () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);

      if (mailClientLikelyOpened) {
        return;
      }

      const copied = await copyEmailToClipboard();
      if (copied) {
        setEmailFeedback({
          tone: "success",
          message: "No default mail app detected. Email copied to clipboard."
        });
        return;
      }

      setEmailFeedback({
        tone: "error",
        message: "Unable to open mail app or copy email. Please use lucasvacis@gmail.com."
      });
    }, 700);
  };

  return (
    <Section id="contact" variant="panel" accent="indigo" headerAlign="center" title={contact.title} subtitle={contact.subtitle}>
      <div className="relative px-2 pb-1 text-center md:px-4">
        <p className="mx-auto max-w-[62ch] text-[13px] leading-6 text-muted md:text-[0.95rem]">{contact.body}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:mt-6 md:gap-2.5">
          {contact.actions.map((action) => {
            const href = action.id === "resume" ? withBaseUrl(action.href) : action.href;
            const className = action.tone === "primary" ? primaryActionClassName : secondaryActionClassName;
            const ActionIcon = actionIconByKey[action.icon];

            return (
              <a
                key={action.id}
                className={className}
                href={href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                download={action.download}
                aria-label={action.ariaLabel}
                onClick={action.id === "email" ? (event) => handleEmailClick(event, action.href) : undefined}
              >
                <ActionIcon size={15} aria-hidden="true" />
                {action.label}
              </a>
            );
          })}
        </div>
        {emailFeedback ? (
          <p
            role="status"
            aria-live="polite"
            className={`mt-3 text-xs font-medium md:text-sm ${
              emailFeedback.tone === "success" ? "text-[#9fd8c9]" : "text-[#f3b3be]"
            }`}
          >
            {emailFeedback.message}
          </p>
        ) : null}
        <div className="relative mx-auto mt-7 max-w-3xl pt-4">
          <span className="separator-soft pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-y-2 text-[13px] text-text/82 md:text-sm">
            {contact.details.map((detail, index) => (
              <div key={detail.label} className="inline-flex items-center">
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="font-medium text-text/85 transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    aria-label={`${detail.label}: ${detail.value}`}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="font-medium text-text/85">{detail.value}</span>
                )}
                {index < contact.details.length - 1 ? <span className="mx-3 h-4 w-px bg-white/18" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-medium uppercase tracking-[0.08em] text-text/66">{contact.availabilityNote}</p>
        </div>
      </div>
      <p className="muted mt-4 text-center text-sm">{contact.closing}</p>
    </Section>
  );
}
