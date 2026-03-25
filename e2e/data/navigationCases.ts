import {
  createMobileNavigationCases,
  createNavigationCases,
  type NavigationCase,
  type SectionAnchor
} from "./contracts";

export type { NavigationCase, SectionAnchor };

export const desktopNavCases = createNavigationCases("desktopNavCases", [
  { label: "Home", anchor: "#hero" },
  { label: "Impact", anchor: "#impact" },
  { label: "Experience", anchor: "#experience" },
  { label: "Engineering Stack", anchor: "#engineering-capabilities" },
  { label: "What I Bring", anchor: "#services" },
  { label: "Repositories", anchor: "#repositories" },
  { label: "QA + AI", anchor: "#vision" },
  { label: "Contact", anchor: "#contact" }
]);

export const mobileNavCases = createMobileNavigationCases("mobileNavCases", [
  { label: "Home", anchor: "#hero" },
  { label: "Impact", anchor: "#impact" },
  { label: "Experience", anchor: "#experience" },
  { label: "What I Bring", anchor: "#services" },
  { label: "Repositories", anchor: "#repositories" },
  { label: "QA + AI", anchor: "#vision" },
  { label: "Contact", anchor: "#contact" }
], desktopNavCases);
