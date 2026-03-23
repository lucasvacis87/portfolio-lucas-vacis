import { describe, expect, it } from "vitest";
import { hero, navigationItems } from "../../src/content/site";

describe("site content contracts", () => {
  it("contains unique, hash-based navigation anchors", () => {
    const hrefs = navigationItems.map((item) => item.href);
    const unique = new Set(hrefs);

    expect(hrefs.length).toBe(unique.size);
    hrefs.forEach((href) => expect(href.startsWith("#")).toBe(true));
  });

  it("keeps hero CTA contracts required for a landing page", () => {
    expect(hero.primaryCta.href).toBe("#repositories");
    expect(hero.secondaryCta.href).toBe("resume.pdf");
    expect(hero.secondaryCta.download).toBe("Lucas-Vacis-Resume.pdf");
  });
});
