import { expect, test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";

const visualDiffTolerance = {
  maxDiffPixelRatio: 0.1
} as const;

test.describe("visual regression", () => {
  test("keeps hero composition stable on desktop", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await page.setViewportSize({ width: 1440, height: 1100 });
    await portfolioPage.goto();
    await portfolioPage.prepareForVisualChecks();

    await expect(portfolioPage.hero).toHaveScreenshot("hero-desktop.png", visualDiffTolerance);
  });

  test("keeps repository highlights layout stable", async ({ page }) => {
    test.skip(true, "Temporarily disabled while repository panel baseline is being recalibrated.");

    const portfolioPage = new PortfolioPage(page);
    await page.setViewportSize({ width: 1440, height: 1400 });
    await portfolioPage.goto();
    await portfolioPage.prepareForVisualChecks();
    await portfolioPage.repositoriesSection.scrollIntoViewIfNeeded();

    await expect(portfolioPage.repositoriesSection).toHaveScreenshot("repositories-desktop.png", visualDiffTolerance);
  });

  test("keeps mobile navigation overlay stable", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await portfolioPage.goto();
    await portfolioPage.prepareForVisualChecks();
    await portfolioPage.openMobileMenu();

    await expect(portfolioPage.mobileNavPanel).toHaveScreenshot("mobile-nav.png", visualDiffTolerance);
  });
});
