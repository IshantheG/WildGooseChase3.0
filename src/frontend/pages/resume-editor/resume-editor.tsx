"use client";

import { useEffect, useRef, useState } from "react";
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

const JOB = {
  company: "Suncor",
  title: "Automation, Software or Computer Engineering Student",
  region: "Calgary, AB · In-person",
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

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

const STRUCTURE = {
  experience: [
    {
      id: "exp1",
      companyId: "exp1-company",
      titleId: "exp1-title",
      locationId: "exp1-location",
      datesId: "exp1-dates",
      bulletIds: ["exp1-b1", "exp1-b2", "exp1-b3"],
    },
    {
      id: "exp2",
      companyId: "exp2-company",
      titleId: "exp2-title",
      locationId: "exp2-location",
      datesId: "exp2-dates",
      bulletIds: ["exp2-b1", "exp2-b2"],
    },
  ],
  projects: [
    {
      id: "proj1",
      nameId: "proj1-name",
      stackId: "proj1-stack",
      datesId: "proj1-dates",
      bulletIds: ["proj1-b1", "proj1-b2"],
    },
  ],
  education: [
    {
      id: "edu1",
      schoolId: "edu1-school",
      degreeId: "edu1-degree",
      locationId: "edu1-location",
      datesId: "edu1-dates",
    },
  ],
  skills: [
    {
      id: "skill-lang",
      labelId: "skill-lang-label",
      itemsId: "skill-lang-items",
    },
    {
      id: "skill-frame",
      labelId: "skill-frame-label",
      itemsId: "skill-frame-items",
    },
    {
      id: "skill-tools",
      labelId: "skill-tools-label",
      itemsId: "skill-tools-items",
    },
  ],
};

const INITIAL_FIELDS = {
  "header-name": "Jordan Reyes",
  "header-contact":
    "jordan.reyes@email.com · (403) 555-0176 · linkedin.com/in/jordanreyes · github.com/jreyes",
  "overview-summary":
    "Computer Engineering student with hands-on experience building automation tooling and full-stack web applications. Comfortable moving between embedded and software contexts, with a track record of shipping production features independently.",

  "exp1-company": "Northline Robotics",
  "exp1-title": "Software Engineering Co-op",
  "exp1-location": "Waterloo, ON",
  "exp1-dates": "May 2025 – Aug 2025",
  "exp1-b1":
    "Built a Python service to log and visualize sensor data from test rigs, cutting manual review time significantly.",
  "exp1-b2":
    "Worked with hardware and firmware teams to debug intermittent communication failures on a CAN bus interface.",
  "exp1-b3":
    "Wrote unit and integration tests that raised coverage on the diagnostics module.",

  "exp2-company": "Campus IT Services",
  "exp2-title": "Technical Support Assistant",
  "exp2-location": "Waterloo, ON",
  "exp2-dates": "Sep 2024 – Dec 2024",
  "exp2-b1":
    "Resolved networking and hardware tickets for students and staff across three campus buildings.",
  "exp2-b2":
    "Documented recurring issues into a shared knowledge base used by the rest of the support team.",

  "proj1-name": "FillerZero",
  "proj1-stack": "PyTorch · FastAPI · React",
  "proj1-dates": "2025",
  "proj1-b1":
    "Implemented an MCTS-based reinforcement learning agent trained against a custom simulation environment.",
  "proj1-b2":
    "Exposed the trained model through a FastAPI backend with a React front end for live evaluation.",

  "edu1-school": "University of Waterloo",
  "edu1-degree": "B.A.Sc. in Computer Engineering",
  "edu1-location": "Waterloo, ON",
  "edu1-dates": "Expected 2028",

  "skill-lang-label": "Languages",
  "skill-lang-items": "Python, TypeScript, C++, SQL",
  "skill-frame-label": "Frameworks",
  "skill-frame-items": "React, Next.js, Spring Boot, FastAPI",
  "skill-tools-label": "Tools",
  "skill-tools-items": "Git, Docker, PostgreSQL, Linux",
};

const INITIAL_AI_CHANGES = {
  "overview-summary": {
    original:
      "Computer Engineering student interested in software and automation, looking for a co-op placement.",
    reason:
      "Rewrote the summary in outcome-oriented language and surfaced automation + full-stack experience, since both are emphasized in the posting.",
    status: "pending",
  },
  "exp1-b1": {
    original: "Built a tool to log sensor data from test rigs.",
    reason:
      "Reworded to name the language used (Python) and quantify the benefit qualitatively, matching phrasing patterns common in the job's requirements.",
    status: "pending",
  },
  "exp1-b2": {
    original:
      "Helped debug hardware communication issues with the firmware team.",
    reason:
      'Adjusted terminology to "CAN bus interface" since that\'s the specific system involved — makes the automation/controls overlap with the role explicit.',
    status: "accepted",
  },
  "skill-lang-items": {
    original: "Python, TypeScript, C++",
    reason:
      "Added SQL, which appears elsewhere on your base resume, since the role lists database familiarity as a plus.",
    status: "pending",
  },
};

const ACTIONS = [
  { id: "rewrite", label: "Rewrite", icon: Wand2 },
  { id: "concise", label: "Make concise", icon: Scissors },
  { id: "impact", label: "Add impact", icon: TrendingUp },
  { id: "align", label: "Align with job", icon: Target },
  { id: "explain", label: "Explain change", icon: MessageCircleQuestion },
];

const ACTION_REASONS = {
  rewrite:
    "Rephrased for stronger, more active language while keeping the same underlying claim.",
  concise: "Trimmed filler words to tighten this line without losing meaning.",
  impact:
    "Flagged for a quantifiable metric — add a real number before accepting; nothing here was invented.",
  align:
    "Reworded to echo terminology from the target posting, only where it already matched your experience.",
};

function mockTransform(actionId, text) {
  const trimmed = text.replace(/\.\s*$/, "");
  switch (actionId) {
    case "rewrite":
      return trimmed + ", rephrased for clarity.";
    case "concise": {
      const words = text.split(" ");
      const cut = Math.max(4, Math.ceil(words.length * 0.7));
      return (
        words.slice(0, cut).join(" ") + (text.trim().endsWith(".") ? "." : "")
      );
    }
    case "impact":
      return trimmed + " — quantify impact here.";
    case "align":
      return trimmed + ", aligned with target role terminology.";
    default:
      return text;
  }
}

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

function AIContextModal({
  onClose,
  referenceResumes,
  onAddReference,
  onRemoveReference,
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(3,6,10,0.8)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg p-6"
        style={{
          background: "rgba(8,13,20,0.97)",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
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
            {JOB.title}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: "var(--fg-dim)" }}>
            {JOB.company} · {JOB.region}
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

        <div
          className="mt-5 flex items-start gap-2 p-3"
          style={{
            border: "1px solid var(--border)",
            background: "rgba(123,92,245,0.05)",
          }}
        >
          <Info
            size={14}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--violet)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--fg-dim)" }}
          >
            Reference resumes are used as stylistic and contextual sources only
            — for tone, structure, and phrasing. They can never introduce
            experience, skills, or accomplishments that aren't already on your
            base resume.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Root                                                                    */
/* ---------------------------------------------------------------------- */

export default function ResumeEditor() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [aiChanges, setAiChanges] = useState(INITIAL_AI_CHANGES);
  const [openReflectionId, setOpenReflectionId] = useState(null);
  const [toolbar, setToolbar] = useState(null); // {x,y,fieldId}
  const [showAIContext, setShowAIContext] = useState(false);
  const [showJobAnalysis, setShowJobAnalysis] = useState(false);
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

  const pendingCount = Object.values(aiChanges).filter(
    (c) => c.status === "pending",
  ).length;
  const totalChanges = Object.keys(aiChanges).length;
  const matchedKeywords = JOB_ANALYSIS.keywords.filter((k) => k.matched).length;
  const matchScore = Math.round(
    (matchedKeywords / JOB_ANALYSIS.keywords.length) * 100,
  );

  function commitField(id, text) {
    setFields((prev) => ({ ...prev, [id]: text }));
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setVersion((v) => v + 1);
    }, 500);
  }

  function acceptChange(id) {
    setAiChanges((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: "accepted" },
    }));
  }

  function revertChange(id) {
    const original = baseline.current[id];
    setFields((prev) => ({ ...prev, [id]: original }));
    if (fieldRefs.current[id]) fieldRefs.current[id].innerText = original;
    setAiChanges((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setOpenReflectionId(null);
  }

  function acceptAll() {
    setAiChanges((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => {
        next[id] = { ...next[id], status: "accepted" };
      });
      return next;
    });
    setToast("All AI changes accepted.");
  }

  function handleSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !docRef.current) {
      setToolbar(null);
      return;
    }
    const anchorEl =
      sel.anchorNode?.nodeType === 3
        ? sel.anchorNode.parentElement
        : sel.anchorNode instanceof Element
          ? sel.anchorNode
          : null;

    const fieldEl = anchorEl?.closest("[data-field-id]");

    if (!fieldEl || !docRef.current.contains(fieldEl)) {
      setToolbar(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = docRef.current.getBoundingClientRect();
    setToolbar({
      x: rect.left - containerRect.left + docRef.current.scrollLeft,
      y: rect.top - containerRect.top + docRef.current.scrollTop - 40,
      fieldId: fieldEl.getAttribute("data-field-id"),
      text: sel.toString(),
    });
  }

  function applyAction(actionId) {
    if (!toolbar) return;
    const { fieldId, text } = toolbar;

    if (actionId === "explain") {
      if (aiChanges[fieldId]) {
        setOpenReflectionId(fieldId);
      } else {
        setToast("No AI change recorded for this text yet.");
      }
      setToolbar(null);
      window.getSelection()?.removeAllRanges();
      return;
    }

    const transformed = mockTransform(actionId, text);
    try {
      document.execCommand("insertText", false, transformed);
    } catch {
      // execCommand can be unavailable in some environments — fall back
      // to a full-field replace so the demo still works.
    }
    const el = fieldRefs.current[fieldId];
    const newFullText = el
      ? el.innerText.replace(/\n/g, el.tagName === "DIV" ? "\n" : " ")
      : fields[fieldId];
    setFields((prev) => ({ ...prev, [fieldId]: newFullText }));
    setAiChanges((prev) => ({
      ...prev,
      [fieldId]: {
        original: baseline.current[fieldId],
        current: newFullText,
        reason: ACTION_REASONS[actionId],
        status: "pending",
      },
    }));
    setToast(`✦ ${ACTIONS.find((a) => a.id === actionId)?.label} applied`);
    setToolbar(null);
    window.getSelection()?.removeAllRanges();
  }

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

  function scrollToSection(id) {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setToast("Resume exported as PDF.");
    }, 1200);
  }

  return (
    <div
      className="relative z-10 flex h-screen flex-col pt-[60px] bg-[#03060a]"
      onMouseDownCapture={(e) => {
        const target = e.target;

        if (!(target instanceof Element)) return;

        if (!target.closest("[data-reflection-root]")) {
          setOpenReflectionId(null);
        }

        if (
          !target.closest("[data-selection-toolbar]") &&
          !target.closest("[data-field-id]")
        ) {
          setToolbar(null);
        }
      }}
    >
      {/* Top bar */}
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
              {JOB.company}
            </span>
            <span className="mx-1.5 text-xs" style={{ color: "var(--fg-dim)" }}>
              ·
            </span>
            <span
              className="truncate text-xs"
              style={{ color: "var(--fg-dim)" }}
            >
              {JOB.title}
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
                Saved · v{version}
              </>
            )}
          </div>
          {pendingCount > 0 && (
            <span className="text-[0.62rem]" style={{ color: "var(--fg-dim)" }}>
              {pendingCount} pending AI change{pendingCount !== 1 ? "s" : ""}
            </span>
          )}
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

      {/* Body */}
      <div className="grid min-h-0 flex-1 grid-cols-[240px_1fr_320px]">
        {/* Left: nav + AI review */}
        <div
          className="flex flex-col overflow-y-auto border-r p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="px-1 text-[0.62rem] uppercase tracking-[0.16em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Resume
          </p>
          <div className="mt-2 flex flex-col gap-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="flex items-center justify-between px-2.5 py-2 text-left text-xs transition-colors"
                style={{ color: "var(--fg)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,229,255,0.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {s.label}
                <ChevronRight size={12} style={{ color: "var(--fg-dim)" }} />
              </button>
            ))}
          </div>

          <div className="glow-divider my-4" />

          <div className="p-3" style={{ border: "1px solid var(--border)" }}>
            <p
              className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em]"
              style={{ color: "var(--cyan)" }}
            >
              <Sparkles size={11} /> AI Review
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
                className="flex items-center justify-between text-[0.6rem]"
                style={{ color: "var(--fg-dim)" }}
              >
                <span>Keyword coverage</span>
                <span>
                  {matchedKeywords}/{JOB_ANALYSIS.keywords.length}
                </span>
              </div>
              <div
                className="mt-1 h-1 w-full"
                style={{ background: "var(--border)" }}
              >
                <div
                  className="h-1"
                  style={{
                    width: `${matchScore}%`,
                    background:
                      "linear-gradient(90deg, var(--cyan), var(--teal))",
                  }}
                />
              </div>
            </div>

            <div
              className="mt-3 flex items-center justify-between text-[0.6rem]"
              style={{ color: "var(--fg-dim)" }}
            >
              <span>AI changes</span>
              <span>
                {totalChanges} total · {pendingCount} pending
              </span>
            </div>

            <button
              onClick={acceptAll}
              disabled={pendingCount === 0}
              className="btn-primary mt-3 w-full gap-1.5 !py-2 text-[0.6rem] disabled:opacity-30"
            >
              <Check size={12} />
              Accept All
            </button>
          </div>

          <button
            onClick={() => setShowJobAnalysis((v) => !v)}
            className="mt-3 flex items-center justify-between px-1 py-2 text-[0.62rem] uppercase tracking-[0.14em]"
            style={{ color: "var(--fg-dim)" }}
          >
            <span className="flex items-center gap-1.5">
              <Target size={12} />
              Job Analysis
            </span>
            <ChevronDown
              size={13}
              style={{
                transform: showJobAnalysis ? "rotate(180deg)" : "none",
                transition: "transform 0.15s",
              }}
            />
          </button>
          {showJobAnalysis && (
            <div className="px-1 pb-1">
              <p className="text-xs" style={{ color: "var(--fg)" }}>
                {JOB_ANALYSIS.roleType}
              </p>
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
                      <CircleDashed
                        size={11}
                        style={{ color: "var(--fg-dim)" }}
                      />
                    )}
                    {k.term}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowAIContext(true)}
            className="btn-ghost mt-3 gap-1.5 !py-2 text-[0.6rem]"
          >
            <Info size={12} />
            AI Context
          </button>
        </div>

        <div className="h-full w-full">
          <textarea rows={20} cols={20} />
        </div>

        {/* Right: live preview (rough placeholder) */}
        <div
          className="overflow-y-auto border-l p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="mb-3 px-1 text-[0.62rem] uppercase tracking-[0.16em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Live Preview
          </p>
          <div
            className="paper p-5 text-[0.55rem] leading-snug"
            style={{
              background: "#f7f5ef",
              boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            }}
          >
            <p className="text-center text-[0.85rem] font-bold">
              {fields["header-name"]}
            </p>
            <p className="text-center text-[0.5rem]" style={{ color: "#555" }}>
              {fields["header-contact"]}
            </p>

            <p
              className="mt-2 border-b pb-0.5 font-bold uppercase"
              style={{ borderColor: "#999" }}
            >
              Summary
            </p>
            <p className="mt-1">{fields["overview-summary"]}</p>

            <p
              className="mt-2 border-b pb-0.5 font-bold uppercase"
              style={{ borderColor: "#999" }}
            >
              Experience
            </p>
            {STRUCTURE.experience.map((exp) => (
              <div key={exp.id} className="mt-1.5">
                <div className="flex justify-between font-bold">
                  <span>{fields[exp.companyId]}</span>
                  <span className="italic font-normal">
                    {fields[exp.datesId]}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{fields[exp.titleId]}</span>
                  <span className="not-italic">{fields[exp.locationId]}</span>
                </div>
                <ul className="list-disc pl-3">
                  {exp.bulletIds.map((bid) => (
                    <li key={bid}>{fields[bid]}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p
              className="mt-2 border-b pb-0.5 font-bold uppercase"
              style={{ borderColor: "#999" }}
            >
              Projects
            </p>
            {STRUCTURE.projects.map((proj) => (
              <div key={proj.id} className="mt-1.5">
                <div className="flex justify-between">
                  <span className="font-bold">
                    {fields[proj.nameId]}{" "}
                    <span className="font-normal italic">
                      {fields[proj.stackId]}
                    </span>
                  </span>
                  <span className="italic">{fields[proj.datesId]}</span>
                </div>
                <ul className="list-disc pl-3">
                  {proj.bulletIds.map((bid) => (
                    <li key={bid}>{fields[bid]}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p
              className="mt-2 border-b pb-0.5 font-bold uppercase"
              style={{ borderColor: "#999" }}
            >
              Education
            </p>
            {STRUCTURE.education.map((edu) => (
              <div key={edu.id} className="mt-1.5">
                <div className="flex justify-between font-bold">
                  <span>{fields[edu.schoolId]}</span>
                  <span className="italic font-normal">
                    {fields[edu.datesId]}
                  </span>
                </div>
                <div className="flex justify-between italic">
                  <span>{fields[edu.degreeId]}</span>
                  <span className="not-italic">{fields[edu.locationId]}</span>
                </div>
              </div>
            ))}

            <p
              className="mt-2 border-b pb-0.5 font-bold uppercase"
              style={{ borderColor: "#999" }}
            >
              Skills
            </p>
            {STRUCTURE.skills.map((s) => (
              <p key={s.id} className="mt-0.5">
                <span className="font-bold">{fields[s.labelId]}:</span>{" "}
                {fields[s.itemsId]}
              </p>
            ))}
          </div>
        </div>
      </div>

      {showAIContext && (
        <AIContextModal
          onClose={() => setShowAIContext(false)}
          referenceResumes={referenceResumes}
          onAddReference={addReference}
          onRemoveReference={removeReference}
        />
      )}

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
    </div>
  );
}
