import { expect, type Locator, type Page } from "@playwright/test";

export class PortfolioPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  ///////// Locators

  section(id: string): Locator {
    return this.page.locator(id);
  }

  desktopNavLink(name: string): Locator {
    return this.page.getByRole("link", { name, exact: true }).first();
  }

  mobileNavLink(name: string): Locator {
    return this.page.locator("#mobile-nav").getByRole("link", { name, exact: true });
  }

  get hero(): Locator {
    return this.section("#hero");
  }

  get repositoriesSection(): Locator {
    return this.section("#repositories");
  }

  get contactSection(): Locator {
    return this.section("#contact");
  }

  get mobileNavPanel(): Locator {
    return this.page.locator("#mobile-nav");
  }

  get engineeringCta(): Locator {
    return this.hero.getByRole("link", { name: /view engineering work/i });
  }

  get resumeCta(): Locator {
    return this.hero.getByRole("link", { name: /download lucas vacis resume pdf/i });
  }

  get linkedInLink(): Locator {
    return this.page.getByRole("link", { name: "LinkedIn" });
  }

  get githubLink(): Locator {
    return this.page.getByRole("link", { name: "GitHub" });
  }

  get repositoryLinks(): Locator {
    return this.page.getByRole("link", { name: /view repository/i });
  }

  get mobileMenuButton(): Locator {
    return this.page.getByRole("button", { name: /open navigation menu/i });
  }

  //////// Functions

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async prepareForVisualChecks(): Promise<void> {
    await this.page.emulateMedia({ reducedMotion: "reduce" });
    await this.page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }

        html {
          scroll-behavior: auto !important;
        }
      `
    });
    await this.page.evaluate(async () => {
      await document.fonts.ready;
    });
  }

  async expectSectionsVisible(sectionIds: string[]): Promise<void> {
    for (const sectionId of sectionIds) {
      await expect(this.section(sectionId)).toBeVisible();
    }
  }

  async navigateFromDesktop(name: string, expectedHash: string): Promise<void> {
    await this.desktopNavLink(name).click();
    await expect(this.page).toHaveURL(new RegExp(`${expectedHash}$`));
  }

  async openMobileMenu(): Promise<void> {
    await this.mobileMenuButton.click();
    await expect(this.mobileNavPanel).toBeVisible();
  }

  async navigateFromMobile(name: string, expectedHash: string): Promise<void> {
    await this.openMobileMenu();
    await this.mobileNavLink(name).click();
    await expect(this.page).toHaveURL(new RegExp(`${expectedHash}$`));
  }
}
