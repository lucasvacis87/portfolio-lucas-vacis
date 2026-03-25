import { describe, expect, it } from "vitest";
import { repositories } from "../../src/content/repositories";

describe("repositories content contracts", () => {
  it("exposes exactly one featured repository", () => {
    const featured = repositories.filter((repo) => repo.priority === "featured");
    expect(featured).toHaveLength(1);
    expect(featured[0]?.name).toBe("playwright-repo");
  });

  it("includes key positioning repositories", () => {
    const names = repositories.map((repo) => repo.name);
    expect(names).toEqual(expect.arrayContaining(["playwright-repo", "portfolio-lucas-vacis", "sweetly"]));
  });

  it("keeps repository links absolute and non-empty", () => {
    for (const repo of repositories) {
      expect(repo.links.primary.href).toMatch(/^https?:\/\/.+/);
      expect(repo.links.secondary.href).toMatch(/^https?:\/\/.+/);
    }
  });
});
