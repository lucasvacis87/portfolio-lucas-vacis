# LinkedIn Post Template - QA Automation Showcase

## Hook

I upgraded my portfolio landing page with a production-style QA automation pipeline to demonstrate how I approach quality engineering as an SDET.

## Problem

Even "simple" landing pages can break in ways that hurt credibility:

- Broken anchors/navigation
- Incorrect CTA links
- Undetected accessibility regressions
- CI that says little when failures happen

## What I implemented

- Layered test strategy:
  - Unit tests for content contracts and helpers
  - Component tests for navigation + CTA + ARIA behavior
  - Parallel Playwright smoke tests for real browser coverage
- Professional reporting:
  - Playwright HTML + JSON + JUnit
  - Custom executive HTML report
  - Failure evidence package (trace, screenshot, video)
- CI flow split into `quality` and `e2e-smoke` jobs with PR-focused artifacts

## Impact

- Faster PR feedback with parallel E2E
- Better signal quality on what actually broke
- Easier debugging from first failure with visual evidence
- Portfolio quality stack that is interview-ready and defensible

## Closing

Quality engineering is not about adding more tests.  
It is about creating trustworthy release signals and actionable feedback loops.
