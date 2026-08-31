export function Sparkle({ fieldId, changes, onToggle, isOpen }) {
  const change = changes[fieldId];
  if (!change) return null;
  const accepted = change.status === "accepted";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(fieldId);
      }}
      className="relative -top-0.5 ml-1 inline-flex h-4 w-4 items-center justify-center text-[0.7rem] leading-none"
      style={{
        color: accepted ? "var(--teal)" : "var(--cyan)",
        opacity: isOpen ? 1 : 0.85,
      }}
      title={accepted ? "AI change accepted" : "AI change — click to review"}
    >
      ✦
    </button>
  );
}