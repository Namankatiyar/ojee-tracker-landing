"use client";

import React, { useState, useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";
import type { ChartConfiguration, TooltipItem } from "chart.js";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const pressTransition = { type: "spring" as const, stiffness: 520, damping: 32 };

type SubjectKey = "physics" | "chemistry" | "maths";
type PlannerTask = { id: number; text: string; done: boolean; subject?: SubjectKey };
type LedgerEntry = { name: string; score: string; max: string; date: string; subject?: SubjectKey };

const subjectThemes: Record<SubjectKey, { label: string; color: string; hex: string; soft: string; border: string }> = {
  physics: {
    label: "Physics",
    color: "var(--color-physics)",
    hex: "#6366f1",
    soft: "rgba(99, 102, 241, 0.14)",
    border: "rgba(99, 102, 241, 0.36)",
  },
  chemistry: {
    label: "Chemistry",
    color: "var(--color-chemistry)",
    hex: "#10b981",
    soft: "rgba(16, 185, 129, 0.14)",
    border: "rgba(16, 185, 129, 0.36)",
  },
  maths: {
    label: "Mathematics",
    color: "var(--color-maths)",
    hex: "#f59e0b",
    soft: "rgba(245, 158, 11, 0.16)",
    border: "rgba(245, 158, 11, 0.36)",
  },
};

const syllabusNodes = ["NCERT", "PYQs", "Modules", "Mock Tests"];
const initialSyllabusItems = [
  { subject: "physics" as const, topic: "Rotational Mechanics", sub: "Moment of Inertia, Angular Momentum", done: [true, false, false, true] },
  { subject: "maths" as const, topic: "Matrices & Determinants", sub: "Cramer's Rule, Adjoint properties", done: [true, true, false, false] },
  { subject: "chemistry" as const, topic: "Organic Chemistry GOC", sub: "Inductive & Resonance Effects", done: [true, true, true, false] }
];

type ReportMetric = "hours" | "weekly";
type ReportChart = {
  type: "line" | "bar";
  labels: string[];
  datasets: ChartConfiguration<"line" | "bar", number[], string>["data"]["datasets"];
  max: number;
  stacked: boolean;
};

function BentoCard({
  children,
  className,
  index,
  reduceMotion,
}: {
  children: React.ReactNode;
  className: string;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.55, delay: reduceMotion ? 0 : index * 0.055, ease: easeOutExpo }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01, borderColor: "rgba(0, 127, 255, 0.38)" }}
      className={`${className} overflow-hidden`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure/70 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={reduceMotion ? undefined : { x: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
      />
      {children}
    </motion.div>
  );
}

export default function BentoGrid() {
  // Cockpit States
  const reduceMotion = useReducedMotion() ?? false;
  const [clockMode, setClockMode] = useState<"pomo" | "stopwatch" | "custom">("pomo");
  const [clockTime, setClockTime] = useState("25:00");
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [syllabusItems, setSyllabusItems] = useState(initialSyllabusItems);
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([
    { id: 1, subject: "maths" as const, text: "Solve 15 Maths Matrices PYQs", done: true },
    { id: 2, subject: "physics" as const, text: "Read Electrostatics NCERT Capacitor theory", done: false },
    { id: 3, subject: "chemistry" as const, text: "Attempt Chemistry Mock Test 3", done: false }
  ]);
  const [plannerInput, setPlannerInput] = useState("");
  const [mockLedger, setMockLedger] = useState<LedgerEntry[]>([
    { subject: "physics" as const, name: "JEE Advanced Mock 8", score: "198", max: "300", date: "June 25" },
    { subject: "chemistry" as const, name: "JEE Main Mock 14", score: "254", max: "300", date: "June 20" }
  ]);
  const [mockInputName, setMockInputName] = useState("");
  const [mockInputScore, setMockInputScore] = useState("");
  const [aiChat, setAiChat] = useState([
    { sender: "agent", text: "Rotational dynamics physics score logged (42%). Torque and rolling mechanics require review." }
  ]);
  const [aiInput, setAiInput] = useState("");

  // Daily Reports State
  const [reportMetric, setReportMetric] = useState<ReportMetric>("hours");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const toggleSyllabusNode = (itemIndex: number, nodeIndex: number) => {
    setSyllabusItems((prev) =>
      prev.map((item, idx) =>
        idx === itemIndex
          ? { ...item, done: item.done.map((done, nIdx) => (nIdx === nodeIndex ? !done : done)) }
          : item
      )
    );
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.28)");
    gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.16)");
    gradient.addColorStop(1, "rgba(245, 158, 11, 0.0)");

    const dataMap: Record<ReportMetric, ReportChart> = {
      hours: {
        type: "line",
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Study Hours",
            data: [8.5, 9.2, 6.0, 7.8, 10.5, 12.0, 8.4],
            borderColor: "#6366f1",
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            tension: 0.25,
            pointBackgroundColor: "#000000",
            pointBorderColor: "#6366f1",
            pointBorderWidth: 1.5,
            pointRadius: 3.5,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#6366f1",
            pointHoverBorderColor: "#ffffff",
          }
        ],
        max: 14,
        stacked: false
      },
      weekly: {
        type: "bar",
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Physics",
            data: [3.5, 4.0, 2.5, 3.0, 4.5, 5.0, 3.4],
            backgroundColor: "#6366f1",
            borderRadius: 2
          },
          {
            label: "Chemistry",
            data: [2.5, 3.2, 2.0, 2.8, 3.5, 4.0, 3.0],
            backgroundColor: "#10b981",
            borderRadius: 2
          },
          {
            label: "Maths",
            data: [2.5, 2.0, 1.5, 2.0, 2.5, 3.0, 2.0],
            backgroundColor: "#f59e0b",
            borderRadius: 2
          }
        ],
        max: 14,
        stacked: true
      }
    };

    const currentData = dataMap[reportMetric];

    chartInstanceRef.current = new ChartJS(ctx, {
      type: currentData.type,
      data: {
        labels: currentData.labels,
        datasets: currentData.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            right: 10,
            left: 0,
            bottom: 0
          }
        },
        scales: {
          x: {
            stacked: currentData.stacked,
            grid: {
              display: false
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.4)",
              font: {
                family: "monospace",
                size: 9
              }
            },
            border: {
              color: "rgba(255, 255, 255, 0.1)"
            }
          },
          y: {
            stacked: currentData.stacked,
            min: 0,
            max: currentData.max,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.4)",
              font: {
                family: "monospace",
                size: 9
              },
              callback: (val: string | number) => `${val}h`
            },
            border: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: currentData.stacked,
            position: "top",
            align: "end",
            labels: {
              color: "rgba(255, 255, 255, 0.6)",
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              font: {
                family: "monospace",
                size: 9
              }
            }
          },
          tooltip: {
            backgroundColor: "#000000",
            titleColor: "rgba(255, 255, 255, 0.6)",
            bodyColor: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.15)",
            borderWidth: 1,
            padding: 8,
            displayColors: currentData.stacked,
            callbacks: {
              label: (context: TooltipItem<"line" | "bar">) => `${context.dataset.label}: ${context.parsed.y}h`
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [reportMetric]);

  // Study clock countdown / stopwatch interval logic
  useEffect(() => {
    if (!isClockRunning) return;

    const interval = setInterval(() => {
      setClockTime((prev) => {
        if (clockMode === "stopwatch") {
          const parts = prev.split(":").map(Number);
          let hrs = parts.length === 3 ? parts[0] : 0;
          let mins = parts.length === 3 ? parts[1] : parts[0];
          let secs = parts.length === 3 ? parts[2] : parts[1];

          secs++;
          if (secs >= 60) {
            secs = 0;
            mins++;
            if (mins >= 60) {
              mins = 0;
              hrs++;
            }
          }

          const hStr = hrs > 0 ? `${hrs.toString().padStart(2, "0")}:` : "";
          return `${hStr}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        } else {
          const parts = prev.split(":").map(Number);
          let mins = parts[0];
          let secs = parts[1];

          if (mins === 0 && secs === 0) {
            setIsClockRunning(false);
            return prev;
          }

          secs--;
          if (secs < 0) {
            secs = 59;
            mins--;
          }

          return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isClockRunning, clockMode]);

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"} transition={{ ease: easeOutExpo }}>
      <motion.div
        className="relative cockpit-container"
        initial={reduceMotion ? false : { opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
        {/* Syllabus Tracker */}
        <BentoCard index={0} reduceMotion={reduceMotion} className="md:col-span-8 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Granular Syllabus Matrix</span>
              <h3 className="text-xl font-bold tracking-tight mt-1 text-white">Syllabus Tracker</h3>
            </div>
          </div>

          <div className="flex flex-col gap-3 my-4">
            {syllabusItems.map((item, idx) => {
              const theme = subjectThemes[item.subject];

              return (
                <motion.div
                  key={item.topic}
                  layout
                  whileHover={reduceMotion ? undefined : { x: 4, backgroundColor: theme.soft }}
                  transition={pressTransition}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-3 rounded border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors gap-3"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider font-mono font-semibold" style={{ color: theme.color }}>
                        {theme.label}
                      </span>
                      <span className="text-xs font-semibold text-white">{item.topic}</span>
                    </div>
                    <span className="text-[10px] text-white/50 mt-0.5">{item.sub}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {syllabusNodes.map((node, nIdx) => (
                      <motion.button
                        key={nIdx}
                        type="button"
                        layout
                        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => toggleSyllabusNode(idx, nIdx)}
                        transition={pressTransition}
                        style={
                          item.done[nIdx]
                            ? { backgroundColor: theme.soft, borderColor: theme.color, color: theme.color }
                            : { borderColor: theme.border, color: "rgba(255,255,255,0.42)" }
                        }
                        className="px-2.5 py-1 text-[9px] font-semibold border transition-all rounded-full uppercase tracking-wider"
                      >
                        <AnimatePresence initial={false} mode="popLayout">
                          {item.done[nIdx] && (
                            <motion.span
                              key="spark"
                              aria-hidden="true"
                              initial={{ scale: 0, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="mr-1 inline-block"
                            >
                              ✓
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {node}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-white/5">
            <span>Track daily syllabus milestones.</span>
            <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.96 }} className="text-azure hover:underline font-semibold flex items-center gap-1">
              + Add Custom Topic
            </motion.button>
          </div>
        </BentoCard>

        {/* Study Clock Engine */}
        <BentoCard index={1} reduceMotion={reduceMotion} className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Study Clock Engine</span>
            <span className="flex h-2 w-2 relative">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-azure-dynamic"
                animate={isClockRunning && !reduceMotion ? { scale: [1, 2.4], opacity: [0.7, 0] } : { scale: 1, opacity: 0.25 }}
                transition={{ duration: 1.2, repeat: isClockRunning ? Infinity : 0, ease: easeOutExpo }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-azure-dynamic"></span>
            </span>
          </div>

          <div className="flex flex-col items-center py-2">
            <div className="flex rounded bg-white/5 p-0.5 text-[10px] font-semibold border border-white/10 mb-4 z-10">
              {(["pomo", "stopwatch", "custom"] as const).map((mode) => (
                <motion.button
                  key={mode} 
                  onClick={() => {
                    setClockMode(mode);
                    setClockTime(mode === "pomo" ? "25:00" : mode === "stopwatch" ? "00:00:00" : "45:00");
                  }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-3 py-1 rounded capitalize cursor-pointer ${clockMode === mode ? "text-white" : "text-white/60"}`}
                >
                  {clockMode === mode && (
                    <motion.span layoutId="clock-mode-pill" className="absolute inset-0 rounded bg-azure-dynamic" transition={pressTransition} />
                  )}
                  <span className="relative z-10">{mode}</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={clockTime}
              initial={reduceMotion ? { opacity: 0.7 } : { opacity: 0, y: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="text-4xl font-mono font-bold tracking-tight text-white mb-2"
            >
              {clockTime}
            </motion.div>
            <motion.span
              animate={{ color: isClockRunning ? "rgba(0,127,255,0.9)" : "rgba(255,255,255,0.4)" }}
              className="text-[10px] uppercase tracking-widest"
            >
              {isClockRunning ? "Focus Session Active" : "Paused"}
            </motion.span>
          </div>

          <div className="flex gap-2 w-full z-10">
            <motion.button
              onClick={() => setIsClockRunning(!isClockRunning)}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-9 rounded bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer"
            >
              {isClockRunning ? "Pause" : "Start"}
            </motion.button>
            <motion.button
              onClick={() => {
                setIsClockRunning(false);
                setClockTime(clockMode === "pomo" ? "25:00" : clockMode === "stopwatch" ? "00:00:00" : "45:00");
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.03, borderColor: "rgba(255,255,255,0.28)" }}
              whileTap={{ scale: 0.95 }}
              className="px-3 h-9 rounded border border-white/10 text-xs text-white/60 hover:text-white transition-all cursor-pointer"
            >
              Reset
            </motion.button>
          </div>
        </BentoCard>

        {/* Frictionless Weekly Planner */}
        <BentoCard index={2} reduceMotion={reduceMotion} className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Frictionless Planner</span>
            <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Weekly Study Tasks</h3>
          </div>

          <div className="flex flex-col gap-2 my-3 max-h-[110px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {plannerTasks.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.98 }}
                className="flex items-center gap-2 text-xs"
              >
                <input 
                  type="checkbox" 
                  checked={t.done} 
                  onChange={() => setPlannerTasks(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item))}
                  className="rounded border-white/20 bg-black text-azure-dynamic focus:ring-0 w-3.5 h-3.5"
                />
                <div className="flex min-w-0 items-center gap-2">
                  {t.subject && (
                    <span
                      className="shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        color: subjectThemes[t.subject].color,
                        borderColor: subjectThemes[t.subject].border,
                        backgroundColor: subjectThemes[t.subject].soft,
                      }}
                    >
                      {subjectThemes[t.subject].label}
                    </span>
                  )}
                  <motion.span
                    animate={{ opacity: t.done ? 0.45 : 0.85, x: t.done && !reduceMotion ? 3 : 0 }}
                    className={t.done ? "min-w-0 truncate line-through text-white/40" : "min-w-0 truncate text-white/80"}
                  >
                    {t.text}
                  </motion.span>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!plannerInput.trim()) return;
              setPlannerTasks(prev => [...prev, { id: Date.now(), text: plannerInput, done: false }]);
              setPlannerInput("");
            }}
            className="flex gap-2 border border-white/10 rounded px-2.5 py-1.5 bg-black/40 z-10"
          >
            <input 
              type="text" 
              value={plannerInput}
              onChange={(e) => setPlannerInput(e.target.value)}
              placeholder="> Add task to weekly planner..." 
              className="bg-transparent border-0 outline-none p-0 text-xs text-white placeholder-white/30 flex-1 ring-0 focus:ring-0"
            />
            <motion.button type="submit" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} className="text-[10px] font-bold text-azure-dynamic uppercase tracking-wider hover:text-white">Add</motion.button>
          </form>
        </BentoCard>

        {/* Mock Score Log */}
        <BentoCard index={3} reduceMotion={reduceMotion} className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Mock Test Scores</span>
            <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Scores Ledger</h3>
          </div>

          <div className="flex flex-col gap-2 my-2">
            <AnimatePresence initial={false}>
              {mockLedger.slice(-2).map((item) => (
              <motion.div
                key={`${item.name}-${item.date}-${item.score}`}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                whileHover={
                  reduceMotion || !item.subject
                    ? undefined
                    : { x: 3, borderColor: subjectThemes[item.subject].border, backgroundColor: subjectThemes[item.subject].soft }
                }
                className="flex items-center justify-between p-2 rounded border border-white/5 bg-white/[0.01] text-xs"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {item.subject && (
                      <span
                        className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{
                          color: subjectThemes[item.subject].color,
                          borderColor: subjectThemes[item.subject].border,
                          backgroundColor: subjectThemes[item.subject].soft,
                        }}
                      >
                        {subjectThemes[item.subject].label}
                      </span>
                    )}
                    <span className="font-semibold text-white/90">{item.name}</span>
                  </div>
                  <span className="text-[9px] text-white/40">{item.date}</span>
                </div>
                <motion.span
                  initial={reduceMotion ? false : { scale: 1.18, color: "#ffffff" }}
                  animate={{ scale: 1, color: item.subject ? subjectThemes[item.subject].color : "#007fff" }}
                  className="font-mono text-azure-dynamic font-bold"
                >
                  {item.score} / {item.max}
                </motion.span>
              </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!mockInputName.trim() || !mockInputScore.trim()) return;
              setMockLedger(prev => [...prev, { name: mockInputName, score: mockInputScore, max: "300", date: "Today" }]);
              setMockInputName("");
              setMockInputScore("");
            }}
            className="flex flex-col gap-1.5 z-10"
          >
            <div className="flex gap-1.5">
              <input 
                type="text" 
                value={mockInputName}
                onChange={(e) => setMockInputName(e.target.value)}
                placeholder="Test Name" 
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white placeholder-white/30 flex-1 outline-none"
              />
              <input 
                type="text" 
                value={mockInputScore}
                onChange={(e) => setMockInputScore(e.target.value)}
                placeholder="Score" 
                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white placeholder-white/30 w-16 outline-none"
              />
            </div>
            <motion.button type="submit" whileHover={reduceMotion ? undefined : { scale: 1.02, borderColor: "rgba(255,255,255,0.55)" }} whileTap={{ scale: 0.96 }} className="w-full h-7 rounded border border-white/20 hover:border-white/50 text-[10px] font-semibold text-white tracking-wider uppercase transition-colors">
              Log Mock Score
            </motion.button>
          </form>
        </BentoCard>

        {/* AI IITian Planner Agent */}
        <BentoCard index={4} reduceMotion={reduceMotion} className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-azure"
                animate={reduceMotion ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">BLUE AI</span>
            </div>
            <span className="text-[9px] text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono bg-emerald-500/10">API KEY ACTIVE</span>
          </div>

          <div className="flex flex-col gap-2 my-2 max-h-[110px] overflow-y-auto text-sm pr-1">
            <AnimatePresence initial={false}>
              {aiChat.slice(-3).map((msg, idx) => (
              <motion.div
                key={`${msg.sender}-${idx}-${msg.text}`}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: msg.sender === "agent" ? -14 : 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={`flex flex-col gap-0.5 p-2 rounded ${msg.sender === "agent" ? " bg-white/5 text-white/80 border-l border-azure-dynamic/50" : "bg-azure-dynamic/10 text-white/90 self-end max-w-[90%]"}`}
              >
                <span className="font-bold text-[12px] uppercase tracking-wider text-white/40">{msg.sender === "agent" ? "AI Planner" : "You"}</span>
                <p className="leading-tight">{msg.text}</p>
              </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (!aiInput.trim()) return;
              setAiChat(prev => [
                ...prev, 
                { sender: "user", text: aiInput },
                { sender: "agent", text: "Evaluating. Rotational physics scores indicate weakness in torque and rolling dynamics. Plan: 10 mock questions scheduled." }
              ]);
              setAiInput("");
            }}
            className="flex gap-2 border border-white/10 rounded px-2 py-1.5 bg-black/40 z-10"
          >
            <input 
              type="text" 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask AI agent (e.g. Plan my day)..." 
              className="bg-transparent border-0 outline-none p-0 text-xs text-white placeholder-white/30 flex-1 ring-0 focus:ring-0"
            />
          </form>
        </BentoCard>

        {/* Daily Reports Page Widget */}
        <BentoCard index={5} reduceMotion={reduceMotion} className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[240px] bg-[#000000] border border-white/10 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Study Progress Reports</span>
              <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Daily Reports Page</h3>
            </div>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded text-[10px]">
              {(["hours", "weekly"] as const).map((metric) => (
                <motion.button
                  key={metric}
                  onClick={() => setReportMetric(metric)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-2 py-0.5 rounded capitalize font-semibold cursor-pointer ${reportMetric === metric ? "text-white" : "text-white/50 hover:text-white"}`}
                >
                  {reportMetric === metric && <motion.span layoutId="report-metric-pill" className="absolute inset-0 rounded bg-azure" transition={pressTransition} />}
                  <span className="relative z-10">{metric}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0.55, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: easeOutExpo }}
            className="relative h-32 my-3 w-full"
          >
            <canvas ref={chartRef} className="w-full h-full" />
          </motion.div>

          <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-white/5">
            <span className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
              {reportMetric === "hours" && (
                <>
                  <span>Total Week study:</span>
                  <span style={{ color: subjectThemes.physics.color }}>62.4 Hours</span>
                  <span>(+12% vs last week)</span>
                </>
              )}
              {reportMetric === "weekly" && (
                <>
                  <span>Subject breakdown:</span>
                  <span style={{ color: subjectThemes.physics.color }}>Physics (28.4h)</span>
                  <span style={{ color: subjectThemes.chemistry.color }}>Chemistry (20.0h)</span>
                  <span style={{ color: subjectThemes.maths.color }}>Mathematics (14.0h)</span>
                </>
              )}
            </span>
            <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.96 }} className="text-azure hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              View Full Reports →
            </motion.button>
          </div>
        </BentoCard>

        {/* Friends System Widget */}
        <BentoCard index={6} reduceMotion={reduceMotion} className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[220px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Accountability Network</span>
              <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Friends Progress Feed</h3>
            </div>
            <span className="text-[10px] text-white/40">3 Friends Online</span>
          </div>

          <div className="flex flex-col gap-2 my-2">
            {[
              { name: "Aman Rathore (AR)", status: "Active: 7.8h · Matrices", online: true },
              { name: "Sneha Mahapatra (SM)", status: "Active: 5.2h · GOC", online: true },
              { name: "Rohan Das (RD)", status: "Idle: 4.1h", online: false }
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.35, ease: easeOutExpo }}
                whileHover={reduceMotion ? undefined : { x: 4, borderColor: "rgba(0,127,255,0.25)", backgroundColor: "rgba(255,255,255,0.035)" }}
                className="flex items-center justify-between p-2 rounded border border-white/5 bg-white/[0.01] text-xs"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${item.online ? "bg-emerald-500" : "bg-white/20"}`}
                    animate={item.online && !reduceMotion ? { scale: [1, 1.7, 1] } : undefined}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.25 }}
                  />
                  <span className="font-semibold text-white/80">{item.name}</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">{item.status}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 w-full z-10">
            <motion.button whileHover={reduceMotion ? undefined : { scale: 1.02, borderColor: "rgba(255,255,255,0.22)" }} whileTap={{ scale: 0.96 }} className="flex-1 h-8 rounded border border-white/5 hover:bg-white/5 text-[10px] font-semibold text-white/80 transition-all cursor-pointer">
              Challenge Friends
            </motion.button>
            <motion.button whileHover={reduceMotion ? undefined : { scale: 1.04, borderColor: "rgba(0,127,255,0.45)" }} whileTap={{ scale: 0.96 }} className="h-8 px-3 rounded border border-white/10 hover:bg-white/5 text-[10px] font-semibold text-white/80 transition-all cursor-pointer">
              + Connect
            </motion.button>
          </div>
        </BentoCard>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
