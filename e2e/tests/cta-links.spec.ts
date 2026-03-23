import { expect, test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";

test.describe("cta and outbound links", () => {
  test("keeps hero CTA and resume download available", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await expect(portfolioPage.engineeringCta).toHaveAttribute("href", "#repositories");

    await expect(portfolioPage.resumeCta).toHaveAttribute("href", /resume\.pdf$/);
    await expect(portfolioPage.resumeCta).toHaveAttribute("download", "Lucas-Vacis-Resume.pdf");
  });

  test("keeps critical external links in contact and repositories", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await expect(portfolioPage.linkedInLink).toHaveAttribute("href", /linkedin\.com/);
    await expect(portfolioPage.linkedInLink).toHaveAttribute("target", "_blank");

    await expect(portfolioPage.githubLink).toHaveAttribute("href", /github\.com/);
    await expect(portfolioPage.githubLink).toHaveAttribute("target", "_blank");

    await expect(portfolioPage.repositoryLinks.first()).toHaveAttribute("href", /github\.com/);
    await expect(portfolioPage.repositoryLinks).toHaveCount(3);
  });
});
