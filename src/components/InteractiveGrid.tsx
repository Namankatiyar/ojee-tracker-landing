"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface ColorPalette {
  cellFill: (alpha: number) => string;
  cellStroke: (alpha: number) => string;
  cellShadow: (alpha: number) => string;
  gridLine: string;
  spotlightStroke0: string;
  spotlightStroke1: string;
  spotlightStroke2: string;
  glow0: string;
  glow1: string;
  glow2: string;
}

const lightColors: ColorPalette = {
  cellFill: (a: number) => `rgba(0, 102, 204, ${0.1 * a})`,
  cellStroke: (a: number) => `rgba(0, 102, 204, ${0.4 * a})`,
  cellShadow: (a: number) => `rgba(0, 102, 204, ${0.65 * a})`,
  gridLine: "rgba(0, 0, 0, 0.06)",
  spotlightStroke0: "rgba(0, 102, 204, 0.35)",
  spotlightStroke1: "rgba(0, 102, 204, 0.12)",
  spotlightStroke2: "rgba(0, 102, 204, 0)",
  glow0: "rgba(0, 102, 204, 0.07)",
  glow1: "rgba(0, 102, 204, 0.02)",
  glow2: "rgba(255, 255, 255, 0)",
};

const darkColors: ColorPalette = {
  cellFill: (a: number) => `rgba(0, 127, 255, ${0.08 * a})`,
  cellStroke: (a: number) => `rgba(0, 127, 255, ${0.35 * a})`,
  cellShadow: (a: number) => `rgba(0, 127, 255, ${0.6 * a})`,
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
  const isLoopRunningRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);
  const cachedRectRef = useRef<{ left: number; top: number; right: number; bottom: number; width: number; height: number } | null>(null);

  const drawFrame = useCallback((deltaTime: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = resolvedTheme === "light" ? lightColors : darkColors;

    ctx.clearRect(0, 0, width, height);

    const drawCell = (col: number, row: number, opacity: number) => {
      const clampedOpacity = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = colors.cellFill(clampedOpacity);
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      ctx.save();
      ctx.strokeStyle = colors.cellStroke(clampedOpacity);
      ctx.lineWidth = 1.5;
      ctx.shadowColor = colors.cellShadow(clampedOpacity);
      ctx.shadowBlur = 8;
      ctx.strokeRect(
        col * cellSize + 0.5,
        row * cellSize + 0.5,
        cellSize - 1,
        cellSize - 1
      );
      ctx.restore();
    };

    // Draw active cell
    if (activeCellRef.current) {
      drawCell(activeCellRef.current.col, activeCellRef.current.row, 1.0);
    }

    // Draw & decay fading glow cells
    glowCellsRef.current.forEach((cell, key) => {
      if (activeCellRef.current && activeCellRef.current.key === key) {
        glowCellsRef.current.delete(key);
        return;
      }
      drawCell(cell.col, cell.row, cell.opacity);
      if (deltaTime > 0) {
        cell.opacity -= deltaTime * 0.0012;
        if (cell.opacity <= 0 || isNaN(cell.opacity)) {
          glowCellsRef.current.delete(key);
        }
      }
    });

    // Draw regular grid lines
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

    // Spotlight gradient on grid lines
    const centerX = width / 2;
    const centerY = 0;
    const spotlightRadius = 380;
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius);
    grad.addColorStop(0, colors.spotlightStroke0);
    grad.addColorStop(0.5, colors.spotlightStroke1);
    grad.addColorStop(1, colors.spotlightStroke2);

    ctx.save();
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

    // Ambient radial glow fill
    const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, spotlightRadius * 1.5);
    glowGrad.addColorStop(0, colors.glow0);
    glowGrad.addColorStop(0.5, colors.glow1);
    glowGrad.addColorStop(1, colors.glow2);

    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, width, height);
  }, [resolvedTheme]);

  const updateRect = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollX = typeof window !== "undefined" ? window.scrollX : 0;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const left = rect.left + scrollX;
    const top = rect.top + scrollY;
    cachedRectRef.current = {
      left,
      top,
      right: left + rect.width,
      bottom: top + rect.height,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  const startLoop = useCallback(() => {
    if (isLoopRunningRef.current || !isVisibleRef.current) return;
    if (glowCellsRef.current.size === 0) return;

    isLoopRunningRef.current = true;
    lastTimeRef.current = null;

    const tick = (time: number) => {
      if (!isVisibleRef.current) {
        isLoopRunningRef.current = false;
        lastTimeRef.current = null;
        rafIdRef.current = null;
        return;
      }

      const deltaTime = lastTimeRef.current !== null ? Math.min(64, Math.max(0, time - lastTimeRef.current)) : 16;
      lastTimeRef.current = time;

      drawFrame(deltaTime);

      // Event-driven: RAF loop ONLY ticks while glow cells are actively decaying
      if (glowCellsRef.current.size > 0) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Render one final clean base state and sleep
        drawFrame(0);
        isLoopRunningRef.current = false;
        lastTimeRef.current = null;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // Initial draw and theme/resize sync
  useEffect(() => {
    drawFrame(0);
  }, [drawFrame]);

  // Observer setups (IntersectionObserver & ResizeObserver)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateRect();

    // IntersectionObserver to pause rendering when offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry?.isIntersecting ?? false;
        isVisibleRef.current = visible;
        if (visible) {
          updateRect();
          drawFrame(0);
          if (glowCellsRef.current.size > 0) {
            startLoop();
          }
        } else {
          if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
          isLoopRunningRef.current = false;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // ResizeObserver to cache document position and resize canvas without layout thrashing
    const resizeObserver = new ResizeObserver(() => {
      updateRect();
      drawFrame(0);
    });
    resizeObserver.observe(container);

    const handleResize = () => {
      updateRect();
      drawFrame(0);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [drawFrame, startLoop, updateRect]);

  // Pointer event listeners (Event-driven canvas rendering with touch/mobile fallback)
  useEffect(() => {
    // Touch/mobile detection: fallback to static base grid, no interactive pointer loop
    const isTouchOnly =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isTouchOnly) {
      return; // Do not attach pointer listeners on pure touch/mobile devices
    }

    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      if (!isVisibleRef.current) return;
      const rect = cachedRectRef.current;
      if (!rect) return;

      const docX = e.pageX;
      const docY = e.pageY;

      const isInside =
        docX >= rect.left &&
        docX <= rect.right &&
        docY >= rect.top &&
        docY <= rect.bottom;

      if (isInside) {
        const x = docX - rect.left;
        const y = docY - rect.top;
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
          drawFrame(0);
          if (glowCellsRef.current.size > 0) {
            startLoop();
          }
        }
      } else {
        if (activeCellRef.current) {
          glowCellsRef.current.set(activeCellRef.current.key, {
            col: activeCellRef.current.col,
            row: activeCellRef.current.row,
            opacity: 1.0,
          });
          activeCellRef.current = null;
          drawFrame(0);
          startLoop();
        }
      }
    }

    function handlePointerLeave(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      if (activeCellRef.current) {
        glowCellsRef.current.set(activeCellRef.current.key, {
          col: activeCellRef.current.col,
          row: activeCellRef.current.row,
          opacity: 1.0,
        });
        activeCellRef.current = null;
        drawFrame(0);
        startLoop();
      }
    }

    document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.body.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [drawFrame, startLoop]);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-background"
    >
      <canvas
        ref={canvasRef}
        id="interactive-grid-canvas"
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
