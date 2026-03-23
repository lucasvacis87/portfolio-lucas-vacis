import { describe, expect, it } from "vitest";
import { toMailtoLink, withBaseUrl } from "../../src/utils/url";

describe("url utils", () => {
  it("withBaseUrl should generate a path under the app base", () => {
    expect(withBaseUrl("resume.pdf")).toBe("/resume.pdf");
    expect(withBaseUrl("/resume.pdf")).toBe("/resume.pdf");
  });

  it("toMailtoLink should encode subject when present", () => {
    expect(toMailtoLink("lucas@example.com", "Hello QA")).toBe("mailto:lucas@example.com?subject=Hello%20QA");
    expect(toMailtoLink("lucas@example.com")).toBe("mailto:lucas@example.com");
  });
});
