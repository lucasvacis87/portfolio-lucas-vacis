import { expect, test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";

const shouldFailIntentionally = process.env.PLAYWRIGHT_INTENTIONAL_FAILURE === "true";

test.describe("intentional CI failure", () => {
  test.skip(!shouldFailIntentionally, "Enable only when we want to inspect CI failure reporting.");

  test("fails on purpose to validate Playwright reporting in CI", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await portfolioPage.goto();
    await portfolioPage.openMobileMenu();

    // We fail against visible UI on purpose so CI artifacts include meaningful screenshots, video, and trace.
    await expect(portfolioPage.mobileNavPanel).toContainText("This text should never exist");
  });
});
