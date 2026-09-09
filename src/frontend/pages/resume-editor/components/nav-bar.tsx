import { ArrowLeft, CircleCheck, FileDown, Loader2 } from "lucide-react";
import { type Job } from "@/frontend/types/types";

interface ResumeEditorNavBarProps {
  saveState: string;
  exporting: boolean;
  handleExport: () => void;
  job: Job;
}

export const ResumeEditorNavBar = ({
  saveState,
  exporting,
  handleExport,
  job,
}: ResumeEditorNavBarProps) => {
  return (
    <div
      className="flex h-14 shrink-0 items-center justify-between border-b px-4"
      style={{ borderColor: "var(--border)", background: "rgba(3,6,10,0.9)" }}
    >
      <div className="flex items-center gap-4 min-w-0">
        <button
          className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.14em]"
          style={{ color: "var(--fg-dim)" }}
        >
          <ArrowLeft size={13} />
          Jobs
        </button>
        <div className="h-4 w-px" style={{ background: "var(--border)" }} />
        <div className="min-w-0 truncate">
          <span className="text-xs" style={{ color: "var(--fg)" }}>
            {job.employer}
          </span>
          <span className="mx-1.5 text-xs" style={{ color: "var(--fg-dim)" }}>
            ·
          </span>
          <span className="truncate text-xs" style={{ color: "var(--fg-dim)" }}>
            {job.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-1.5 text-[0.62rem]"
          style={{ color: "var(--fg-dim)" }}
        >
          {saveState === "saving" ? (
            <>
              <Loader2
                size={12}
                className="animate-spin"
                style={{ color: "var(--cyan)" }}
              />
              Saving…
            </>
          ) : (
            <>
              <CircleCheck size={12} style={{ color: "var(--teal)" }} />
              Saved
            </>
          )}
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-primary gap-2"
        >
          {exporting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <FileDown size={13} />
          )}
          {exporting ? "Exporting…" : "Export PDF"}
        </button>
      </div>
    </div>
  );
};
