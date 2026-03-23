import { expect, test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";

const sectionIds = [
  "#hero",
  "#about",
  "#engineering-capabilities",
  "#repositories",
  "#experience",
  "#vision",
  "#contact"
];

test.describe("landing navigation smoke", () => {
  test("renders curated landing sections", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectSectionsVisible(sectionIds);
  });

  test("navigates to anchors from desktop navigation", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.navigateFromDesktop("About", "#about");
    await portfolioPage.navigateFromDesktop("Experience", "#experience");
  });

  test("opens mobile menu and navigates to contact", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.navigateFromMobile("Contact", "#contact");
  });
});
