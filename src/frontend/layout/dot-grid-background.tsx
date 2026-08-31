"use client";

import { useRef } from "react";

import { useDotGrid } from "@/frontend/hooks/use-dot-grid";

export function DotGridBackground() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useDotGrid({ canvasRef, heroRef });

  return (
    <div ref={heroRef} aria-hidden="true" className="dot-grid">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.16),transparent_38%),radial-gradient(circle_at_88%_84%,rgba(123,92,245,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,29,46,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(15,29,46,0.22)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
      <canvas
        id="dot-canvas"
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
