import { describe, expect, it } from "vitest";
import type { SandboxState } from "../../src/components/sections/interactiveSandboxMachine";
import { createInitialSandboxState, sandboxReducer } from "../../src/components/sections/interactiveSandboxMachine";

function createState(overrides: Partial<SandboxState> = {}): SandboxState {
  const base = createInitialSandboxState();
  const fixedBugs = [
    { id: 1, x: 20, y: 20, found: false },
    { id: 2, x: 60, y: 60, found: false }
  ];

  return {
    ...base,
    bugs: fixedBugs,
    ...overrides
  };
}

describe("interactiveSandboxMachine", () => {
  it("switching mode resets the game and initializes automation state", () => {
    const state = createState({
      mode: "manual",
      bugs: [
        { id: 1, x: 20, y: 20, found: true },
        { id: 2, x: 60, y: 60, found: false }
      ],
      manualRevealed: true,
      statusKey: "bugReported",
      messages: [{ id: 1, x: 20, y: 20, label: "Bug reported" }],
      targetBugId: 2,
      activeBugId: 1,
      automationPhase: "reporting"
    });

    const next = sandboxReducer(state, { type: "SET_MODE", mode: "automation" });

    expect(next.mode).toBe("automation");
    expect(next.bugs).toHaveLength(8);
    expect(next.bugs.every((bug) => bug.found === false)).toBe(true);
    expect(next.messages).toHaveLength(0);
    expect(next.activeBugId).toBeNull();
    expect(next.targetBugId).toBeNull();
    expect(next.statusKey).toBe("scanning");
    expect(next.automationPhase).toBe("idle");
    expect(next.manualRevealed).toBe(true);
  });

  it("switching back to manual also resets and starts from ready", () => {
    const state = createState({
      mode: "automation",
      manualRevealed: true,
      statusKey: "scanning",
      messages: [{ id: 2, x: 60, y: 60, label: "Bug reported" }]
    });

    const next = sandboxReducer(state, { type: "SET_MODE", mode: "manual" });

    expect(next.mode).toBe("manual");
    expect(next.bugs).toHaveLength(8);
    expect(next.bugs.every((bug) => bug.found === false)).toBe(true);
    expect(next.messages).toHaveLength(0);
    expect(next.statusKey).toBe("ready");
    expect(next.automationPhase).toBe("idle");
    expect(next.manualRevealed).toBe(false);
  });

  it("reports a bug in manual mode and appends a message", () => {
    const state = createState();

    const next = sandboxReducer(state, { type: "REPORT_BUG", bugId: 1, source: "manual" });

    expect(next.bugs[0].found).toBe(true);
    expect(next.statusKey).toBe("bugReported");
    expect(next.messages).toHaveLength(1);
    expect(next.messages[0].label).toBe("Bug reported");
    expect(next.nextMessageId).toBe(2);
  });

  it("completes and idles when automation reports last remaining bug", () => {
    const state = createState({
      mode: "automation",
      bugs: [
        { id: 1, x: 20, y: 20, found: true },
        { id: 2, x: 60, y: 60, found: false }
      ],
      automationPhase: "reporting",
      targetBugId: 2,
      statusKey: "reporting"
    });

    const next = sandboxReducer(state, { type: "REPORT_BUG", bugId: 2, source: "automation" });

    expect(next.bugs.every((bug) => bug.found)).toBe(true);
    expect(next.statusKey).toBe("complete");
    expect(next.automationPhase).toBe("idle");
    expect(next.targetBugId).toBeNull();
  });

  it("resets game and keeps mode-aware status", () => {
    const state = createState({
      mode: "automation",
      statusKey: "reporting",
      messages: [{ id: 1, x: 20, y: 20, label: "Bug reported" }]
    });

    const next = sandboxReducer(state, { type: "RESET" });

    expect(next.messages).toHaveLength(0);
    expect(next.activeBugId).toBeNull();
    expect(next.targetBugId).toBeNull();
    expect(next.statusKey).toBe("scanning");
    expect(next.bugs).toHaveLength(8);
    expect(next.bugs.every((bug) => bug.found === false)).toBe(true);
  });

  it("removes toast messages by id", () => {
    const state = createState({
      messages: [
        { id: 1, x: 20, y: 20, label: "Bug reported" },
        { id: 2, x: 60, y: 60, label: "Bug reported" }
      ]
    });

    const next = sandboxReducer(state, { type: "REMOVE_MESSAGE", messageId: 1 });

    expect(next.messages).toHaveLength(1);
    expect(next.messages[0].id).toBe(2);
  });
});
