import { test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";
import { desktopNavCases, mobileNavCases } from "../data/navigationCases";
import { alternatingDesktopNavScenarios, repeatedDesktopNavScenarios } from "../data/navigationScenarios";
import { testViewports } from "../data/viewports";

test.describe("strict navigation integrity", () => {
  test("navbar labels are up to date and ordered correctly on desktop", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectDesktopNavOrder(desktopNavCases.map((item) => item.label));
  });

  test("navbar labels are up to date and ordered correctly on mobile", async ({ page }) => {
    await page.setViewportSize(testViewports.mobile);
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectMobileNavOrder(mobileNavCases.map((item) => item.label));
  });

  test("desktop: each nav click updates hash, scroll target, and active state", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    for (const item of desktopNavCases) {
      await portfolioPage.expectSectionRendered(item.anchor);
      await portfolioPage.clickDesktopNavAndAssert(item.label, item.anchor);
    }
  });

  test("desktop: manual scroll updates active item and keeps target section visible", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    for (const item of desktopNavCases) {
      await portfolioPage.scrollToSectionAndAssertActive(item.anchor, item.label);
    }
  });

  test("mobile: each nav click lands in the right section and closes menu", async ({ page }) => {
    await page.setViewportSize(testViewports.mobile);
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    for (const item of mobileNavCases) {
      await portfolioPage.clickMobileNavAndAssert(item.label, item.anchor);
    }
  });

  test("desktop: active state stays correct across repeated and alternating clicks", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    for (const scenario of repeatedDesktopNavScenarios) {
      await portfolioPage.clickDesktopLabelMultipleTimesAndAssert(scenario.label, scenario.anchor, scenario.times);
    }

    for (const scenario of alternatingDesktopNavScenarios) {
      await portfolioPage.clickDesktopNavAndAssert(scenario.label, scenario.anchor);
    }
  });
});
