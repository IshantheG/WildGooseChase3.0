import { X, Plus, Trash2 } from "lucide-react";
import { type Job } from "@/frontend/types/types";

interface AIContextPopupProps {
  onClose: () => void;
  referenceResumes: { id: string; name: string }[];
  onAddReference: () => void;
  onRemoveReference: (id: string) => void;
  job: Job;
}

export const AIContextPopup = ({
  onClose,
  referenceResumes,
  onAddReference,
  onRemoveReference,
  job,
}: AIContextPopupProps) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(3,6,10,0.8)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl p-6"
        style={{
          background: "rgba(8,13,20,0.97)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="section-title text-lg" style={{ color: "var(--fg)" }}>
            AI Context
          </h3>
          <button onClick={onClose} style={{ color: "var(--fg-dim)" }}>
            <X size={16} />
          </button>
        </div>

        <p
          className="mt-1 text-[0.65rem] uppercase tracking-[0.14em]"
          style={{ color: "var(--cyan)" }}
        >
          Target Job
        </p>
        <div className="mt-2 p-3" style={{ border: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--fg)" }}>
            {job.title}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--fg-dim)" }}>
            {job.employer} · {job.region}
          </p>
        </div>

        <div className="glow-divider my-5" />

        <div className="flex items-center justify-between">
          <p
            className="text-[0.65rem] uppercase tracking-[0.14em]"
            style={{ color: "var(--cyan)" }}
          >
            Reference Resumes
          </p>
          <button
            onClick={onAddReference}
            className="btn-ghost gap-1.5 !px-2.5 !py-1.5 text-[0.6rem]"
          >
            <Plus size={12} />
            Add
          </button>
        </div>

        <div className="mt-2 space-y-1.5">
          {referenceResumes.length === 0 && (
            <p className="text-xs" style={{ color: "var(--fg-dim)" }}>
              No reference resumes added yet.
            </p>
          )}
          {referenceResumes.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-2 text-xs"
              style={{ border: "1px solid var(--border)" }}
            >
              <span style={{ color: "var(--fg)" }}>{r.name}</span>
              <button
                onClick={() => onRemoveReference(r.id)}
                style={{ color: "var(--fg-dim)" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 h-full">
          <textarea
            rows={10}
            className="h-full w-full"
            style={{
              border: "1px solid var(--border)",
              background: "rgba(123,92,245,0.05)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
