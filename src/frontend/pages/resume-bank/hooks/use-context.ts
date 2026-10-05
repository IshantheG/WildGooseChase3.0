"use client";
import { useEffect, useState } from "react";
import { type AIContextResponse } from "@/frontend/types/types";
const API = "http://localhost:5000/api/master-resume";
const ID = "singleton";

export function useResumeContext() {
  const [data, setData] = useState<AIContextResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API}/save/${ID}`);
        if (!response.ok) {
          throw new Error(`Load failed (${response.status}).`);
        }
        setData(await response.json());
      } catch (error) {
        setError(error instanceof Error ? error.message : "Load failed.");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);
  return { data, isLoading, error };
}
export function useSaveResumeBank() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  async function save(text: string) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${API}/save/${ID}/resume-bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(`Save failed (${response.status}).`);
      }
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsLoading(false);
    }
  }
  return { save, isLoading, error, success };
}
export function useSaveAIPrompt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  async function save(text: string) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${API}/save/${ID}/ai-prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(`Save failed (${response.status}).`);
      }
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsLoading(false);
    }
  }
  return { save, isLoading, error, success };
}
