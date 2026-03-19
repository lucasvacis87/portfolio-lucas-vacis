import type { ContactContent } from "../types/content";

export const contact: ContactContent = {
  title: "Let's Connect",
  subtitle: "Open to QA Automation, SDET, and quality engineering opportunities.",
  body: "If you need someone to strengthen automation architecture, CI quality workflows, and AI-assisted delivery, let's talk.",
  availabilityNote: "Typically replies within 24-48h.",
  closing: "Focused on scalable systems, clean execution, and continuous improvement.",
  actions: [
    {
      id: "email",
      label: "Email",
      href: "mailto:lucasvacis@gmail.com?subject=Portfolio%20Contact%20-%20QA%20Automation%20Collaboration",
      tone: "primary",
      ariaLabel: "Email Lucas Vacis",
      icon: "mail"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/lucas-vacis",
      external: true,
      tone: "secondary",
      icon: "linkedin"
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/lucasvacis87",
      external: true,
      tone: "secondary",
      icon: "github"
    },
    {
      id: "resume",
      label: "Resume",
      href: "resume.pdf",
      download: "Lucas-Vacis-Resume.pdf",
      ariaLabel: "Download Lucas Vacis resume PDF",
      tone: "secondary",
      icon: "resume"
    }
  ],
  details: [
    {
      label: "Email",
      value: "lucasvacis@gmail.com",
      href: "mailto:lucasvacis@gmail.com?subject=Portfolio%20Contact%20-%20QA%20Automation%20Collaboration"
    },
    {
      label: "Phone",
      value: "+54 9 11 3195 1392",
      href: "tel:+5491131951392"
    },
    {
      label: "Location",
      value: "Buenos Aires, Argentina"
    }
  ]
};
