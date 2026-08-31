import { DashboardCard } from "@/frontend/pages/dashboard/components/dashboard-card";

export default function DashboardPage() {
  return (
    <DashboardCard jobsApplied={42} totalJobs={42} lastSyncDate={"01/01/01"} />
  );
}
