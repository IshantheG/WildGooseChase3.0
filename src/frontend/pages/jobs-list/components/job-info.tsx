"use client";

import {
  Sparkles,
  Building2,
  Calendar,
  Briefcase,
  Hash,
  Users,
  Layers,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";
import { CloseButton } from "@/frontend/shared-components/close-button";

function buildFields(job) {
  return [
    { label: "Employer", value: job.employer, icon: Building2 },
    { label: "Work Term", value: job.workTerm, icon: Calendar },
    { label: "Job Type", value: job.jobType, icon: Briefcase },
    { label: "Job #", value: job.employerJobNumber, icon: Hash },
    { label: "Openings", value: String(job.openings), icon: Users },
    { label: "Level", value: job.levels.join(" / "), icon: Layers },
    { label: "Region", value: job.region, icon: MapPin },
    { label: "Province", value: job.province, icon: MapPin },
    { label: "Postal Code", value: job.postalCode, icon: MapPin },
    { label: "Country", value: job.country, icon: MapPin },
    { label: "Arrangement", value: job.locationArrangement, icon: Building2 },
    { label: "Duration", value: job.duration, icon: Clock },
    { label: "Compensation", value: job.compensation, icon: DollarSign },
  ];
}

function CornerBrackets() {
  const color = { borderColor: "var(--cyan)", opacity: 0.6 };
  return (
    <>
      <span
        className="absolute w-4 h-4 pointer-events-none top-0 left-0 border-t border-l"
        style={color}
      />
      <span
        className="absolute w-4 h-4 pointer-events-none top-0 right-0 border-t border-r"
        style={color}
      />
      <span
        className="absolute w-4 h-4 pointer-events-none bottom-0 left-0 border-b border-l"
        style={color}
      />
      <span
        className="absolute w-4 h-4 pointer-events-none bottom-0 right-0 border-b border-r"
        style={color}
      />
    </>
  );
}

export default function JobInfo({
  job,
  onClose = () => {},
  onTailorResume = () => console.log("Tailor Resume clicked — wire this up"),
}) {
  const fields = buildFields(job);

  return (
    <div
      className="job-modal-theme fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <style>{`
        .job-modal-theme {
          --ink: #03060a;
          --panel: #080d14;
          --border: #0f1d2e;
          --cyan: #00e5ff;
          --teal: #00ffc8;
          --violet: #7b5cf5;
          --azure: #1a8fff;
          --fg: #c8ddf0;
          --fg-dim: #5a7a99;
          font-family: var(--font-mono, "Space Mono", monospace);
        }
        .job-modal-theme .section-title {
          font-family: var(--font-syne, "Syne", sans-serif);
        }
      `}</style>

      <div
        className="relative h-[90vh] max-h-[90vh] w-full max-w-5xl overflow-hidden grid grid-cols-[7fr_3fr]"
        style={{
          border: "1px solid var(--border)",
          background: "rgba(8,13,20,0.96)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CornerBrackets />
        <div
          className="flex flex-col items-start gap-4 p-6 h-full min-h-0 "
          style={{ borderColor: "var(--border)" }}
        >
          <div className="min-w-0 ml-8 mt-4">
            <p
              className="text-[0.65rem] uppercase tracking-[0.24em]"
              style={{ color: "var(--cyan)" }}
            >
              {job.employer} · {job.jobType}
            </p>
            <h2
              className="section-title mt-2 text-xl leading-snug sm:text-2xl"
              style={{ color: "var(--fg)" }}
            >
              {job.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.levels.map((lvl) => (
                <span
                  key={lvl}
                  className="px-2 py-1 text-[0.6rem] uppercase tracking-[0.14em]"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--teal)",
                  }}
                >
                  {lvl}
                </span>
              ))}
            </div>
          </div>

          <div className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 min-h-0 overflow-y-auto">
            <div className="p-6 sm:p-8">
              <section>
                <h3
                  className="text-[0.65rem] uppercase tracking-[0.2em]"
                  style={{ color: "var(--violet)" }}
                >
                  Job Summary
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--fg)" }}
                >
                  {job.summary}
                </p>
              </section>

              <div className="glow-divider my-6" />

              <section>
                <h3
                  className="text-[0.65rem] uppercase tracking-[0.2em]"
                  style={{ color: "var(--violet)" }}
                >
                  Job Responsibilities
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--fg)" }}
                >
                  {job.responsibilities}
                </p>
              </section>

              <div className="glow-divider my-6" />

              <section>
                <h3
                  className="text-[0.65rem] uppercase tracking-[0.2em]"
                  style={{ color: "var(--violet)" }}
                >
                  Required Skills
                </h3>
                <ul className="mt-3 space-y-2">
                  {job.requiredSkills.map((skill) => (
                    <li
                      key={skill}
                      className="flex gap-2 text-sm leading-relaxed"
                      style={{ color: "var(--fg)" }}
                    >
                      <span style={{ color: "var(--cyan)" }}>›</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col p-6"
          style={{
            borderLeft: "1px solid var(--border)",
            background: "rgba(0,229,255,0.02)",
          }}
        >
          <div className="flex flex-row justify-end gap-3 mb-4">
            <CloseButton onClick={onClose} />
          </div>

          <div className="flex-1">
            {fields.map((f) => {
              const Icon = f.icon;

              return (
                <div
                  key={f.label}
                  className="flex items-start justify-between gap-4 py-2.5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span
                    className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.14em]"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    <Icon size={12} style={{ color: "var(--cyan)" }} />
                    {f.label}
                  </span>

                  <span
                    className="text-right text-xs"
                    style={{ color: "var(--fg)" }}
                  >
                    {f.value}
                  </span>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={onTailorResume}
            className="btn-primary gap-2 mt-6 w-full"
          >
            <Sparkles size={14} />
            Tailor Resume
          </button>
        </div>
      </div>
    </div>
  );
}
