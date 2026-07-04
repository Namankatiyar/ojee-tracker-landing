"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import { useTheme } from "next-themes";

const lightColors = {
  cellFill: "rgba(0, 102, 204, 0.10)",
  cellStroke: "rgba(0, 102, 204, 0.40)",
  cellShadow: "rgba(0, 102, 204, 0.65)",
  gridLine: "rgba(0, 0, 0, 0.06)",
  spotlightStroke0: "rgba(0, 102, 204, 0.35)",
  spotlightStroke1: "rgba(0, 102, 204, 0.12)",
  spotlightStroke2: "rgba(0, 102, 204, 0)",
  glow0: "rgba(0, 102, 204, 0.07)",
  glow1: "rgba(0, 102, 204, 0.02)",
  glow2: "rgba(255, 255, 255, 0)",
};

const darkColors = {
  cellFill: "rgba(0, 127, 255, 0.08)",
  cellStroke: "rgba(0, 127, 255, 0.35)",
  cellShadow: "rgba(0, 127, 255, 0.6)",
  gridLine: "rgba(255, 255, 255, 0.02)",
  spotlightStroke0: "rgba(0, 127, 255, 0.25)",
  spotlightStroke1: "rgba(0, 127, 255, 0.08)",
  spotlightStroke2: "rgba(0, 127, 255, 0)",
  glow0: "rgba(0, 127, 255, 0.05)",
  glow1: "rgba(0, 127, 255, 0.01)",
  glow2: "rgba(0, 0, 0, 0)",
};

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const activeCellRef = useRef<{ col: number; row: number; key: string } | null>(null);
  const glowCellsRef = useRef<Map<string, { col: number; row: number; opacity: number }>>(new Map());
  const cellSize = 56;
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
        const key = `${col},${row}`;

        if (!activeCellRef.current || activeCellRef.current.key !== key) {
          if (activeCellRef.current) {
            glowCellsRef.current.set(activeCellRef.current.key, {
              col: activeCellRef.current.col,
              row: activeCellRef.current.row,
              opacity: 1.0,
            });
          }
          activeCellRef.current = { col, row, key };
        }
      } else {
        if (activeCellRef.current) {
          glowCellsRef.current.set(activeCellRef.current.key, {
            col: activeCellRef.current.col,
            row: activeCellRef.current.row,
            opacity: 1.0,
          });
          activeCellRef.current = null;
        }
      }
    }

    function handleMouseLeave() {
      if (activeCellRef.current) {
        glowCellsRef.current.set(activeCellRef.current.key, {
          col: activeCellRef.current.col,
          row: activeCellRef.current.row,
          opacity: 1.0,
        });
        activeCellRef.current = null;
      }
    }

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    if (clientWidth === 0 || clientHeight === 0) return;

    if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = Math.max(0, time - lastTimeRef.current);
    lastTimeRef.current = time;

    const width = clientWidth;
    const height = clientHeight;
    const colors = resolvedTheme === "light" ? lightColors : darkColors;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = 0;

    const drawCell = (col: number, row: number, opacity: number) => {
      ctx.fillStyle = colors.cellFill.replace(/[\d.]+\)$/, `${parseFloat(colors.cellFill.match(/[\d.]+\)$/)?.[0] || "0.08") * opacity})`);
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      ctx.save();
      ctx.strokeStyle = colors.cellStroke.replace(/[\d.]+\)$/, `${parseFloat(colors.cellStroke.match(/[\d.]+\)$/)?.[0] || "0.35") * opacity})`);
      ctx.lineWidth = 1.5;
      ctx.shadowColor = colors.cellShadow.replace(/[\d.]+\)$/, `${parseFloat(colors.cellShadow.match(/[\d.]+\)$/)?.[0] || "0.6") * opacity})`);
      ctx.shadowBlur = 8;
      ctx.strokeRect(
        col * cellSize + 0.5,
        row * cellSize + 0.5,
        cellSize - 1,
        cellSize - 1
      );
      ctx.restore();
    };

    if (activeCellRef.current) {
      drawCell(activeCellRef.current.col, activeCellRef.current.row, 1.0);
    }

    glowCellsRef.current.forEach((cell, key) => {
      if (activeCellRef.current && activeCellRef.current.key === key) {
        glowCellsRef.current.delete(key);
        return;
      }
      drawCell(cell.col, cell.row, cell.opacity);
      cell.opacity -= deltaTime * 0.0012;
      if (cell.opacity <= 0 || isNaN(cell.opacity)) {
        glowCellsRef.current.delete(key);
      }
    });

    ctx.beginPath();
    for (let x = 0; x <= width; x += cellSize) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += cellSize) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.strokeStyle = colors.gridLine;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.save();
    const spotlightRadius = 380;
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius);
    grad.addColorStop(0, colors.spotlightStroke0);
    grad.addColorStop(0.5, colors.spotlightStroke1);
    grad.addColorStop(1, colors.spotlightStroke2);

    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += cellSize) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += cellSize) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.stroke();
    ctx.restore();

    const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius * 1.5);
    glowGrad.addColorStop(0, colors.glow0);
    glowGrad.addColorStop(0.5, colors.glow1);
    glowGrad.addColorStop(1, colors.glow2);

    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);
  });

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-background"
    >
      <canvas ref={canvasRef} id="interactive-grid-canvas" className="block w-full h-full pointer-events-none" />
    </div>
  );
}
