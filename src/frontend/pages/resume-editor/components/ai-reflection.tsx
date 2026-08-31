import { Check, Info, RotateCcw, Sparkles, X } from "lucide-react";
export function ReflectionPopover({
  fieldId,
  changes,
  onAccept,
  onRevert,
  onClose,
}) {
  const change = changes[fieldId];
  if (!change) return null;
  return (
    <div
      data-reflection-root
      className="absolute left-0 top-5 z-30 w-72 p-4 text-left"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.14em]"
          style={{ color: "var(--cyan)" }}
        >
          <Sparkles size={11} /> AI Reflection
        </span>
        <button onClick={onClose} style={{ color: "var(--fg-dim)" }}>
          <X size={13} />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <p
            className="text-[0.6rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Original
          </p>
          <p
            className="mt-1 text-xs leading-relaxed line-through decoration-1"
            style={{ color: "var(--fg-dim)" }}
          >
            {change.original}
          </p>
        </div>
        <div>
          <p
            className="text-[0.6rem] uppercase tracking-[0.1em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Current
          </p>
          <p
            className="mt-1 text-xs leading-relaxed"
            style={{ color: "var(--fg)" }}
          >
            {change.current}
          </p>
        </div>
      </div>

      <div className="glow-divider my-3" />

      <p className="text-xs leading-relaxed" style={{ color: "var(--fg)" }}>
        {change.reason}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onAccept(fieldId)}
          disabled={change.status === "accepted"}
          className="btn-primary flex-1 gap-1.5 !px-3 !py-2 text-[0.62rem] disabled:opacity-40"
        >
          <Check size={12} />
          {change.status === "accepted" ? "Accepted" : "Accept"}
        </button>
        <button
          onClick={() => onRevert(fieldId)}
          className="btn-ghost flex-1 gap-1.5 !px-3 !py-2 text-[0.62rem]"
        >
          <RotateCcw size={12} />
          Revert
        </button>
      </div>
    </div>
  );
}
