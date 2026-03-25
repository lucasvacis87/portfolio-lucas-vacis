import { describe, expect, it } from "vitest";
import { about } from "../../src/content/about";
import { services } from "../../src/content/services";

describe("impact vs what-i-bring positioning", () => {
  it("keeps impact section concise and evidence-oriented", () => {
    expect(about.title).toBe("Impact & Achievements");
    expect(about.items).toHaveLength(4);

    const metrics = about.items.map((item) => item.metric);
    expect(metrics).toEqual(
      expect.arrayContaining(["40min \u2192 5min", "Reliable PR Signal", "Test Stability", "CI Quality Gates"])
    );
  });

  it("keeps what-i-bring focused on leadership capabilities", () => {
    expect(services).toHaveLength(4);

    const titles = services.map((service) => service.title);
    expect(titles).toEqual(
      expect.arrayContaining([
        "Quality Strategy & Prioritization",
        "Release Risk Governance",
        "Test Architecture Stewardship",
        "Team Enablement & Standards"
      ])
    );

    for (const service of services) {
      expect(service.managerLens.trim().length).toBeGreaterThan(0);
      expect(service.description).not.toMatch(/\d+\s*(min|ms|%)/i);
    }
  });
});
