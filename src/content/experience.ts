import type { ExperienceItem } from "../types/content";

export const experienceIntro = {
  subtitle: "Eight-plus years building automation systems and owning release quality across web, APIs, and integrated services.",
  paragraphs: []
};

export const experience: ExperienceItem[] = [
  {
    role: "Sr QA Automation Engineer",
    company: "Forte Group · NBC SportsEngine",
    location: "Remote · US client",
    start: "Aug 2024",
    end: "Present",
    isCurrent: true,
    impactSummary: "Leading Playwright migration, AI-augmented QA workflows, and parallel CI quality architecture for critical product coverage.",
    tech: ["Playwright", "Cypress", "TypeScript", "Jest", "REST", "GraphQL", "CI/CD"],
    details: {
      impact: [
        "Leading migration of critical end-to-end coverage from Cypress to Playwright with TypeScript.",
        "Designed and validated cross-repository authentication-token caching with prewarming, worker hydration, concurrent-request deduplication, expiration handling, and focused Jest coverage.",
        "Architected parallel CI execution and quality gates across pull requests, preview environments, and staging."
      ],
      responsibilities: [
        "Define framework conventions, reusable fixtures, page objects, authentication and session patterns, test data, and CI execution standards.",
        "Direct Codex-assisted workflows for repository analysis, test implementation, code review, CI diagnostics, staging validation, and pull-request delivery.",
        "Validate REST and GraphQL services, assess technical risk, and provide evidence-based release recommendations."
      ],
      systems: [
        "Playwright and Cypress architecture with TypeScript, reusable fixtures, and page objects.",
        "Reusable guardrails that enforce Playwright spec architecture.",
        "Parallel CI quality gates, API validation, and focused Jest coverage."
      ]
    }
  },
  {
    role: "Sr QA Automation Engineer",
    company: "Distillery · Scorpion",
    location: "Remote · US client",
    start: "Feb 2022",
    end: "Aug 2024",
    isCurrent: false,
    impactSummary: "Built critical UI, backend, and GraphQL coverage while strengthening CI/CD quality checks and release readiness.",
    tech: ["Cypress", "Cucumber", "TypeScript", "GraphQL", "CI/CD", "Postman"],
    details: {
      impact: [
        "Designed and maintained automation for critical UI workflows and regression coverage.",
        "Strengthened coverage across front-end, back-end, and GraphQL queries and mutations.",
        "Integrated automated checks into CI/CD to support reliable release readiness."
      ],
      responsibilities: [
        "Maintained Cypress, Cucumber, and TypeScript automation suites.",
        "Partnered with developers and product owners on planning, defect analysis, and release readiness.",
        "Validated behavior across product layers, from UI flows to GraphQL services."
      ],
      systems: [
        "Cypress, Cucumber, and TypeScript test automation.",
        "GraphQL queries and mutations validation.",
        "Postman and CI/CD-integrated automated checks."
      ]
    }
  },
  {
    role: "Sr QA Engineer",
    company: "CocoPago",
    location: "Remote · US company",
    start: "Jun 2021",
    end: "Feb 2022",
    isCurrent: false,
    impactSummary: "Planned risk-based validation for web and mobile releases while expanding pragmatic automation coverage.",
    tech: ["Selenium", "Java", "Postman", "iOS", "Android", "Cross-browser"],
    details: {
      impact: [
        "Planned and executed risk-based testing across web and mobile applications.",
        "Automated regression scenarios with Selenium and Java.",
        "Validated release quality across functional, backend, cross-browser, and mobile scopes."
      ],
      responsibilities: [
        "Validated APIs with Postman and tested iOS and Android builds.",
        "Covered functional and backend behavior before release windows.",
        "Balanced risk-based manual validation with regression automation."
      ],
      systems: [
        "Selenium and Java regression automation.",
        "Postman API validation.",
        "iOS, Android, and cross-browser release testing."
      ]
    }
  },
  {
    role: "Sr QA Automation Engineer",
    company: "GlobalLogic · Claro",
    location: "Argentina",
    start: "Dec 2020",
    end: "Jun 2021",
    isCurrent: false,
    impactSummary: "Migrated manual regression coverage into maintainable web automation and strengthened REST validation through response and log analysis.",
    tech: ["Selenium", "Java", "TestNG", "Page Object Model", "REST"],
    details: {
      impact: [
        "Built Selenium, Java, TestNG, and Page Object Model automation for core web workflows.",
        "Migrated manual regression scenarios into maintainable automation.",
        "Improved REST confidence through response and log analysis."
      ],
      responsibilities: [
        "Automated high-value web flows with a maintainable page-object structure.",
        "Validated REST services through API responses and logs.",
        "Supported regression coverage for core product workflows."
      ],
      systems: [
        "Selenium, Java, and TestNG.",
        "Page Object Model automation.",
        "REST response and log analysis."
      ]
    }
  },
  {
    role: "QA Automation Engineer",
    company: "Cognizant Softvision · Schneider Electric",
    location: "Argentina",
    start: "Jul 2020",
    end: "Dec 2020",
    isCurrent: false,
    impactSummary: "Supported sprint-level quality with web and backend automation, API validation, and structured execution planning.",
    tech: [".NET", "Selenium", "NUnit", "Postman", "Azure DevOps"],
    details: {
      impact: [
        "Automated web and backend validation for integrated applications.",
        "Maintained test suites, execution plans, and sprint-level coverage.",
        "Supported consistent release validation with structured QA assets."
      ],
      responsibilities: [
        "Maintained automation suites and test execution plans.",
        "Validated APIs with Postman.",
        "Kept sprint-level quality coverage visible in Azure DevOps."
      ],
      systems: [
        ".NET, Selenium, and NUnit automation.",
        "Postman API validation.",
        "Azure DevOps quality tracking."
      ]
    }
  },
  {
    role: "QA Analyst",
    company: "Rappi",
    location: "Argentina",
    start: "May 2019",
    end: "Jul 2020",
    isCurrent: false,
    impactSummary: "Validated business-critical integrations and helped the QA team adopt and troubleshoot automation practices.",
    tech: ["Katalon Studio", "REST API", "Integration Testing", "QA Enablement"],
    details: {
      impact: [
        "Validated business-critical integrations through functional and REST API testing.",
        "Migrated manual cases into Katalon Studio automation.",
        "Enabled wider automation adoption through team training and troubleshooting."
      ],
      responsibilities: [
        "Tested high-value integration behavior.",
        "Transitioned repeatable manual cases into Katalon Studio.",
        "Supported QA team members using and troubleshooting automation."
      ],
      systems: [
        "Katalon Studio.",
        "REST API and integration testing.",
        "Functional validation for business-critical flows."
      ]
    }
  },
  {
    role: "QA Analyst",
    company: "MRM//McCann",
    location: "Argentina",
    start: "Sep 2017",
    end: "May 2019",
    isCurrent: false,
    impactSummary: "Delivered functional, regression, smoke, and integration validation for web releases with US-based teams.",
    tech: ["Functional Testing", "Regression", "Smoke", "Integration Testing", "Release QA"],
    details: {
      impact: [
        "Executed functional, regression, smoke, and integration testing for web releases.",
        "Supported dependable release validation across multiple initiatives.",
        "Aligned quality expectations with US-based teams."
      ],
      responsibilities: [
        "Validated web release behavior across functional and integration scopes.",
        "Collaborated with US-based teams to clarify requirements.",
        "Reported testing evidence to support release-quality expectations."
      ],
      systems: [
        "Functional, regression, and smoke testing.",
        "Integration validation for web releases.",
        "Cross-functional quality communication."
      ]
    }
  }
];
