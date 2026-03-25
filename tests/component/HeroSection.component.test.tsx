import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSection } from "../../src/components/sections/HeroSection";

describe("HeroSection component", () => {
  it("renders key CTAs with expected destinations", () => {
    render(<HeroSection />);

    const primaryCta = screen.getByRole("link", { name: /view engineering work/i });
    expect(primaryCta).toHaveAttribute("href", "#repositories");

    const resumeCta = screen.getByRole("link", { name: /download lucas vacis resume pdf/i });
    expect(resumeCta).toHaveAttribute("href", "/resume.pdf");
    expect(resumeCta).toHaveAttribute("download", "Lucas-Vacis-Resume.pdf");
  });
});
