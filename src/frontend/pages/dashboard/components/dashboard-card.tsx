import { Link } from "react-router-dom";

type DashboardCardProps = {
  jobsApplied: number;
  lastSyncDate: string;
  totalJobs: number;
};

export function DashboardCard({ jobsApplied, lastSyncDate, totalJobs }: DashboardCardProps) {
  return (
    <section className="hero-card mx-auto w-full max-w-xl">
      <div className="relative z-10 space-y-8 text-center">
        <div className="space-y-3">
          <p className="font-mono text-[0.85rem] uppercase tracking-[0.35em] text-cyan/80 justify-center text-center">
            Dashboard
          </p>
          <h1 className="section-title text-[clamp(2rem,2.5vw,3rem)] leading-[0.95] text-fg text-left">
            Jobs Applied:
            <span className="ml-3 bg-gradient-to-r from-cyan via-teal to-violet bg-clip-text">
              {jobsApplied}
            </span>
          </h1>
          <h1 className="section-title text-[clamp(2rem,2.5vw,3rem)] leading-[0.95] text-fg text-left">
            Total Jobs:
            <span className="ml-3 bg-gradient-to-r from-cyan via-teal to-violet bg-clip-text">
              {totalJobs}
            </span>
          </h1>
          <h1 className="section-title text-[clamp(2rem,2.5vw,3rem)] leading-[0.95] text-fg text-left">
            Last Synced:
            <span className="ml-3 bg-gradient-to-r from-cyan via-teal to-violet bg-clip-text">
              {lastSyncDate}
            </span>
          </h1>
          
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn-primary flex-1">
            Sync Jobs
          </button>
          <Link to="/jobs" className="btn-ghost flex-1">
            View Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
