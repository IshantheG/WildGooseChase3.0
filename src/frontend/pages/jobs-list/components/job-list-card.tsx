"use client";

import { forwardRef } from "react";
import { type Job } from "@/frontend/types/types";

type JobCardProps = {
  job: Job;
  accent: string;
  selectJob: (job: Job | null) => void;
};

export const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ job, accent, selectJob }: JobCardProps, ref) => {
    return (
      <div
        ref={ref}
        className="transition-[transform,opacity] duration-150 will-change-transform"
        onClick={() => {
          selectJob(job);
        }}
      >
        <div
          className="rounded-lg m-3  bg-slate-900/70 group grid grid-cols-[2.4fr_1fr_1fr_1fr_1.3fr] items-center gap-4 border-b border-[#0f1d2e] border-l-2 border-l-transparent px-5 py-4 transition-all duration-200 hover:scale-[1.03] hover:bg-[#0b121c]"
          style={{ ["--accent" as string]: accent }}
        >
          <style>{`
        .group:hover { border-left-color: var(--accent); }
        .group:hover .role { color: #eaf6ff; }
        .group:hover .logo { box-shadow: 0 0 0 1px var(--accent) inset, 0 0 18px -6px var(--accent); }
      `}</style>

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="logo flex h-9 w-9 shrink-0 items-center justify-center border border-[#0f1d2e] bg-white/[0.02] font-chakra text-[13px] font-bold transition-shadow duration-200 [clip-path:polygon(6px_0%,100%_0%,100%_calc(100%-6px),calc(100%-6px)_100%,0%_100%,0%_6px)]"
              style={{ color: accent }}
            >
              {job.employer.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-syne truncate text-[14.5px] font-semibold text-[#c8ddf0] transition-colors duration-200">
                {job.title}
              </p>
              <p className="truncate text-[11.5px] tracking-wide text-[#5a7a99] ">
                {job.employer}
              </p>
            </div>
          </div>

          <p className="text-[13px] font-mono text-[#00ffc8]">
            {job.compensation}
          </p>

          <div className="flex items-center gap-2 text-[12.5px] text-[#5a7a99]">
            <span className="h-[5px] w-[5px] shrink-0 bg-[#5a7a99]" />
            {job.region}
          </div>

          <span className="w-fit border border-[#0f1d2e] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] text-[#5a7a99] [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]">
            {job.levels.join(", ")}
          </span>

          <button className="relative ml-auto inline-flex items-center gap-1.5 overflow-hidden border border-[#00e5ff] bg-[#00e5ff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#03060a] transition-transform duration-200 hover:-translate-y-px [clip-path:polygon(8px_0%,100%_0%,calc(100%-8px)_100%,0%_100%)] before:absolute before:inset-y-0 before:left-[-60%] before:w-[40%] before:-skew-x-[20deg] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:transition-[left] before:duration-500 hover:before:left-[130%]">
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
            Generate
          </button>
        </div>
      </div>
    );
  },
);
