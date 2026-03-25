import { createContactCases } from "./contracts";

export const contactCases = createContactCases("contactCases", {
  actions: {
    email: {
      label: "Email Lucas Vacis",
      href: /^mailto:lucasvacis@gmail\.com\?subject=Portfolio%20Contact%20-%20QA%20Automation%20Collaboration$/
    },
    linkedIn: {
      label: "LinkedIn",
      href: /linkedin\.com\/in\/lucas-vacis\/?$/,
      target: "_blank",
      rel: "noreferrer"
    },
    github: {
      label: "GitHub",
      href: /github\.com\/lucasvacis87\/?$/,
      target: "_blank",
      rel: "noreferrer"
    },
    resume: {
      label: "Download Lucas Vacis resume PDF",
      href: /\/resume\.pdf$/,
      download: "Lucas-Vacis-Resume.pdf"
    }
  },
  details: {
    email: {
      label: "Email:",
      href: /^mailto:lucasvacis@gmail\.com\?subject=Portfolio%20Contact%20-%20QA%20Automation%20Collaboration$/
    },
    phone: {
      label: "Phone:",
      href: /^tel:\+5491131951392$/
    }
  }
} as const);
