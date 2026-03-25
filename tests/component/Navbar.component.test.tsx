import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "../../src/components/layout/Navbar";

describe("Navbar component", () => {
  it("toggles mobile menu and aria state", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const openButton = screen.getByRole("button", { name: /open navigation menu/i });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await user.click(openButton);

    expect(document.querySelector("#mobile-nav")).not.toBeNull();
    expect(screen.getByRole("button", { name: /^close navigation menu$/i })).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /^close navigation menu backdrop$/i }));
    expect(screen.queryByRole("button", { name: /^close navigation menu backdrop$/i })).not.toBeInTheDocument();
  });

  it("updates active link on scroll events without crashing", () => {
    render(<Navbar />);
    fireEvent.scroll(window);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  });
});
