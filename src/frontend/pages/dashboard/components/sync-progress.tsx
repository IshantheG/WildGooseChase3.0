"use client";

type SyncProgressProps = {
  isSyncing: boolean;
  onClose: () => void;
  requestFailed?: boolean;
  requestFailedMessage?: string;
};

export function SyncProgress({
  isSyncing,
  onClose,
  requestFailed = false,
  requestFailedMessage,
}: SyncProgressProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: "rgba(44, 49, 55, 0.1)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />

      <div className="relative w-full max-w-sm overflow-hidden border border-white/10 bg-[#081018] px-6 py-7 text-center shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg leading-none text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5">
          {requestFailed ? (
            <span className="text-lg font-bold text-[#ff7a7a]">!</span>
          ) : isSyncing ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          ) : (
            <span className="text-lg font-semibold text-[#6dffb1]">✓</span>
          )}
        </div>

        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
          {requestFailed
            ? "Request failed"
            : isSyncing
              ? "Sync status"
              : "Sync complete"}
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-wide text-white">
          {requestFailed
            ? "Something went wrong"
            : isSyncing
              ? "Syncing..."
              : "Done!"}
        </h2>

        {requestFailed && (
          <div className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-left text-sm text-red-100">
            <div className="font-medium text-red-200">
              Cancel request failed
            </div>
            <p className="mt-1 text-red-100/90">{requestFailedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
