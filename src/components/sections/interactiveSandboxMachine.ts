import { sandbox } from "../../content/sandbox";

export type Mode = "manual" | "automation";
export type AutomationPhase = "idle" | "scanning" | "detected" | "reporting";
export type StatusKey = keyof typeof sandbox.statusLabels;

export type BugNode = {
  id: number;
  x: number;
  y: number;
  found: boolean;
};

export type ToastMessage = {
  id: number;
  x: number;
  y: number;
  label: string;
};

export type SandboxState = {
  mode: Mode;
  bugs: BugNode[];
  statusKey: StatusKey;
  automationPhase: AutomationPhase;
  targetBugId: number | null;
  activeBugId: number | null;
  messages: ToastMessage[];
  nextMessageId: number;
};

export type SandboxAction =
  | { type: "SET_MODE"; mode: Mode }
  | { type: "SET_ACTIVE_BUG"; bugId: number | null }
  | { type: "AUTOMATION_DETECTED"; bugId: number }
  | { type: "SET_AUTOMATION_PHASE"; phase: AutomationPhase; statusKey?: StatusKey }
  | { type: "REPORT_BUG"; bugId: number; source: Mode }
  | { type: "REMOVE_MESSAGE"; messageId: number }
  | { type: "RESET" };

const bugAnchors = [
  { x: 14, y: 16 },
  { x: 32, y: 30 },
  { x: 54, y: 20 },
  { x: 74, y: 30 },
  { x: 86, y: 52 },
  { x: 62, y: 62 },
  { x: 38, y: 56 },
  { x: 18, y: 68 },
  { x: 49, y: 74 },
  { x: 78, y: 76 }
];

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function createBugs(): BugNode[] {
  const shuffled = [...bugAnchors].sort(() => Math.random() - 0.5).slice(0, sandbox.metrics.totalBugs);

  return shuffled.map((point, index) => ({
    id: index + 1,
    x: clamp(point.x + (Math.random() * 8 - 4), 10, 90),
    y: clamp(point.y + (Math.random() * 8 - 4), 12, 86),
    found: false
  }));
}

export function createInitialSandboxState(): SandboxState {
  return {
    mode: "manual",
    bugs: createBugs(),
    statusKey: "ready",
    automationPhase: "idle",
    targetBugId: null,
    activeBugId: null,
    messages: [],
    nextMessageId: 1
  };
}

export function sandboxReducer(state: SandboxState, action: SandboxAction): SandboxState {
  switch (action.type) {
    case "SET_MODE": {
      const isComplete = state.bugs.every((bug) => bug.found);
      return {
        ...state,
        mode: action.mode,
        activeBugId: null,
        targetBugId: null,
        automationPhase: "idle",
        statusKey: isComplete ? "complete" : action.mode === "automation" ? "scanning" : "ready"
      };
    }
    case "SET_ACTIVE_BUG":
      return {
        ...state,
        activeBugId: action.bugId
      };
    case "AUTOMATION_DETECTED":
      return {
        ...state,
        targetBugId: action.bugId,
        automationPhase: "detected",
        statusKey: "detected"
      };
    case "SET_AUTOMATION_PHASE":
      return {
        ...state,
        automationPhase: action.phase,
        statusKey: action.statusKey ?? state.statusKey
      };
    case "REPORT_BUG": {
      const currentBug = state.bugs.find((bug) => bug.id === action.bugId);
      if (!currentBug || currentBug.found) {
        return state;
      }

      const nextBugs = state.bugs.map((bug) => (bug.id === action.bugId ? { ...bug, found: true } : bug));
      const completed = nextBugs.every((bug) => bug.found);
      const nextMessage: ToastMessage = {
        id: state.nextMessageId,
        x: currentBug.x,
        y: currentBug.y,
        label: sandbox.messageLabels.bugReported
      };

      return {
        ...state,
        bugs: nextBugs,
        activeBugId: null,
        targetBugId: null,
        automationPhase:
          action.source === "automation" ? (completed ? "idle" : "scanning") : state.automationPhase,
        statusKey: completed ? "complete" : action.source === "automation" ? "reporting" : "bugReported",
        messages: [...state.messages, nextMessage],
        nextMessageId: state.nextMessageId + 1
      };
    }
    case "REMOVE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.messageId)
      };
    case "RESET":
      return {
        ...state,
        bugs: createBugs(),
        messages: [],
        activeBugId: null,
        targetBugId: null,
        automationPhase: "idle",
        statusKey: state.mode === "automation" ? "scanning" : "ready"
      };
    default:
      return state;
  }
}
