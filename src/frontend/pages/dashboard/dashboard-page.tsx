import { DashboardCard } from "@/frontend/pages/dashboard/components/dashboard-card";
import { SyncProgress } from "@/frontend/pages/dashboard/components/sync-progress";
import { useState } from "react";
import { useSyncJobsList } from "@/frontend/pages/dashboard/hooks/use-sync-jobs-list";

export default function DashboardPage() {
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "complete">(
    "idle",
  );
  const [cancelRequestError, setCancelRequestError] = useState<string | null>(
    null,
  );
  const { syncJobs, cancelSync, loading, error } = useSyncJobsList();

  const handleClose = async () => {
    setCancelRequestError(null);

    try {
      await cancelSync();
      setSyncStatus("idle");
    } catch (err) {
      setCancelRequestError(
        err instanceof Error
          ? err.message
          : "Request failed. Please try again.",
      );
    }
  };

  return (
    <>
      <div className="pt-[72px]">
        <DashboardCard
          jobsApplied={42}
          totalJobs={42}
          lastSyncDate={"01/01/01"}
          syncJobs={syncJobs}
          setSyncStatus={setSyncStatus}
        />
      </div>

      {syncStatus !== "idle" && (
        <SyncProgress
          isSyncing={loading}
          onClose={handleClose}
          requestFailed={Boolean(cancelRequestError)}
          requestFailedMessage={
            cancelRequestError ?? "Request failed. Please try again."
          }
        />
      )}
    </>
  );
}
