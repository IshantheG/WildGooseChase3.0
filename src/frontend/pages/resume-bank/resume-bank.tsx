"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import {
  useResumeContext,
  useSaveAIPrompt,
  useSaveResumeBank,
} from "./hooks/use-context.ts";

export function ResumeBank() {
  const [resumeBank, setResumeBank] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const { data, isLoading, error } = useResumeContext();
  const resumeBankSave = useSaveResumeBank();
  const aiPromptSave = useSaveAIPrompt();

  useEffect(() => {
    if (!data) {
      return;
    }

    setResumeBank(data.resumeBank ?? "");
    setAiPrompt(data.aiPrompt ?? "");
  }, [data]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (resumeBankSave.success) {
      setToast("Resume bank saved.");
    }
  }, [resumeBankSave.success]);

  useEffect(() => {
    if (aiPromptSave.success) {
      setToast("AI context saved.");
    }
  }, [aiPromptSave.success]);

  async function handleSaveResumeBank() {
    await resumeBankSave.save(resumeBank);
  }

  async function handleSaveAIPrompt() {
    await aiPromptSave.save(aiPrompt);
  }

  return (
    <div className="min-h-screen bg-[#03060a] pt-[54px] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-cyan-300">
              Master Resume Context
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Resume Bank</h1>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
            {error}
          </div>
        )}

        {(resumeBankSave.error || aiPromptSave.error) && !error && (
          <div className="rounded-md border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
            {resumeBankSave.error || aiPromptSave.error}
          </div>
        )}

        {toast && (
          <div className="rounded-md border border-cyan-400/60 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-50">
            {toast}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2 z-10">
          <section className="rounded-xl border border-white/10 bg-[rgba(8,13,20,0.96)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-cyan-300">
                  Resume Bank
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveResumeBank}
                disabled={resumeBankSave.isLoading}
                className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 px-3 py-2 text-xs font-medium text-cyan-50 transition-colors hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resumeBankSave.isLoading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                Save Resume Bank
              </button>
            </div>

            <textarea
              value={resumeBank}
              onChange={(e) => setResumeBank(e.target.value)}
              disabled={isLoading}
              className="mt-4 h-[60vh] w-full rounded-lg border border-white/10 bg-[rgb(20,23,44)] p-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50"
              placeholder="Capture reference resumes, notes, or anything you want the AI to use here."
            />
          </section>

          <section className="rounded-xl border border-white/10 bg-[rgba(8,13,20,0.96)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-cyan-300">
                  AI Context
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveAIPrompt}
                disabled={aiPromptSave.isLoading}
                className="inline-flex items-center gap-2 rounded-md border border-cyan-400/40 px-3 py-2 text-xs font-medium text-cyan-50 transition-colors hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {aiPromptSave.isLoading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
                Save AI Context
              </button>
            </div>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isLoading}
              className="mt-4 h-[60vh] w-full rounded-lg border border-white/10 bg-[rgb(20,23,44)] p-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50"
              placeholder="Write the prompt instructions or context you want the AI to use."
            />
          </section>
        </div>
      </div>
    </div>
  );
}
