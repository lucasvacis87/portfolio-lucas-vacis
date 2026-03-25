import type { ImpactAchievementsContent } from "../types/content";

export const about: ImpactAchievementsContent = {
  title: "Impact & Achievements",
  items: [
    {
      metric: "40min \u2192 5min",
      description: "Reduced end-to-end execution time by implementing parallel Cypress runs in CI."
    },
    {
      metric: "Reliable PR Signal",
      description: "Stabilized PR automation to be used as a trusted quality gate."
    },
    {
      metric: "Test Stability",
      description: "Reduced CI flakiness and intermittent failures."
    },
    {
      metric: "CI Quality Gates",
      description: "Automation integrated into CI/CD as a release control point."
    }
  ]
};

