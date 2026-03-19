import { useEffect, useMemo, useReducer, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RotateCcw, Search } from "lucide-react";
import { sandbox } from "../../content/sandbox";
import { createInitialSandboxState, sandboxReducer } from "./interactiveSandboxMachine";

function PixelBugIcon({ emphasized = false }: { emphasized?: boolean }): JSX.Element {
  return (
    <svg viewBox="0 0 14 14" className={`h-5 w-5 ${emphasized ? "text-accent" : "text-accent-2/90"}`} aria-hidden="true">
      <g shapeRendering="crispEdges" fill="currentColor">
        <rect x="6" y="2" width="2" height="2" />
        <rect x="4" y="4" width="6" height="6" />
        <rect x="5" y="5" width="1" height="1" />
        <rect x="8" y="5" width="1" height="1" />
        <rect x="3" y="5" width="1" height="1" />
        <rect x="10" y="5" width="1" height="1" />
        <rect x="2" y="6" width="2" height="1" />
        <rect x="10" y="6" width="2" height="1" />
        <rect x="2" y="8" width="2" height="1" />
        <rect x="10" y="8" width="2" height="1" />
        <rect x="4" y="10" width="1" height="2" />
        <rect x="9" y="10" width="1" height="2" />
        <rect x="6" y="10" width="2" height="2" />
      </g>
    </svg>
  );
}

