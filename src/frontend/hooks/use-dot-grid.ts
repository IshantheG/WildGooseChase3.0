"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type Dot = {
  x: number;
  y: number;
  ox: number;
  oy: number;
};

type UseDotGridOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
};

export function useDotGrid({ canvasRef, heroRef }: UseDotGridOptions) {
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;

    if (!hero || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const DOT_SPACING = 30;
    const MAX_DIST = 140;
    const mouse = { x: -9999, y: -9999 };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const buildDots = () => {
      dots = [];
      const cols = Math.floor(width / DOT_SPACING) + 2;
      const rows = Math.floor(height / DOT_SPACING) + 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = col * DOT_SPACING;
          const y = row * DOT_SPACING;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const resize = () => {
      width = canvas.width = hero.clientWidth;
      height = canvas.height = hero.clientHeight;
      buildDots();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (insideX && insideY) {
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      for (const dot of dots) {
        const dx = mouse.x - dot.ox;
        const dy = mouse.y - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.ox;
        let targetY = dot.oy;
        let alpha = 0.01;
        let radius = 0.9;

        if (dist < MAX_DIST) {
          const force = 1 - dist / MAX_DIST;
          const angle = Math.atan2(dy, dx);
          const push = force * 28;
          targetX = dot.ox - Math.cos(angle) * push;
          targetY = dot.oy - Math.sin(angle) * push;
          alpha = 0.08 + force * 0.75;
          radius = 0.9 + force * 2.8;
          const hue = force > 0.6 ? 180 : force > 0.3 ? 165 : 200;
          ctx.fillStyle = `hsla(${hue}, 100%, 66%, ${alpha})`;
        } else {
          const wave =
            Math.sin(dot.ox * 0.05 + time) * Math.cos(dot.oy * 0.05 + time * 0.7);
          alpha = Math.max(0, 0.01 + wave * 0.01);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        }

        dot.x = lerp(dot.x, targetX, 0.12);
        dot.y = lerp(dot.y, targetY, 0.12);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [canvasRef, heroRef]);
}
