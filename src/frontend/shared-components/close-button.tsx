import { X } from "lucide-react";
export function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center border transition-colors"
      style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--violet)";
        e.currentTarget.style.color = "var(--violet)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--fg-dim)";
      }}
    >
      <X size={16} />
    </button>
  );
}
