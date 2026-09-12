import { useState } from "react";

const API_URL = "http://localhost:5000/api";

export function useSyncJobsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const startResponse = await fetch(
        `${API_URL}/scraper/start`,
        {
          method: "POST",
        }
      );

      if (!startResponse.ok) {
        const data = await startResponse.json().catch(() => null);

        throw new Error(
          data?.message || "Failed to start scraper."
        );
      }

      while (true) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

        const statusResponse = await fetch(
          `${API_URL}/scraper/status`
        );

        if (!statusResponse.ok) {
          throw new Error("Failed to check scraper status.");
        }

        const status = await statusResponse.json();

        if (!status.running) {
          break;
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sync jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    syncJobs,
    loading,
    error,
  };
}