import {
  createAlternatingNavigationScenarios,
  createRepeatedNavigationScenarios,
  type RepeatedNavScenario
} from "./contracts";
import { desktopNavCases, type NavigationCase } from "./navigationCases";

export type { RepeatedNavScenario };

export const repeatedDesktopNavScenarios = createRepeatedNavigationScenarios("repeatedDesktopNavScenarios", [
  { label: "Impact", anchor: "#impact", times: 4 },
  { label: "Repositories", anchor: "#repositories", times: 3 }
], desktopNavCases);

export const alternatingDesktopNavScenarios: readonly NavigationCase[] = createAlternatingNavigationScenarios(
  "alternatingDesktopNavScenarios",
  [
  { label: "Impact", anchor: "#impact" },
  { label: "QA + AI", anchor: "#vision" },
  { label: "What I Bring", anchor: "#services" },
  { label: "Engineering Stack", anchor: "#engineering-capabilities" }
  ],
  desktopNavCases
);
