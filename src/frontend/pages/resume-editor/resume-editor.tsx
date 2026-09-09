"use client";

import { useEffect, useRef, useState } from "react";
import { useResumePdf } from "@/frontend/pages/resume-editor/hooks/use-resume-pdf";
import {
  ArrowLeft,
  Sparkles,
  FileDown,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Info,
  Target,
  Wand2,
  Scissors,
  TrendingUp,
  MessageCircleQuestion,
  Plus,
  Trash2,
  Loader2,
  CircleCheck,
  CircleDashed,
} from "lucide-react";
import { ResumeEditorNavBar } from "@/frontend/pages/resume-editor/components/nav-bar";
import { AIContextPopup } from "@/frontend/pages/resume-editor/components/ai-context-popup";
import { SideBar } from "@/frontend/pages/resume-editor/components/side-bar";

import { JOB, ACTIONS, INITIAL_AI_CHANGES, INITIAL_FIELDS } from "./temp-vars";

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


function IconBtn({ icon: Icon, onClick, label, tone = "white", size = 14 }) {
  const colors = {
    white: "var(--fg-white)",
    cyan: "var(--cyan)",
    teal: "var(--teal)",
    violet: "var(--violet)",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex items-center justify-center rounded-sm p-1.5 transition-colors hover:bg-[rgba(0,229,255,0.08)]"
      style={{ color: colors[tone] }}
    >
      <Icon size={size} />
    </button>
  );
}

function SelectionToolbar({ toolbar, onAction }) {
  if (!toolbar) return null;
  return (
    <div
      className="absolute z-40 flex items-center gap-0.5 p-1"
      style={{
        left: toolbar.x,
        top: toolbar.y,
        background: "var(--panel)",
        border: "1px solid var(--border)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {ACTIONS.map((a) => (
        <IconBtn
          key={a.id}
          icon={a.icon}
          label={a.label}
          tone="cyan"
          onClick={() => onAction(a.id)}
        />
      ))}
    </div>
  );
}

export default function ResumeEditor() {
  const [dslText, setDslText] = useState("");
  const { pdfUrl, isCompiling, error } = useResumePdf(dslText);
  const [showAIContext, setShowAIContext] = useState(false);
  const [referenceResumes, setReferenceResumes] = useState([
    { id: "r1", name: "SoftwareEng_Resume_v2.pdf" },
  ]);
  const [saveState, setSaveState] = useState("saved"); // saved | saving
  const [version, setVersion] = useState(4);
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState(null);

  const baseline = useRef(JSON.parse(JSON.stringify(INITIAL_FIELDS)));
  const fieldRefs = useRef({});
  const docRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const matchedKeywords = JOB_ANALYSIS.keywords.filter((k) => k.matched).length;
  const matchScore = Math.round(
    (matchedKeywords / JOB_ANALYSIS.keywords.length) * 100,
  );


  function addReference() {
    const id = `r${referenceResumes.length + 1}`;
    setReferenceResumes((prev) => [
      ...prev,
      { id, name: `Reference_Resume_${prev.length + 1}.pdf` },
    ]);
  }

  function removeReference(id) {
    setReferenceResumes((prev) => prev.filter((r) => r.id !== id));
  }

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setToast("Resume exported as PDF.");
    }, 1200);
  }

  return (
    <div className="relative z-10 flex h-screen flex-col pt-[60px] bg-[#03060a]">
      <ResumeEditorNavBar
        saveState={saveState}
        exporting={exporting}
        handleExport={handleExport}
        job={JOB}
      />

      <div className="grid min-h-0 flex-1 grid-cols-[2fr_6fr_5fr]">
        <div>
          <SideBar
            matchScore={matchScore}
            matchedKeywords={matchedKeywords}
            setShowAIContext={setShowAIContext}
          />
        </div>
        <div className="p-4 border border-white/10">
          <textarea
            value={dslText}
            onChange={(e) => setDslText(e.target.value)}
            placeholder="Start typing..."
            className="w-full h-full
            border-0"
          />
        </div>
        <div className="relative border border-white/10">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Resume preview"
              className="w-full h-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white/40">
              Start typing to see your resume
            </div>
          )}

          {isCompiling && (
            <div
              className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 text-xs"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
              }}
            >
              <Loader2 size={12} className="animate-spin" />
              Compiling…
            </div>
          )}

          {error && (
            <div
              className="absolute bottom-2 left-2 right-2 px-2 py-1.5 text-xs"
              style={{
                background: "var(--panel)",
                border: "1px solid #ff5566",
                color: "#ff8899",
              }}
            >
              {error}
            </div>
          )}
        </div>

        {toast && (
          <div
            className="fixed bottom-6 left-1/2 z-[300] -translate-x-1/2 px-4 py-2.5 text-xs"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--cyan)",
              color: "var(--fg)",
            }}
          >
            {toast}
          </div>
        )}

        {showAIContext && (
          <AIContextPopup
            onClose={() => setShowAIContext(false)}
            referenceResumes={referenceResumes}
            onAddReference={addReference}
            onRemoveReference={removeReference}
            job={JOB}
          />
        )}
      </div>
    </div>
  );
}
