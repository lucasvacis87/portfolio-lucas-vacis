import { test } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";
import { contactCases } from "../data/contactCases";

test.describe("contact section integrity", () => {
  test("renders contact section", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectSectionRendered("#contact");
  });

  test("keeps critical contact action links correct", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectContactActionHref(contactCases.actions.email.label, contactCases.actions.email.href);

    await portfolioPage.expectContactActionHref(contactCases.actions.linkedIn.label, contactCases.actions.linkedIn.href);
    await portfolioPage.expectContactActionTarget(contactCases.actions.linkedIn.label, contactCases.actions.linkedIn.target);
    await portfolioPage.expectContactActionRel(contactCases.actions.linkedIn.label, contactCases.actions.linkedIn.rel);

    await portfolioPage.expectContactActionHref(contactCases.actions.github.label, contactCases.actions.github.href);
    await portfolioPage.expectContactActionTarget(contactCases.actions.github.label, contactCases.actions.github.target);
    await portfolioPage.expectContactActionRel(contactCases.actions.github.label, contactCases.actions.github.rel);

    await portfolioPage.expectContactActionHref(contactCases.actions.resume.label, contactCases.actions.resume.href);
    await portfolioPage.expectContactActionDownload(contactCases.actions.resume.label, contactCases.actions.resume.download);
  });

  test("keeps contact detail links correct", async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();

    await portfolioPage.expectContactDetailHref(contactCases.details.email.label, contactCases.details.email.href);
    await portfolioPage.expectContactDetailHref(contactCases.details.phone.label, contactCases.details.phone.href);
  });
});
