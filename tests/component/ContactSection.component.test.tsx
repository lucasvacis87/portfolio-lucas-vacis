import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "../../src/components/sections/ContactSection";

describe("ContactSection component", () => {
  it("renders primary contact actions and safe external link attributes", () => {
    render(<ContactSection />);

    const emailAction = screen.getByRole("link", { name: /email lucas vacis/i });
    expect(emailAction).toHaveAttribute("href", expect.stringContaining("mailto:"));

    const linkedInAction = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedInAction).toHaveAttribute("target", "_blank");
    expect(linkedInAction).toHaveAttribute("rel", "noreferrer");

    const githubAction = screen.getByRole("link", { name: /github/i });
    expect(githubAction).toHaveAttribute("target", "_blank");
    expect(githubAction).toHaveAttribute("rel", "noreferrer");
  });
});
