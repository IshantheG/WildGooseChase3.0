import { DashboardCard } from "@/frontend/pages/dashboard/components/dashboard-card";
import { SyncProgress } from "@/frontend/pages/dashboard/components/sync-progress";
import { useState } from "react";

export default function DashboardPage() {
  const [isSyncing, setIsSyncing] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  return (
    <>
      <div className="pt-[72px]">
        <DashboardCard
          jobsApplied={42}
          totalJobs={42}
          lastSyncDate={"01/01/01"}
        />
      </div>

      {isSyncing && <SyncProgress isSyncing={inProgress} />}
    </>
  );
}
