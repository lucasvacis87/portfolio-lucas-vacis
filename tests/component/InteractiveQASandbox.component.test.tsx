import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sandbox } from "../../src/content/sandbox";
import { InteractiveQASandbox } from "../../src/components/sections/InteractiveQASandbox";

function setupDeterministicRandom(): () => void {
  let index = 0;
  const sequence = [0.12, 0.34, 0.56, 0.78, 0.91, 0.43, 0.25, 0.67];
  const spy = vi.spyOn(Math, "random").mockImplementation(() => {
    const value = sequence[index % sequence.length];
    index += 1;
    return value;
  });
  return () => spy.mockRestore();
}

describe("InteractiveQASandbox component", () => {
  let restoreRandom: (() => void) | null = null;

  beforeEach(() => {
    vi.useFakeTimers();
    restoreRandom = setupDeterministicRandom();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    restoreRandom?.();
    restoreRandom = null;
  });

  async function advanceAutomationCycle(): Promise<void> {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(sandbox.timings.scanMs + 10);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(sandbox.timings.detectMs + 10);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(sandbox.timings.reportMs + 10);
    });
  }

  it("renders initial manual state", () => {
    render(<InteractiveQASandbox />);

    expect(screen.getByTestId("qa-mode-label")).toHaveTextContent("Manual Mode");
    expect(screen.getByTestId("qa-status")).toHaveTextContent(sandbox.statusLabels.ready);
    expect(screen.getByTestId("qa-counter")).toHaveTextContent(`0/${sandbox.metrics.totalBugs}`);
    expect(screen.getByTestId("qa-mode-manual")).toHaveAttribute("aria-pressed", "true");
  });

  it("reveals and reports a bug in manual mode", async () => {
    render(<InteractiveQASandbox />);

    fireEvent.pointerMove(screen.getByTestId("qa-playground"));
    const bugButtons = screen.getAllByRole("button", { name: "Report bug" });
    expect(bugButtons.length).toBeGreaterThan(0);

    fireEvent.click(bugButtons[0]);
    expect(screen.getByTestId("qa-counter")).toHaveTextContent(`1/${sandbox.metrics.totalBugs}`);
    expect(screen.getByTestId("qa-status")).toHaveTextContent(sandbox.statusLabels.bugReported);
  });

  it("completes automation cycle with fake timers", async () => {
    render(<InteractiveQASandbox />);

    fireEvent.click(screen.getByTestId("qa-mode-automation"));
    expect(screen.getByTestId("qa-status")).toHaveTextContent(sandbox.statusLabels.scanning);

    for (let i = 0; i < sandbox.metrics.totalBugs; i += 1) {
      await advanceAutomationCycle();
    }

    expect(screen.getByTestId("qa-counter")).toHaveTextContent(`${sandbox.metrics.totalBugs}/${sandbox.metrics.totalBugs}`);
    expect(screen.getByTestId("qa-status")).toHaveTextContent(sandbox.statusLabels.complete);
  });

  it("resets automation run back to scanning with zero detected bugs", async () => {
    render(<InteractiveQASandbox />);
    fireEvent.click(screen.getByTestId("qa-mode-automation"));

    await advanceAutomationCycle();

    expect(screen.getByTestId("qa-counter")).not.toHaveTextContent(`0/${sandbox.metrics.totalBugs}`);
    fireEvent.click(screen.getByTestId("qa-reset"));

    expect(screen.getByTestId("qa-counter")).toHaveTextContent(`0/${sandbox.metrics.totalBugs}`);
    expect(screen.getByTestId("qa-status")).toHaveTextContent(sandbox.statusLabels.scanning);
  });
});
