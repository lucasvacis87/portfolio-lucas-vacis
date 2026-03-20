import { ArrowUp, ArrowDown, RotateCcw } from "lucide-react";

type NavigationControlsProps = {
  canGoPrevious: boolean;
  canGoNext: boolean;
  showCurrentRole: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCurrentRole: () => void;
};

function ControlButton({
  label,
  icon,
  onClick,
  disabled
}: {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#101722]/92 text-text/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_26px_rgba(0,0,0,0.32)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#141e2c] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {icon}
    </button>
  );
}

export function NavigationControls({
  canGoPrevious,
  canGoNext,
  showCurrentRole,
  onPrevious,
  onNext,
  onCurrentRole
}: NavigationControlsProps): JSX.Element {
  return (
    <aside className="flex shrink-0 items-center lg:items-start">
      <div className="surface-panel flex w-full items-center gap-2 rounded-2xl bg-[#0f161f]/84 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_12px_30px_rgba(0,0,0,0.28)] lg:w-[9.5rem] lg:flex-col lg:items-center">
        <ControlButton label="Show previous experience" icon={<ArrowUp size={17} aria-hidden="true" />} onClick={onPrevious} disabled={!canGoPrevious} />
        <ControlButton label="Show next experience" icon={<ArrowDown size={17} aria-hidden="true" />} onClick={onNext} disabled={!canGoNext} />
        <button
          type="button"
          onClick={onCurrentRole}
          aria-label="Return to current role"
          disabled={!showCurrentRole}
          className={`inline-flex h-11 w-[8.25rem] items-center justify-center gap-1.5 rounded-xl bg-white/[0.05] px-3 text-xs font-semibold tracking-[0.02em] text-text/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-200 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
            showCurrentRole ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <RotateCcw size={13} aria-hidden="true" />
          Current role
        </button>
      </div>
    </aside>
  );
}

