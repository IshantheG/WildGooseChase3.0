"use client";

type SyncProgressProps = {
  isSyncing: boolean;
};

export function SyncProgress({ isSyncing }: SyncProgressProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(44, 49, 55, 0.1)", backdropFilter: "blur(6px)" }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />

      <div className="relative w-full max-w-sm overflow-hidden border border-white/10 bg-[#081018] px-6 py-7 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5">
          {isSyncing ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          ) : (
            <span className="text-lg font-semibold text-[#6dffb1]">✓</span>
          )}
        </div>

        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          {isSyncing ? "Sync status" : "Sync complete"}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-wide text-white">
          {isSyncing ? "Syncing..." : "Done!"}
        </h2>
      </div>
    </div>
  );
}