export function InteractiveQASandbox(): JSX.Element {
  const [state, dispatch] = useReducer(sandboxReducer, undefined, createInitialSandboxState);
  const automationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const foundCount = useMemo(() => state.bugs.filter((bug) => bug.found).length, [state.bugs]);
  const isComplete = foundCount === state.bugs.length;
  const targetBug = state.targetBugId !== null ? state.bugs.find((bug) => bug.id === state.targetBugId) : null;
  const modeLabel = state.mode === "manual" ? "Manual Mode" : "Automation Mode";
  const bugsVisible = state.mode === "automation" || state.manualRevealed;

  useEffect(() => {
    if (state.mode !== "automation") {
      return;
    }

    if (isComplete) {
      if (state.statusKey !== "complete" || state.automationPhase !== "idle") {
        dispatch({ type: "SET_AUTOMATION_PHASE", phase: "idle", statusKey: "complete" });
      }
      return;
    }

    if (state.automationPhase === "idle") {
      dispatch({ type: "SET_AUTOMATION_PHASE", phase: "scanning", statusKey: "scanning" });
      return;
    }

    if (state.automationPhase === "scanning") {
      automationTimerRef.current = setTimeout(() => {
        const target = state.bugs.find((bug) => !bug.found);
        if (target) {
          dispatch({ type: "AUTOMATION_DETECTED", bugId: target.id });
        }
      }, sandbox.timings.scanMs);
    }

    if (state.automationPhase === "detected") {
      automationTimerRef.current = setTimeout(() => {
        dispatch({ type: "SET_AUTOMATION_PHASE", phase: "reporting", statusKey: "reporting" });
      }, sandbox.timings.detectMs);
    }

    if (state.automationPhase === "reporting") {
      automationTimerRef.current = setTimeout(() => {
        if (state.targetBugId !== null) {
          dispatch({ type: "REPORT_BUG", bugId: state.targetBugId, source: "automation" });
        }
      }, sandbox.timings.reportMs);
    }

    return () => {
      if (automationTimerRef.current) {
        clearTimeout(automationTimerRef.current);
        automationTimerRef.current = null;
      }
    };
  }, [isComplete, state.automationPhase, state.bugs, state.mode, state.statusKey, state.targetBugId]);

  useEffect(() => {
    const activeMessageIds = new Set(state.messages.map((message) => message.id));

    state.messages.forEach((message) => {
      if (messageTimersRef.current.has(message.id)) {
        return;
      }

      const timer = setTimeout(() => {
        dispatch({ type: "REMOVE_MESSAGE", messageId: message.id });
        const handle = messageTimersRef.current.get(message.id);
        if (handle) {
          clearTimeout(handle);
        }
        messageTimersRef.current.delete(message.id);
      }, sandbox.timings.toastMs);

      messageTimersRef.current.set(message.id, timer);
    });

    Array.from(messageTimersRef.current.keys()).forEach((id) => {
      if (activeMessageIds.has(id)) {
        return;
      }
      const handle = messageTimersRef.current.get(id);
      if (handle) {
        clearTimeout(handle);
      }
      messageTimersRef.current.delete(id);
    });
  }, [state.messages]);

  useEffect(() => {
    return () => {
      if (automationTimerRef.current) {
        clearTimeout(automationTimerRef.current);
      }

      messageTimersRef.current.forEach((timer) => clearTimeout(timer));
      messageTimersRef.current.clear();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto w-full max-w-[35rem] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_8%_8%,rgba(78,128,255,0.2),transparent_38%),radial-gradient(circle_at_92%_90%,rgba(125,99,255,0.16),transparent_42%),#0f141c] p-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_14px_34px_rgba(0,0,0,0.4),0_0_22px_rgba(125,99,255,0.14)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_16px_38px_rgba(0,0,0,0.44),0_0_30px_rgba(125,99,255,0.2)] lg:max-w-[38rem]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-2">QA Detection Sandbox · Live Tool</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-2/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent-2">
          <Bot size={12} aria-hidden="true" />
          Live
        </span>
      </div>

      <div role="group" aria-label="Sandbox mode selector" className="mt-4 inline-flex rounded-full bg-bg/65 p-1">
        <button
          type="button"
          aria-pressed={state.mode === "manual"}
          onClick={() => dispatch({ type: "SET_MODE", mode: "manual" })}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
            state.mode === "manual"
              ? "bg-surface-2 text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "text-muted hover:text-text"
          }`}
        >
          {sandbox.modes.manual}
        </button>
        <button
          type="button"
          aria-pressed={state.mode === "automation"}
          onClick={() => dispatch({ type: "SET_MODE", mode: "automation" })}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
            state.mode === "automation"
              ? "bg-gradient-to-r from-accent/28 to-accent-2/25 text-text shadow-[0_0_18px_rgba(55,208,201,0.2)]"
              : "text-muted hover:text-text"
          }`}
        >
          {sandbox.modes.automation}
        </button>
      </div>

      <div
        className="relative mt-4 h-[15.2rem] rounded-xl bg-[radial-gradient(circle_at_70%_12%,rgba(91,140,255,0.22),transparent_35%),radial-gradient(circle_at_8%_92%,rgba(125,99,255,0.16),transparent_40%),linear-gradient(transparent_95%,rgba(155,167,180,0.12)_95%),linear-gradient(90deg,transparent_95%,rgba(155,167,180,0.12)_95%)] bg-[length:100%_100%,100%_100%,20px_20px,20px_20px] sm:h-[16.4rem]"
        onPointerMove={() => dispatch({ type: "REVEAL_MANUAL_BUGS" })}
        onPointerDown={() => dispatch({ type: "REVEAL_MANUAL_BUGS" })}
      >
        {state.mode === "manual" && !state.manualRevealed && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <p className="rounded-full bg-bg/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              Interact to reveal bugs
            </p>
          </div>
        )}
        {state.mode === "automation" && !isComplete && state.automationPhase === "scanning" && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-accent-2/28 via-accent-2/12 to-transparent"
            animate={{ x: ["-24%", "115%"] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
          />
        )}

        {state.mode === "automation" && !isComplete && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-accent-2/30 to-transparent"
            animate={{ y: [0, 210, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {state.mode === "automation" && targetBug && (
          <>
            <motion.div
              className="pointer-events-none absolute z-10 h-11 w-11 rounded-full bg-accent/10"
              style={{ left: `${targetBug.x}%`, top: `${targetBug.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.9, 1.08, 1], opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <motion.div
              className="pointer-events-none absolute z-10 h-16 w-16 rounded-full bg-accent-2/12"
              style={{ left: `${targetBug.x}%`, top: `${targetBug.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.75, 1.12], opacity: [0.15, 0.65, 0.05] }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
            <motion.div
              className="pointer-events-none absolute z-10 h-20 w-20 rounded-full bg-accent/8"
              style={{ left: `${targetBug.x}%`, top: `${targetBug.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: [0.95, 1.02, 0.98], opacity: 0.8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </>
        )}

        <AnimatePresence>
          {state.bugs
            .filter((bug) => !bug.found)
            .map((bug, index) => {
              const isActive = state.activeBugId === bug.id || state.targetBugId === bug.id;

              return (
                <motion.button
                  key={bug.id}
                  type="button"
                  onClick={() => state.mode === "manual" && dispatch({ type: "REPORT_BUG", bugId: bug.id, source: "manual" })}
                  onPointerEnter={() => dispatch({ type: "SET_ACTIVE_BUG", bugId: bug.id })}
                  onPointerLeave={() => dispatch({ type: "SET_ACTIVE_BUG", bugId: null })}
                  onPointerDown={() => dispatch({ type: "SET_ACTIVE_BUG", bugId: bug.id })}
                  onFocus={() => dispatch({ type: "SET_ACTIVE_BUG", bugId: bug.id })}
                  onBlur={() => dispatch({ type: "SET_ACTIVE_BUG", bugId: null })}
                  disabled={state.mode === "automation"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: bugsVisible ? 1 : 0,
                    scale: bugsVisible ? 1 : 0.8
                  }}
                  exit={{ opacity: 0, scale: 0.4, rotate: 10 }}
                  transition={{
                    duration: 0.25,
                    delay: state.mode === "automation" ? index * 0.08 : 0,
                    ease: "easeOut"
                  }}
                  className={`absolute z-20 inline-flex h-9 w-9 items-center justify-center rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_18px_rgba(0,0,0,0.35)] transition ${
                    isActive
                      ? "bg-accent/22 shadow-[0_0_18px_rgba(78,128,255,0.35)]"
                      : "bg-bg/75 hover:bg-surface-2/75"
                  } ${state.mode === "automation" ? "cursor-default" : "cursor-pointer"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                  style={{ left: `${bug.x}%`, top: `${bug.y}%`, transform: "translate(-50%, -50%)" }}
                  aria-label={state.mode === "manual" ? "Report bug" : "Bug target"}
                >
                  <PixelBugIcon emphasized={isActive} />
                  {state.mode === "manual" && isActive && (
                    <span className="pointer-events-none absolute -right-2 -top-2 rounded-full bg-bg p-1 text-accent">
                      <Search size={10} aria-hidden="true" />
                    </span>
                  )}
                </motion.button>
              );
            })}
        </AnimatePresence>

        <AnimatePresence>
          {state.messages.map((message) => (
            <motion.span
              key={message.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -14 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="pointer-events-none absolute z-30 rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent"
              style={{ left: `${message.x}%`, top: `${message.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {message.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 rounded-lg bg-bg/60 px-3 py-2.5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 text-muted/90">
          <span className="text-text/85">{modeLabel}</span>
          <span className="text-text/85">
            {foundCount}/{state.bugs.length} bugs detected
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-muted/90" aria-live="polite">
            <span className={state.statusKey === "complete" ? "text-emerald-300" : "text-text/85"}>
              {state.statusKey === "complete" ? "Complete" : sandbox.statusLabels[state.statusKey]}
            </span>
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET" })}
            className="inline-flex items-center gap-1 rounded-full bg-surface-2/65 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}

