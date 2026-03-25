import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sandbox } from "../../src/content/sandbox";
import { createBugs, createInitialSandboxState, sandboxReducer } from "../../src/components/sections/interactiveSandboxMachine";

function mockRandomSequence(sequence: number[]): () => void {
  let index = 0;
  const spy = vi.spyOn(Math, "random").mockImplementation(() => {
    const value = sequence[index % sequence.length];
    index += 1;
    return value;
  });

  return () => {
    spy.mockRestore();
  };
}

describe("interactiveSandboxMachine", () => {
  let restoreRandom: (() => void) | null = null;

  beforeEach(() => {
    restoreRandom = mockRandomSequence([0.12, 0.34, 0.56, 0.78, 0.91, 0.43, 0.25, 0.67]);
  });

  afterEach(() => {
    restoreRandom?.();
    restoreRandom = null;
  });

  it("creates deterministic bug sets with unique ids and clamped bounds", () => {
    const first = createBugs();
    restoreRandom?.();
    restoreRandom = mockRandomSequence([0.12, 0.34, 0.56, 0.78, 0.91, 0.43, 0.25, 0.67]);
    const second = createBugs();

    expect(first).toEqual(second);
    expect(first).toHaveLength(sandbox.metrics.totalBugs);
    expect(new Set(first.map((bug) => bug.id)).size).toBe(first.length);

    first.forEach((bug) => {
      expect(bug.x).toBeGreaterThanOrEqual(10);
      expect(bug.x).toBeLessThanOrEqual(90);
      expect(bug.y).toBeGreaterThanOrEqual(12);
      expect(bug.y).toBeLessThanOrEqual(86);
      expect(bug.found).toBe(false);
    });
  });

  it("creates initial state in manual mode with expected defaults", () => {
    const state = createInitialSandboxState();

    expect(state.mode).toBe("manual");
    expect(state.statusKey).toBe("ready");
    expect(state.automationPhase).toBe("idle");
    expect(state.manualRevealed).toBe(false);
    expect(state.messages).toEqual([]);
    expect(state.nextMessageId).toBe(1);
    expect(state.bugs).toHaveLength(sandbox.metrics.totalBugs);
  });

  it("handles SET_MODE transitions with reset semantics", () => {
    const initial = createInitialSandboxState();
    const toAutomation = sandboxReducer(initial, { type: "SET_MODE", mode: "automation" });

    expect(toAutomation.mode).toBe("automation");
    expect(toAutomation.statusKey).toBe("scanning");
    expect(toAutomation.manualRevealed).toBe(true);
    expect(toAutomation.automationPhase).toBe("idle");
    expect(toAutomation.messages).toEqual([]);

    const backToManual = sandboxReducer(toAutomation, { type: "SET_MODE", mode: "manual" });
    expect(backToManual.mode).toBe("manual");
    expect(backToManual.statusKey).toBe("ready");
    expect(backToManual.manualRevealed).toBe(false);
  });

  it("reveals bugs only in manual mode and sets active bug", () => {
    const initial = createInitialSandboxState();
    const revealed = sandboxReducer(initial, { type: "REVEAL_MANUAL_BUGS" });
    expect(revealed.manualRevealed).toBe(true);

    const active = sandboxReducer(revealed, { type: "SET_ACTIVE_BUG", bugId: 3 });
    expect(active.activeBugId).toBe(3);
  });

  it("applies automation detected and phase changes", () => {
    const initial = createInitialSandboxState();
    const detected = sandboxReducer(initial, { type: "AUTOMATION_DETECTED", bugId: 2 });
    expect(detected.targetBugId).toBe(2);
    expect(detected.statusKey).toBe("detected");
    expect(detected.automationPhase).toBe("detected");

    const reporting = sandboxReducer(detected, {
      type: "SET_AUTOMATION_PHASE",
      phase: "reporting",
      statusKey: "reporting"
    });
    expect(reporting.automationPhase).toBe("reporting");
    expect(reporting.statusKey).toBe("reporting");
  });

  it("reports bugs and increments message id", () => {
    const initial = createInitialSandboxState();
    const bugId = initial.bugs[0]?.id ?? 1;
    const reported = sandboxReducer(initial, { type: "REPORT_BUG", bugId, source: "manual" });

    expect(reported.bugs.find((bug) => bug.id === bugId)?.found).toBe(true);
    expect(reported.messages).toHaveLength(1);
    expect(reported.messages[0]?.label).toBe(sandbox.messageLabels.bugReported);
    expect(reported.nextMessageId).toBe(2);
    expect(reported.statusKey).toBe("bugReported");

    const removed = sandboxReducer(reported, { type: "REMOVE_MESSAGE", messageId: 1 });
    expect(removed.messages).toEqual([]);
  });

  it("marks completion when all bugs are reported in automation", () => {
    const initial = createInitialSandboxState();
    const allFoundState = {
      ...initial,
      bugs: initial.bugs.map((bug, index) => ({
        ...bug,
        found: index < initial.bugs.length - 1
      }))
    };
    const lastBugId = allFoundState.bugs.find((bug) => !bug.found)?.id ?? 1;

    const completed = sandboxReducer(allFoundState, {
      type: "REPORT_BUG",
      bugId: lastBugId,
      source: "automation"
    });

    expect(completed.statusKey).toBe("complete");
    expect(completed.automationPhase).toBe("idle");
  });

  it("resets state according to current mode", () => {
    const initial = createInitialSandboxState();
    const manualReset = sandboxReducer(initial, { type: "RESET" });
    expect(manualReset.statusKey).toBe("ready");
    expect(manualReset.manualRevealed).toBe(false);

    const automation = sandboxReducer(initial, { type: "SET_MODE", mode: "automation" });
    const automationReset = sandboxReducer(automation, { type: "RESET" });
    expect(automationReset.statusKey).toBe("scanning");
    expect(automationReset.manualRevealed).toBe(true);
    expect(automationReset.messages).toEqual([]);
    expect(automationReset.activeBugId).toBeNull();
    expect(automationReset.targetBugId).toBeNull();
  });
});
