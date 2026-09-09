"use client";

import { useEffect, useRef, useState } from "react";

const COMPILE_URL = "http://localhost:5000/api/resume/compile";
const DEBOUNCE_MS = 700;

export function useResumePdf(dslText: string) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const currentPdfUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!dslText?.trim()) {
      setIsCompiling(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      console.log("Starting compile...");
      setIsCompiling(true);
      setError(null);

      try {
        console.log("Fetching:", COMPILE_URL);

        const res = await fetch(COMPILE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dslText }),
          signal: controller.signal,
        });

        console.log("Fetch completed:", res.status);

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));

          console.log("Compile failed:", body);

          setError(
            body.detail || body.error || `Compile failed (${res.status}).`,
          );

          return;
        }

        console.log("Reading PDF blob...");

        const blob = await res.blob();

        console.log("PDF received:", blob.size, "bytes");

        const newUrl = URL.createObjectURL(blob);

        if (currentPdfUrlRef.current) {
          URL.revokeObjectURL(currentPdfUrlRef.current);
        }

        currentPdfUrlRef.current = newUrl;
        setPdfUrl(newUrl);
        setError(null);
      } catch (err) {
        console.error("Compile request error:", err);

        if (err instanceof Error && err.name !== "AbortError") {
          setError("Could not reach the compile server.");
        }
      } finally {
        console.log("Compile finished");

        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsCompiling(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dslText]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();

      if (currentPdfUrlRef.current) {
        URL.revokeObjectURL(currentPdfUrlRef.current);
      }
    };
  }, []);

  return {
    pdfUrl,
    isCompiling,
    error,
  };
}
