# QA Testing Showcase - Portfolio Landing

## 1) Strategy used

This repository uses a balanced testing pyramid tailored to a static landing page:

- Unit tests for data and logic contracts
- Component tests for critical UI behavior and accessibility semantics
- E2E smoke tests for high-value user journeys

The goal is high-quality signal with low maintenance overhead.

## 2) Why this works for a landing page

- Prevents broken anchors and CTA regressions quickly
- Protects professional branding content (featured repositories, contact links, resume access)
- Validates real user flows in a browser without over-testing visual details
- Produces strong interview evidence: reliable CI checks and traceable failures

## 3) Parallel E2E execution

Playwright is configured with:

- `fullyParallel: true`
- Controlled workers in CI (`50%`)
- `retries: 1` in CI only

This improves PR feedback time while preserving deterministic outcomes.

## 4) Reporting model

Every E2E run generates:

- Playwright HTML report
- JSON and JUnit machine-readable reports
- Custom executive HTML report (`report/index.html`)

When tests fail or retry:

- Video evidence is retained
- Screenshots are captured
- Trace files are recorded

The custom report includes:

- Pass/fail totals
- Flaky and retry rates
- Duration KPIs
- Failure matrix with links to evidence

## 5) CI quality gates

`quality` job blocks PR merges with:

- Typecheck
- Build
- Unit tests
- Component tests

`e2e-smoke` job validates browser behavior and publishes artifacts.

## 6) Metrics to present in interviews

- E2E runtime before/after parallelization
- Retry rate trend
- Failure triage time with trace/video/screenshot package
- PR feedback speed and confidence improvement
