import { test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";
import { sandboxCases } from "../data/sandboxCases";

test.describe("qa sandbox gameplay", () => {
  test("supports manual reporting and mode toggle", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectSandboxVisible();
    await portfolioPage.hoverSandboxPlayground();
    await portfolioPage.reportFirstManualBug();

    await portfolioPage.expectSandboxCounter(sandboxCases.progress.firstBug);
    await portfolioPage.expectSandboxStatus(sandboxCases.status.bugReported);

    await portfolioPage.switchSandboxToAutomation();
    await portfolioPage.expectSandboxModeLabel(sandboxCases.mode.automation);
    await portfolioPage.expectSandboxStatus(sandboxCases.status.scanning);
  });

  test("runs automation to completion and can reset", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.switchSandboxToAutomation();
    await portfolioPage.expectSandboxStatus(sandboxCases.status.scanning);

    await portfolioPage.expectSandboxStatus(sandboxCases.status.completed, sandboxCases.timeoutMs.completion);
    await portfolioPage.expectSandboxCounter(sandboxCases.progress.completed);

    await portfolioPage.resetSandbox();
    await portfolioPage.expectSandboxCounter(sandboxCases.progress.initial);
    await portfolioPage.expectSandboxStatus(sandboxCases.status.scanning);
  });
});
