import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactSection } from "../../src/components/sections/ContactSection";
import { contact } from "../../src/content/contact";
import { withBaseUrl } from "../../src/utils/url";

function getEmailActionHref(): string {
  return contact.actions.find((action) => action.id === "email")?.href ?? "";
}

function clickEmailAction(): void {
  fireEvent.click(screen.getByRole("link", { name: /email lucas vacis/i }));
}

describe("ContactSection component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders core content and critical actions", () => {
    render(<ContactSection />);

    expect(screen.getByRole("heading", { name: contact.title })).toBeInTheDocument();
    expect(screen.getByText(contact.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email lucas vacis/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download lucas vacis resume pdf/i })).toBeInTheDocument();
  });

  it("keeps critical CTA attributes correct", () => {
    render(<ContactSection />);

    const emailLink = screen.getByRole("link", { name: /email lucas vacis/i });
    expect(emailLink).toHaveAttribute("href", getEmailActionHref());

    const linkedInLink = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedInLink).toHaveAttribute("href", expect.stringContaining("linkedin.com/in/lucas-vacis"));
    expect(linkedInLink).toHaveAttribute("target", "_blank");
    expect(linkedInLink).toHaveAttribute("rel", "noreferrer");

    const githubLink = screen.getByRole("link", { name: "GitHub" });
    expect(githubLink).toHaveAttribute("href", expect.stringContaining("github.com/lucasvacis87"));
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noreferrer");

    const resumeLink = screen.getByRole("link", { name: /download lucas vacis resume pdf/i });
    expect(resumeLink).toHaveAttribute("download", "Lucas-Vacis-Resume.pdf");
    expect(resumeLink).toHaveAttribute("href", withBaseUrl("resume.pdf"));
  });

  it("does not show fallback feedback when mail app is likely opened", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    render(<ContactSection />);

    clickEmailAction();
    fireEvent.blur(window);

    await act(async () => {
      vi.advanceTimersByTime(701);
      await Promise.resolve();
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(writeText).not.toHaveBeenCalled();
  });

  it("shows success fallback when clipboard API copy works", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    render(<ContactSection />);
    clickEmailAction();

    await act(async () => {
      vi.advanceTimersByTime(701);
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith("lucasvacis@gmail.com");
    expect(screen.getByRole("status")).toHaveTextContent("No default mail app detected. Email copied to clipboard.");
  });

  it("falls back to execCommand copy when clipboard API fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("clipboard blocked"));
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    const execCommandSpy = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommandSpy
    });

    render(<ContactSection />);
    clickEmailAction();

    await act(async () => {
      vi.advanceTimersByTime(701);
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith("lucasvacis@gmail.com");
    expect(execCommandSpy).toHaveBeenCalledWith("copy");
    expect(screen.getByRole("status")).toHaveTextContent("No default mail app detected. Email copied to clipboard.");
  });

  it("shows error fallback when mail app and copy fallbacks fail", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("clipboard blocked"));
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    const execCommandMock = vi.fn().mockImplementation(() => {
      throw new Error("execCommand unavailable");
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommandMock
    });

    render(<ContactSection />);
    clickEmailAction();

    await act(async () => {
      vi.advanceTimersByTime(701);
      await Promise.resolve();
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Unable to open mail app or copy email. Please use lucasvacis@gmail.com."
    );
  });

  it("auto-dismisses fallback feedback after timeout", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText }
    });

    render(<ContactSection />);
    clickEmailAction();

    await act(async () => {
      vi.advanceTimersByTime(701);
      await Promise.resolve();
    });

    expect(screen.getByRole("status")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(2801);
      await Promise.resolve();
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
