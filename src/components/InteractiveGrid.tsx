"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the single active cell under the cursor
  const activeCellRef = useRef<{ col: number; row: number; key: string } | null>(null);
  
  // Track decaying cell trails
  const glowCellsRef = useRef<Map<string, { col: number; row: number; opacity: number }>>(new Map());
  const cellSize = 56;

  // Use ref to track the last animation time to compute precise delta time
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

        // If cursor moves to a new cell
        if (!activeCellRef.current || activeCellRef.current.key !== key) {
          // Decay the previous active cell
          if (activeCellRef.current) {
            glowCellsRef.current.set(activeCellRef.current.key, {
              col: activeCellRef.current.col,
              row: activeCellRef.current.row,
              opacity: 1.0,
            });
          }
          // Set new active cell
          activeCellRef.current = { col, row, key };
        }
      } else {
        // Decay the active cell if cursor leaves the grid bounding box
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
      // Decay the active cell if cursor leaves the document window
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

  // Use Framer Motion's requestAnimationFrame wrapper
  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    if (clientWidth === 0 || clientHeight === 0) return;

    // Auto-resize canvas buffer if client dimensions changed
    if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Initialize or compute deltaTime securely
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = Math.max(0, time - lastTimeRef.current);
    lastTimeRef.current = time;

    const width = clientWidth;
    const height = clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Static spotlight coordinates centered at the top touching the header
    const centerX = width / 2;
    const centerY = 0;

    // Helper function to draw a cell (fill + border glow)
    const drawCell = (col: number, row: number, opacity: number) => {
      ctx.fillStyle = `rgba(0, 127, 255, ${0.08 * opacity})`;
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      ctx.save();
      ctx.strokeStyle = `rgba(0, 127, 255, ${0.35 * opacity})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = `rgba(0, 127, 255, ${0.6 * opacity})`;
      ctx.shadowBlur = 8;
      ctx.strokeRect(
        col * cellSize + 0.5,
        row * cellSize + 0.5,
        cellSize - 1,
        cellSize - 1
      );
      ctx.restore();
    };

    // 1. Draw the active cell (always at 1.0 opacity while hovered)
    if (activeCellRef.current) {
      drawCell(activeCellRef.current.col, activeCellRef.current.row, 1.0);
    }

    // 2. Draw Cell Trails (decaying glows)
    glowCellsRef.current.forEach((cell, key) => {
      // If the decaying cell becomes active again, skip and delete it from trails
      if (activeCellRef.current && activeCellRef.current.key === key) {
        glowCellsRef.current.delete(key);
        return;
      }

      drawCell(cell.col, cell.row, cell.opacity);

      cell.opacity -= deltaTime * 0.0012; // Fade out over ~0.8s
      if (cell.opacity <= 0 || isNaN(cell.opacity)) {
        glowCellsRef.current.delete(key);
      }
    });

    // 3. Draw Spotlight Grid Lines (Static centered at top)
    ctx.beginPath();
    for (let x = 0; x <= width; x += cellSize) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }
    for (let y = 0; y <= height; y += cellSize) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw active spotlight gradient on grid lines
    ctx.save();
    const spotlightRadius = 380; // Large, beautiful header ambient glow
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius);
    grad.addColorStop(0, "rgba(0, 127, 255, 0.25)");
    grad.addColorStop(0.5, "rgba(0, 127, 255, 0.08)");
    grad.addColorStop(1, "rgba(0, 127, 255, 0)");

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

    // 4. Spotlight Background Glow (Tech Azure, Static centered at top)
    const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius * 1.5);
    glowGrad.addColorStop(0, "rgba(0, 127, 255, 0.05)");
    glowGrad.addColorStop(0.5, "rgba(0, 127, 255, 0.01)");
    glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);
  });

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-black"
    >
      <canvas ref={canvasRef} id="interactive-grid-canvas" className="block w-full h-full pointer-events-none" />
    </div>
  );
}
