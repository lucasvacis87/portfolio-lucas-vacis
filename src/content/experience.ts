import type { ExperienceItem } from "../types/content";

export const experienceIntro = {
  subtitle: "Delivering scalable quality engineering across US and LATAM product teams through automation-first execution.",
  paragraphs: [
    "My experience spans UI, API, and mobile quality across SaaS, fintech, telecom, and product-platform ecosystems, with strong ownership of automation architecture, CI quality gates, and release confidence."
  ]
};

export const experience: ExperienceItem[] = [
  {
    role: "Sr QA Automation Engineer (SDET) | Forte Group / NBC SportsEngine",
    context: "US | Web + API quality architecture for user, household, and organization workflows",
    period: "08/2024 - Present",
    summary:
      "Leading Cypress + TypeScript automation strategy, validating REST/GraphQL services, and driving CI parallelization and QA process improvements across GitHub Actions, staging, and PR preview environments."
  },
  {
    role: "Sr QA Automation Engineer | Distillery / Scorpion",
    context: "US | UI automation, GraphQL quality, and CI/CD quality checks",
    period: "02/2022 - 08/2024",
    summary:
      "Designed and maintained Cypress, Cucumber, and TypeScript automation suites, executed front-end/back-end/GraphQL testing, and partnered with product and engineering teams to improve release readiness."
  },
  {
    role: "Sr QA Engineer | CocoPago",
    context: "US | Web and mobile quality strategy and execution",
    period: "06/2021 - 02/2022",
    summary:
      "Planned and executed functional, backend, and cross-browser testing for web/mobile products, automated regression with Selenium + Java, validated APIs with Postman, and tested IPA/APK release builds."
  },
  {
    role: "Sr QA Automation Engineer | GlobalLogic / Claro",
    context: "Argentina | Web automation and API validation",
    period: "12/2020 - 06/2021",
    summary:
      "Built test plans and scalable Selenium + Java + TestNG (POM) suites, migrated high-value manual regression flows to automation, and strengthened REST validation through response and log analysis."
  },
  {
    role: "QA Automation Engineer | Cognizant Softvision / Schneider Electric",
    context: "Argentina | Web/backend quality automation and analysis",
    period: "07/2020 - 12/2020",
    summary:
      "Executed automation and manual analysis with .NET, Selenium, NUnit, Postman, and Azure DevOps while improving sprint coverage through maintainable suites, test cases, and execution plans."
  },
  {
    role: "QA Analyst | Rappi",
    context: "Argentina | Integration and API quality workflows",
    period: "05/2019 - 07/2020",
    summary:
      "Validated end-to-end integrations and business-critical features, migrated manual coverage to Katalon Studio, and enabled team adoption through automation training and troubleshooting support."
  },
  {
    role: "QA Analyst | MRM//McCann",
    context: "Argentina | Website release quality and cross-team collaboration",
    period: "09/2017 - 05/2019",
    summary:
      "Executed structured manual testing across regression, smoke, and integration scopes while collaborating with US teams to align requirements, communication, and release quality expectations."
  }
];
