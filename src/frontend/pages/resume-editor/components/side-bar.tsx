import { CircleCheck, CircleDashed, Info } from "lucide-react";

const JOB_ANALYSIS = {
  roleType: "Software / Automation Co-op — Energy Sector",
  keywords: [
    { term: "Python", matched: true },
    { term: "Automation & controls", matched: true },
    { term: "PLC / SCADA", matched: false },
    { term: "Cross-functional collaboration", matched: true },
    { term: "Electrical fundamentals", matched: false },
    { term: "Version control (Git)", matched: true },
    { term: "Full-time student status", matched: true },
    { term: "Transcript on file", matched: true },
  ],
};

interface SideBarProps {
  matchScore: number;
  matchedKeywords: number;
  setShowAIContext: (show: boolean) => void;
}

export function SideBar({ matchScore, setShowAIContext }: SideBarProps) {
  return (
    <div
      className="flex flex-col overflow-y-auto border-r p-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="p-3" style={{ border: "1px solid var(--border)" }}>
        <p
          className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em]"
          style={{ color: "var(--cyan)" }}
        >
          AI Review
        </p>

        <div className="mt-3 flex items-end justify-between">
          <span
            className="text-2xl"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-syne, Syne, sans-serif)",
            }}
          >
            {matchScore}%
          </span>
          <span
            className="pb-1 text-[0.6rem]"
            style={{ color: "var(--fg-dim)" }}
          >
            match score
          </span>
        </div>

        <div className="mt-3">
          <div
            className="mt-1 h-1 w-full"
            style={{ background: "var(--border)" }}
          >
            <div
              className="h-1"
              style={{
                width: `${matchScore}%`,
                background: "linear-gradient(90deg, var(--cyan), var(--teal))",
              }}
            />
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-between text-[0.6rem]"
          style={{ color: "var(--fg-dim)" }}
        >
          <span>AI changes</span>
          <span></span>
        </div>
      </div>

      <div className="px-1 pb-1">
        <p className="text-xs" style={{ color: "var(--fg)" }}></p>
        <div className="mt-2 flex flex-col gap-1">
          {JOB_ANALYSIS.keywords.map((k) => (
            <div
              key={k.term}
              className="flex items-center gap-1.5 text-[0.65rem]"
              style={{ color: k.matched ? "var(--fg)" : "var(--fg-dim)" }}
            >
              {k.matched ? (
                <CircleCheck size={11} style={{ color: "var(--teal)" }} />
              ) : (
                <CircleDashed size={11} style={{ color: "var(--fg-dim)" }} />
              )}
              {k.term}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowAIContext(true)}
        className="btn-ghost mt-3 gap-1.5 py-2 "
      >
        <Info size={12} />
        AI Context
      </button>
    </div>
  );
}
