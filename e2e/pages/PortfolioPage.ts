import { expect, type Locator, type Page } from "@playwright/test";
import type { SectionAnchor } from "../data/navigationCases";

export class PortfolioPage {
  private static readonly selectors = {
    desktopNavRoot: "header nav",
    mobileNavRoot: "#mobile-nav",
    activeDesktopLink: 'a[aria-current="page"]'
  } as const;

  private static readonly offsets = {
    stickyHeader: 96,
    nearTopMin: -32,
    nearTopMax: 220,
    bottomVisibilityMin: -2
  } as const;

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async prepareForVisualChecks(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }

        #repositories {
          height: 875px !important;
          min-height: 875px !important;
          max-height: 875px !important;
          overflow: hidden !important;
        }
      `
    });
  }

  // =========================
  // Shared Locators
  // =========================
  get hero(): Locator {
    return this.section("#hero");
  }

  get repositoriesSection(): Locator {
    return this.section("#repositories");
  }

  get mobileNavPanel(): Locator {
    return this.mobileNavRoot();
  }

  get engineeringCta(): Locator {
    return this.hero.getByRole("link", { name: /view engineering work/i });
  }

  get resumeCta(): Locator {
    return this.hero.getByRole("link", { name: /download lucas vacis resume pdf/i });
  }

  get linkedInLink(): Locator {
    return this.contactSection().getByRole("link", { name: "LinkedIn" });
  }

  get githubLink(): Locator {
    return this.contactSection().getByRole("link", { name: "GitHub" });
  }

  get repositoryLinks(): Locator {
    return this.repositoriesSection.getByRole("link", { name: "View Repository" });
  }

  private section(anchor: SectionAnchor): Locator {
    return this.page.locator(anchor);
  }

  // =========================
  // Navigation - Locators
  // =========================
  private desktopNavRoot(): Locator {
    return this.page.locator(PortfolioPage.selectors.desktopNavRoot).first();
  }

  private desktopNavLink(label: string): Locator {
    return this.desktopNavRoot().getByRole("link", { name: label, exact: true });
  }

  private desktopNavLinks(): Locator {
    return this.desktopNavRoot().getByRole("link");
  }

  private mobileNavRoot(): Locator {
    return this.page.locator(PortfolioPage.selectors.mobileNavRoot);
  }

  private mobileNavLink(label: string): Locator {
    return this.mobileNavRoot().getByRole("link", { name: label, exact: true });
  }

  private mobileNavLinks(): Locator {
    return this.mobileNavRoot().getByRole("link");
  }

  private mobileMenuButton(): Locator {
    return this.page.getByRole("button", { name: /open navigation menu/i });
  }

  private activeDesktopLinks(): Locator {
    return this.desktopNavRoot().locator(PortfolioPage.selectors.activeDesktopLink);
  }

  // =========================
  // Contact - Locators
  // =========================
  private contactSection(): Locator {
    return this.section("#contact");
  }

  private contactActionLink(name: string): Locator {
    return this.contactSection().getByRole("link", { name, exact: true });
  }

  private contactDetailLink(nameOrLabel: string): Locator {
    return this.contactSection().getByRole("link", { name: new RegExp(nameOrLabel, "i") });
  }

  // =========================
  // Sandbox - Locators
  // =========================
  private sandboxRoot(): Locator {
    return this.page.getByTestId("qa-sandbox");
  }

  private sandboxPlayground(): Locator {
    return this.page.getByTestId("qa-playground");
  }

  private sandboxCounter(): Locator {
    return this.page.getByTestId("qa-counter");
  }

  private sandboxStatus(): Locator {
    return this.page.getByTestId("qa-status");
  }

  private sandboxModeLabel(): Locator {
    return this.page.getByTestId("qa-mode-label");
  }

  private sandboxManualModeButton(): Locator {
    return this.page.getByTestId("qa-mode-manual");
  }

  private sandboxAutomationModeButton(): Locator {
    return this.page.getByTestId("qa-mode-automation");
  }

  private sandboxResetButton(): Locator {
    return this.page.getByTestId("qa-reset");
  }

  private sandboxBugButtons(): Locator {
    return this.page.getByRole("button", { name: "Report bug" });
  }

  // =========================
  // Navigation - Actions & Assertions
  // =========================
  async expectSectionRendered(anchor: SectionAnchor): Promise<void> {
    await expect(this.section(anchor)).toHaveCount(1);
  }

  async clickDesktopNavAndAssert(label: string, anchor: SectionAnchor): Promise<void> {
    await this.desktopNavLink(label).click();
    await expect(this.page).toHaveURL(new RegExp(`${anchor}$`));
    await this.expectSectionNearTop(anchor);
    await this.expectDesktopLinkActive(label);
    await this.expectOnlyOneDesktopActiveLink();
  }

  async clickDesktopLabelMultipleTimesAndAssert(label: string, anchor: SectionAnchor, times = 3): Promise<void> {
    for (let i = 0; i < times; i += 1) {
      await this.desktopNavLink(label).click();
      await expect(this.page).toHaveURL(new RegExp(`${anchor}$`));
      await this.expectDesktopLinkActive(label);
      await this.expectOnlyOneDesktopActiveLink();
    }
    await this.expectSectionNearTop(anchor);
  }

  async scrollToSectionAndAssertActive(anchor: SectionAnchor, label: string): Promise<void> {
    const stickyHeaderOffset = PortfolioPage.offsets.stickyHeader;

    await this.page.evaluate(({ id, offset }) => {
      const section = document.querySelector<HTMLElement>(id);
      if (!section) {
        throw new Error(`Section not found for ${id}`);
      }

      const target = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, target), behavior: "auto" });
    }, { id: anchor, offset: stickyHeaderOffset });

    await this.expectSectionNearTop(anchor);
    await this.expectDesktopLinkActive(label);
    await this.expectOnlyOneDesktopActiveLink();
  }

  async clickMobileNavAndAssert(label: string, anchor: SectionAnchor): Promise<void> {
    await this.mobileMenuButton().click();
    await expect(this.mobileNavRoot()).toBeVisible();

    await this.mobileNavLink(label).click();
    await expect(this.page).toHaveURL(new RegExp(`${anchor}$`));
    await expect(this.mobileNavRoot()).toBeHidden();
    await this.expectSectionNearTop(anchor);
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton().click();
    await expect(this.mobileNavRoot()).toBeVisible();
  }

  async expectDesktopNavOrder(expected: string[]): Promise<void> {
    const labels = await this.desktopNavLinks().allTextContents();
    expect(labels.map((label) => label.trim())).toEqual(expected);
  }

  async expectMobileNavOrder(expected: string[]): Promise<void> {
    await this.openMobileMenu();
    const labels = await this.mobileNavLinks().allTextContents();
    const normalized = labels.map((label) => label.trim());
    expect(normalized).toEqual(expected);
  }

  // =========================
  // Sandbox - Actions & Assertions
  // =========================
  async expectSandboxVisible(): Promise<void> {
    await expect(this.sandboxRoot()).toBeVisible();
  }

  async hoverSandboxPlayground(): Promise<void> {
    await this.sandboxPlayground().hover();
  }

  async reportFirstManualBug(): Promise<void> {
    await this.sandboxBugButtons().first().click();
  }

  async expectSandboxCounter(text: string): Promise<void> {
    await expect(this.sandboxCounter()).toContainText(text);
  }

  async expectSandboxStatus(text: string, timeout?: number): Promise<void> {
    await expect(this.sandboxStatus()).toContainText(text, timeout ? { timeout } : undefined);
  }

  async switchSandboxToAutomation(): Promise<void> {
    await this.sandboxAutomationModeButton().click();
  }

  async switchSandboxToManual(): Promise<void> {
    await this.sandboxManualModeButton().click();
  }

  async expectSandboxModeLabel(text: string): Promise<void> {
    await expect(this.sandboxModeLabel()).toContainText(text);
  }

  async resetSandbox(): Promise<void> {
    await this.sandboxResetButton().click();
  }

  // =========================
  // Contact - Assertions
  // =========================
  async expectContactActionHref(name: string, expectedHref: string | RegExp): Promise<void> {
    await expect(this.contactActionLink(name)).toHaveAttribute("href", expectedHref);
  }

  async expectContactActionDownload(name: string, expectedDownload: string): Promise<void> {
    await expect(this.contactActionLink(name)).toHaveAttribute("download", expectedDownload);
  }

  async expectContactActionTarget(name: string, expectedTarget: string): Promise<void> {
    await expect(this.contactActionLink(name)).toHaveAttribute("target", expectedTarget);
  }

  async expectContactActionRel(name: string, expectedRel: string): Promise<void> {
    await expect(this.contactActionLink(name)).toHaveAttribute("rel", expectedRel);
  }

  async expectContactDetailHref(nameOrLabel: string, expectedHref: string | RegExp): Promise<void> {
    await expect(this.contactDetailLink(nameOrLabel)).toHaveAttribute("href", expectedHref);
  }

  // =========================
  // Navigation - Internal Assertions
  // =========================
  private async expectSectionNearTop(anchor: SectionAnchor): Promise<void> {
    await expect.poll(async () => {
      return this.page.evaluate((id) => {
        const section = document.querySelector<HTMLElement>(id);
        if (!section) {
          return null;
        }

        const rect = section.getBoundingClientRect();
        return {
          top: rect.top,
          bottom: rect.bottom,
          viewport: window.innerHeight
        };
      }, anchor);
    }).toMatchObject({
      top: expect.any(Number),
      bottom: expect.any(Number),
      viewport: expect.any(Number)
    });

    const rect = await this.page.evaluate((id) => {
      const section = document.querySelector<HTMLElement>(id);
      if (!section) {
        return null;
      }
      const { top, bottom } = section.getBoundingClientRect();
      return { top, bottom, viewport: window.innerHeight };
    }, anchor);

    expect(rect).not.toBeNull();
    expect(rect!.top).toBeGreaterThanOrEqual(PortfolioPage.offsets.nearTopMin);
    expect(rect!.top).toBeLessThanOrEqual(PortfolioPage.offsets.nearTopMax);
    expect(rect!.bottom).toBeGreaterThanOrEqual(PortfolioPage.offsets.bottomVisibilityMin);
    expect(rect!.top).toBeLessThan(rect!.viewport);
  }

  private async expectDesktopLinkActive(label: string): Promise<void> {
    await expect(this.desktopNavLink(label)).toHaveAttribute("aria-current", "page");
  }

  private async expectOnlyOneDesktopActiveLink(): Promise<void> {
    await expect(this.activeDesktopLinks()).toHaveCount(1);
  }
}
