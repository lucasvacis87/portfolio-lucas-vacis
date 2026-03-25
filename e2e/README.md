# E2E Test Guide

This folder contains Playwright end-to-end coverage for portfolio navigation, contact actions, and interactive QA sandbox behavior.

## Structure

- `data/`: scenario inputs and contract-validated test data.
- `pages/`: page objects and reusable test actions/assertions.
- `tests/`: spec files that consume datasets and page objects.

## Data contracts

`data/contracts.ts` provides lightweight fail-fast validation for:

- section anchors
- desktop/mobile navigation consistency
- repeated and alternating navigation scenarios
- contact link metadata consistency
- sandbox status/progress/timing consistency
- viewport preset integrity

If a dataset drifts from expected structure, tests fail at import time with a clear contract error.

## Commands

- Run all e2e: `npm run test:e2e`
- Run specific file: `npx playwright test e2e/tests/navigation.spec.ts`
- Open trace report from a failed run:
  - `npx playwright show-trace <path-to-trace.zip>`
