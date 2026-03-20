import type { ExperienceItem } from "../types/content";

export const experienceIntro = {
  subtitle: "Delivering scalable quality engineering across US and LATAM product teams through automation-first execution.",
  paragraphs: [
    "I design automation ecosystems that scale across UI and API surfaces, connect cleanly to CI workflows, and keep release confidence high for product and engineering leadership."
  ]
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior QA Automation Engineer (SDET)",
    company: "Forte Group / NBC SportsEngine",
    location: "US",
    start: "Aug 2024",
    end: "Present",
    isCurrent: true,
    impactSummary: "Leading scalable UI and API automation architecture, improving CI reliability and test stability for high-volume workflows.",
    tech: ["Playwright", "Cypress", "TypeScript", "CI/CD", "Nx", "API Testing", "GraphQL"],
    details: {
      impact: [
        "Improved release confidence by hardening end-to-end coverage for user, household, and organization journeys.",
        "Reduced pipeline instability through better parallelization, retry strategy, and environment-aware validation.",
        "Enabled faster PR feedback by refining quality signals in staging and preview environments."
      ],
      responsibilities: [
        "Own automation strategy across UI and service layers with a quality-first engineering mindset.",
        "Partner with developers and product stakeholders to prioritize high-risk scenarios and shift-left validation.",
        "Drive test design standards focused on maintainability, signal quality, and long-term suite health."
      ],
      systems: [
        "Cypress and Playwright test architecture with reusable page and API abstractions.",
        "GitHub Actions pipelines with quality gates, parallel execution, and traceable reporting.",
        "REST and GraphQL validation integrated into release workflows."
      ]
    }
  },
  {
    role: "Senior QA Automation Engineer",
    company: "Distillery / Scorpion",
    location: "US",
    start: "Feb 2022",
    end: "Aug 2024",
    isCurrent: false,
    impactSummary: "Scaled UI and GraphQL automation workflows and improved release readiness through stronger CI-driven quality checks.",
    tech: ["Cypress", "TypeScript", "Cucumber", "GraphQL", "CI/CD", "Postman"],
    details: {
      impact: [
        "Raised confidence in multi-squad releases by expanding reliable regression coverage for critical product paths.",
        "Improved defect detection timing by embedding quality checks earlier in delivery cycles.",
        "Strengthened quality communication through clearer test outcomes and risk visibility."
      ],
      responsibilities: [
        "Designed and maintained automation suites for front-end and API-level quality validation.",
        "Collaborated with product and engineering teams to align acceptance criteria with executable tests.",
        "Contributed to QA process evolution to support faster and safer release cadence."
      ],
      systems: [
        "Cypress plus Cucumber architecture for behavior-oriented test scenarios.",
        "GraphQL contract and response integrity verification.",
        "CI workflows for regression and smoke coverage orchestration."
      ]
    }
  },
  {
    role: "Senior QA Engineer",
    company: "CocoPago",
    location: "US",
    start: "Jun 2021",
    end: "Feb 2022",
    isCurrent: false,
    impactSummary: "Defined quality strategy for web and mobile products, combining manual depth with pragmatic automation expansion.",
    tech: ["Selenium", "Java", "Postman", "Mobile QA", "Cross-browser Testing", "Release Validation"],
    details: {
      impact: [
        "Increased launch confidence by validating critical flows across browser and mobile release channels.",
        "Improved regression consistency by transitioning repetitive scenarios into maintainable automation.",
        "Reduced last-mile surprises through stronger pre-release API and build validation."
      ],
      responsibilities: [
        "Planned and executed testing strategy across functional, backend, and cross-platform scopes.",
        "Validated IPA and APK builds prior to release windows and coordinated findings with stakeholders.",
        "Balanced exploratory depth with regression discipline in fast product cycles."
      ],
      systems: [
        "Selenium and Java regression automation for high-value user flows.",
        "Postman collections for API checks and backend confidence.",
        "Release readiness process integrating web and mobile quality checkpoints."
      ]
    }
  },
  {
    role: "Senior QA Automation Engineer",
    company: "GlobalLogic / Claro",
    location: "Argentina",
    start: "Dec 2020",
    end: "Jun 2021",
    isCurrent: false,
    impactSummary: "Built scalable web automation and API validation workflows while migrating high-value manual coverage to stable suites.",
    tech: ["Selenium", "Java", "TestNG", "POM", "REST API", "Quality Analysis"],
    details: {
      impact: [
        "Improved consistency of regression cycles by standardizing automation architecture and test flow design.",
        "Accelerated defect discovery through better response and log-level API validation.",
        "Expanded automation value by prioritizing scenarios with strongest business and release impact."
      ],
      responsibilities: [
        "Authored test plans and execution strategy for web features under continuous delivery pressure.",
        "Led migration from manual-heavy validation toward maintainable automated suites.",
        "Supported engineering teams with risk insights and evidence-backed quality decisions."
      ],
      systems: [
        "Selenium, Java, and TestNG with page-object-oriented structure.",
        "REST verification patterns based on payload, status, and log interpretation.",
        "Regression orchestration tuned for predictable execution and triage."
      ]
    }
  },
  {
    role: "QA Automation Engineer",
    company: "Cognizant Softvision / Schneider Electric",
    location: "Argentina",
    start: "Jul 2020",
    end: "Dec 2020",
    isCurrent: false,
    impactSummary: "Strengthened sprint quality coverage through maintainable automation assets and structured test execution planning.",
    tech: ["Selenium", ".NET", "NUnit", "Postman", "Azure DevOps", "Test Planning"],
    details: {
      impact: [
        "Increased delivery reliability by improving automation readiness inside sprint timelines.",
        "Improved test traceability and execution discipline through clearer QA planning artifacts.",
        "Reduced validation gaps by combining automation with focused manual analysis."
      ],
      responsibilities: [
        "Developed and executed automation and manual validation for web and backend surfaces.",
        "Maintained test cases and execution plans aligned with sprint goals.",
        "Collaborated with cross-functional teams to keep quality decisions visible and actionable."
      ],
      systems: [
        "Selenium-based automation in a .NET and NUnit stack.",
        "API verification using Postman-driven workflows.",
        "Azure DevOps-integrated quality tracking and execution management."
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
    impactSummary: "Validated business-critical integrations and enabled broader team adoption of automation practices.",
    tech: ["Katalon Studio", "API Testing", "Integration Testing", "Defect Triage", "QA Enablement"],
    details: {
      impact: [
        "Improved integration confidence across fast-moving releases with structured end-to-end validation.",
        "Extended automation adoption by helping the team transition repetitive checks from manual execution.",
        "Raised quality awareness through practical troubleshooting and test support."
      ],
      responsibilities: [
        "Tested core product integrations and high-risk scenarios across service boundaries.",
        "Documented defects and verification evidence to support faster engineering response.",
        "Provided automation guidance and support for team-level quality maturity."
      ],
      systems: [
        "Katalon-based automated checks for recurring flows.",
        "API and integration test workflows tied to business-critical behavior.",
        "QA execution routines for rapid delivery environments."
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
    impactSummary: "Delivered dependable release validation across multiple web initiatives while coordinating closely with US teams.",
    tech: ["Manual Testing", "Regression", "Smoke Testing", "Integration Testing", "Release QA"],
    details: {
      impact: [
        "Improved release predictability through disciplined regression and smoke testing coverage.",
        "Reduced communication friction by aligning quality findings with distributed stakeholders.",
        "Supported stable launch cycles by maintaining consistent validation standards."
      ],
      responsibilities: [
        "Executed structured manual test cycles across functional and integration scopes.",
        "Collaborated with US-based teams on requirements interpretation and quality expectations.",
        "Tracked defects and verification progress to support release decisions."
      ],
      systems: [
        "Manual QA workflows tailored for agency-style multi-project delivery.",
        "Regression and smoke execution routines for website launch windows.",
        "Cross-team communication loops for quality alignment and prioritization."
      ]
    }
  }
];

