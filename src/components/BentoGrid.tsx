"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

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

const dailyHoursData = [
  { day: "Mon", hours: 8.5, physics: 3.5, chemistry: 2.5, maths: 2.5 },
  { day: "Tue", hours: 9.2, physics: 4.0, chemistry: 3.2, maths: 2.0 },
  { day: "Wed", hours: 6.0, physics: 2.5, chemistry: 2.0, maths: 1.5 },
  { day: "Thu", hours: 7.8, physics: 3.0, chemistry: 2.8, maths: 2.0 },
  { day: "Fri", hours: 10.5, physics: 4.5, chemistry: 3.5, maths: 2.5 },
  { day: "Sat", hours: 12.0, physics: 5.0, chemistry: 4.0, maths: 3.0 },
  { day: "Sun", hours: 8.4, physics: 3.4, chemistry: 3.0, maths: 2.0 },
];

function StudyHoursChart({ metric, isDark }: { metric: ReportMetric; isDark: boolean }) {
  const width = 500;
  const height = 120;
  const topY = 16;
  const bottomY = 96;
  const graphHeight = bottomY - topY;
  const maxVal = 14;

  const leftX = 36;
  const rightX = 476;
  const graphWidth = rightX - leftX;
  const colStep = graphWidth / 7;

  const getX = (idx: number) => leftX + (idx + 0.5) * colStep;
  const getY = (val: number) => bottomY - (val / maxVal) * graphHeight;

  const tickColor = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.45)";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.06)";
  const borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  const points = dailyHoursData.map((d, i) => ({ x: getX(i), y: getY(d.hours) }));

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    linePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;

  return (
    <svg
      role="img"
      aria-label="Study hours visualization chart displaying daily hours between 6.0 and 12.0 hours across Physics, Chemistry, and Mathematics"
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full select-none"
    >
      <defs>
        <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {[14, 7, 0].map((val) => {
        const y = getY(val);
        return (
          <g key={val}>
            <line
              x1={leftX}
              y1={y}
              x2={rightX}
              y2={y}
              stroke={gridColor}
              strokeWidth="1"
            />
            <text
              x={leftX - 8}
              y={y + 3}
              textAnchor="end"
              fill={tickColor}
              fontSize="9"
              fontFamily="monospace"
            >
              {val}h
            </text>
          </g>
        );
      })}

      <line
        x1={leftX}
        y1={bottomY}
        x2={rightX}
        y2={bottomY}
        stroke={borderColor}
        strokeWidth="1"
      />

      {dailyHoursData.map((d, i) => (
        <text
          key={d.day}
          x={getX(i)}
          y={height - 8}
          textAnchor="middle"
          fill={tickColor}
          fontSize="9"
          fontFamily="monospace"
        >
          {d.day}
        </text>
      ))}

      {metric === "hours" && (
        <g>
          <path d={areaPath} fill="url(#chartLineGradient)" />
          <path
            d={linePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {dailyHoursData.map((d, i) => {
            const pt = points[i];
            return (
              <g key={d.day} className="cursor-pointer group">
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill={isDark ? "#0a0a0a" : "#ffffff"}
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />
                <title>{`${d.day}: ${d.hours}h`}</title>
              </g>
            );
          })}
        </g>
      )}

      {metric === "weekly" && (
        <g>
          <g transform={`translate(${rightX - 170}, 6)`}>
            <circle cx="0" cy="4" r="3" fill="#6366f1" />
            <text x="6" y="7" fill={tickColor} fontSize="8" fontFamily="monospace">Physics</text>
            <circle cx="52" cy="4" r="3" fill="#10b981" />
            <text x="58" y="7" fill={tickColor} fontSize="8" fontFamily="monospace">Chemistry</text>
            <circle cx="114" cy="4" r="3" fill="#f59e0b" />
            <text x="120" y="7" fill={tickColor} fontSize="8" fontFamily="monospace">Maths</text>
          </g>

          {dailyHoursData.map((d, i) => {
            const barW = 20;
            const barX = getX(i) - barW / 2;

            const hMaths = (d.maths / maxVal) * graphHeight;
            const yMaths = bottomY - hMaths;

            const hChem = (d.chemistry / maxVal) * graphHeight;
            const yChem = yMaths - hChem;

            const hPhys = (d.physics / maxVal) * graphHeight;
            const yPhys = yChem - hPhys;

            return (
              <g key={d.day} className="cursor-pointer">
                <rect
                  x={barX}
                  y={yMaths}
                  width={barW}
                  height={hMaths}
                  fill="#f59e0b"
                />
                <rect
                  x={barX}
                  y={yChem}
                  width={barW}
                  height={hChem}
                  fill="#10b981"
                />
                <rect
                  x={barX}
                  y={yPhys}
                  width={barW}
                  height={hPhys}
                  rx="2"
                  ry="2"
                  fill="#6366f1"
                />
                <title>{`${d.day}: ${d.hours}h (Physics ${d.physics}h, Chemistry ${d.chemistry}h, Maths ${d.maths}h)`}</title>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}

function BentoCard({
  children,
  className,
  index,
  reduceMotion,
  featureId,
  ariaLabelledBy,
}: {
  children: React.ReactNode;
  className: string;
  index: number;
  reduceMotion: boolean;
  featureId?: string;
  ariaLabelledBy?: string;
}) {
  return (
    <motion.article
      id={featureId}
      aria-labelledby={ariaLabelledBy}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
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
    </motion.article>
  );
}

export default function BentoGrid() {
  const reduceMotion = useReducedMotion() ?? false;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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

  const [reportMetric, setReportMetric] = useState<ReportMetric>("hours");

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
        {/* AI Agent Native Reading Manifest & Screen Reader Context Landmark */}
        <div className="sr-only" data-agent-manifest="bento-features">
          <h2>OJEE-Tracker Core Feature Matrix & Capabilities</h2>
          <p>
            OJEE-Tracker is an offline-first study command center designed for JEE Main, JEE Advanced, NEET, and OJEE aspirants.
            Key capabilities included in this cockpit:
            1. Granular Syllabus Matrix: Subtopic tracking with NCERT, PYQ, Coaching Module, and Mock Test verification milestones.
            2. Study Clock Engine: Pomodoro (25min) and continuous stopwatch timers with subject tagging and offline persistence.
            3. Frictionless Weekly Planner: Daily checklist for scheduling problem-solving targets.
            4. Mock Test Scores Ledger: Exam tracking for test series out of 300 and 720 marks.
            5. BLUE AI Planner: Diagnostic recommendations based on syllabus velocity and weak spots.
            6. Study Progress Reports: Charted analytics of daily hours (62.4h/week) and subject distribution.
            7. Friends Accountability Feed: Real-time peer study indicators.
            All modules run offline-first using client-side storage with zero telemetry.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-bento-gap-bg border border-subtle-border rounded-xl overflow-hidden"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
        {/* Syllabus Tracker */}
        <BentoCard
          index={0}
          reduceMotion={reduceMotion}
          featureId="feature-syllabus-tracker"
          ariaLabelledBy="feature-syllabus-title"
          className="md:col-span-8 p-5 relative flex flex-col justify-between min-h-[260px] bg-card-solid border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-syllabus">
            <h4>Feature: Granular Syllabus Matrix</h4>
            <p>
              Tracks syllabus completion at the subtopic level across Physics, Chemistry, and Mathematics for JEE Main, JEE Advanced, NEET, and OJEE.
              Each subtopic includes 4 independent verification milestones: NCERT theory review, Previous Year Questions (PYQs), Coaching Module exercises, and Mock Tests.
              Operates offline with zero network latency using client-side IndexedDB.
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-subtle-border pb-3.5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-text-strong">JEE & NEET Syllabus Planner</span>
              <h3 id="feature-syllabus-title" className="text-xl font-bold tracking-tight mt-1 text-foreground">Subtopic Syllabus Planner</h3>
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
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-3 rounded border border-subtle-border bg-table-row-bg hover:border-card-border transition-colors gap-3"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-wider font-mono font-semibold" style={{ color: theme.color }}>
                        {theme.label}
                      </span>
                      <span className="text-xs font-semibold text-foreground">{item.topic}</span>
                    </div>
                    <span className="text-[10px] text-muted-text mt-0.5">{item.sub}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={`Milestones for ${item.topic}`}>
                    {syllabusNodes.map((node, nIdx) => (
                      <motion.button
                        key={nIdx}
                        type="button"
                        layout
                        aria-pressed={item.done[nIdx]}
                        aria-label={`Toggle ${node} milestone for ${item.topic} (${theme.label})`}
                        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => toggleSyllabusNode(idx, nIdx)}
                        transition={pressTransition}
                        style={
                          item.done[nIdx]
                            ? { backgroundColor: theme.soft, borderColor: theme.color, color: theme.color }
                            : { borderColor: theme.border, color: "var(--muted-text-strong)" }
                        }
                        className="px-2.5 py-1 text-[9px] font-semibold border transition-all rounded-full uppercase tracking-wider cursor-pointer"
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

          <div className="flex justify-between items-center text-[10px] text-muted-text-strong pt-2 border-t border-subtle-border">
            <span>Track daily JEE & NEET syllabus milestones down to subtopics.</span>
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Add custom topic to syllabus tracker"
              className="text-azure hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              + Add Custom Topic
            </motion.button>
          </div>
        </BentoCard>

        {/* Study Clock Engine */}
        <BentoCard
          index={1}
          reduceMotion={reduceMotion}
          featureId="feature-study-clock"
          ariaLabelledBy="feature-clock-title"
          className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-card-solid hover:bg-card-hover border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-clock">
            <h4>Feature: Study Clock Engine</h4>
            <p>
              Integrated focus timer supporting Pomodoro technique (25-minute study intervals with automated 5-minute recovery intervals) and deep-work stopwatch.
              Logs daily study sessions locally and updates active status in the Friends Network.
            </p>
          </div>

          <div className="flex justify-between items-start">
            <span id="feature-clock-title" className="text-xs font-semibold uppercase tracking-wider text-muted-text-strong">JEE & NEET Time Tracker</span>
            <span className="flex h-2 w-2 relative" aria-label={isClockRunning ? "Timer active" : "Timer paused"}>
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-azure-dynamic"
                animate={isClockRunning && !reduceMotion ? { scale: [1, 2.4], opacity: [0.7, 0] } : { scale: 1, opacity: 0.25 }}
                transition={{ duration: 1.2, repeat: isClockRunning ? Infinity : 0, ease: easeOutExpo }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-azure-dynamic"></span>
            </span>
          </div>

          <div className="flex flex-col items-center py-2">
            <div role="tablist" aria-label="Timer Mode Selection" className="flex rounded bg-foreground/5 p-0.5 text-[10px] font-semibold border border-subtle-border mb-4 z-10">
              {(["pomo", "stopwatch", "custom"] as const).map((mode) => (
                <motion.button
                  key={mode}
                  role="tab"
                  aria-selected={clockMode === mode}
                  aria-label={`Switch timer mode to ${mode === "pomo" ? "Pomodoro 25 minute cycle" : mode === "stopwatch" ? "continuous stopwatch" : "custom 45 minute timer"}`}
                  onClick={() => {
                    setClockMode(mode);
                    setClockTime(mode === "pomo" ? "25:00" : mode === "stopwatch" ? "00:00:00" : "45:00");
                  }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-3 py-1 rounded capitalize cursor-pointer ${clockMode === mode ? "text-foreground" : "text-muted-text"}`}
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
              aria-live="polite"
              aria-atomic="true"
              aria-label={`Current timer display: ${clockTime}`}
              initial={reduceMotion ? { opacity: 0.7 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-mono font-bold tracking-tight text-foreground mb-2"
            >
              {clockTime}
            </motion.div>
            <motion.span
              animate={{ color: isClockRunning ? "rgba(0,127,255,0.9)" : "var(--muted-text-strong)" }}
              className="text-[10px] uppercase tracking-widest font-medium"
            >
              {isClockRunning ? "Deep Work Active · 100% Ad-Free" : "Focus Timer Paused"}
            </motion.span>
          </div>

          <div className="flex gap-2 w-full z-10">
            <motion.button
              type="button"
              aria-label={isClockRunning ? "Pause study focus timer" : "Start study focus timer"}
              onClick={() => setIsClockRunning(!isClockRunning)}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 h-9 rounded bg-foreground text-background font-semibold text-xs hover:opacity-90 transition-all cursor-pointer"
            >
              {isClockRunning ? "Pause" : "Start"}
            </motion.button>
            <motion.button
              type="button"
              aria-label="Reset study timer"
              onClick={() => {
                setIsClockRunning(false);
                setClockTime(clockMode === "pomo" ? "25:00" : clockMode === "stopwatch" ? "00:00:00" : "45:00");
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.03, borderColor: "var(--subtle-border)" }}
              whileTap={{ scale: 0.95 }}
              className="px-3 h-9 rounded border border-subtle-border text-xs text-muted-text hover:text-foreground transition-all cursor-pointer"
            >
              Reset
            </motion.button>
          </div>
        </BentoCard>

        {/* Frictionless Weekly Planner */}
        <BentoCard
          index={2}
          reduceMotion={reduceMotion}
          featureId="feature-weekly-planner"
          ariaLabelledBy="feature-planner-title"
          className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-card-solid hover:bg-card-hover border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-planner">
            <h4>Feature: Frictionless Weekly Planner</h4>
            <p>
              Subject-tagged task checklist for scheduling daily revision, NCERT reading goals, and question-solving targets with instant offline persistence.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-text-strong">Daily Prep Planner</span>
            <h3 id="feature-planner-title" className="text-base font-bold tracking-tight mt-0.5 text-foreground">Weekly Study Tasks (JEE & NEET)</h3>
          </div>

          <div className="flex flex-col gap-2 my-3 max-h-[110px] overflow-y-auto pr-1" role="list" aria-label="Study Task List">
            <AnimatePresence initial={false}>
              {plannerTasks.map((t) => (
              <motion.div
                key={t.id}
                role="listitem"
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.98 }}
                className="flex items-center gap-2 text-xs"
              >
                <input
                  type="checkbox"
                  id={`task-${t.id}`}
                  aria-label={`Mark task ${t.text} as ${t.done ? "incomplete" : "complete"}`}
                  checked={t.done}
                  onChange={() => setPlannerTasks(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item))}
                  className="rounded border-subtle-border bg-background text-azure-dynamic focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                />
                <label htmlFor={`task-${t.id}`} className="flex min-w-0 items-center gap-2 cursor-pointer">
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
                    className={t.done ? "min-w-0 truncate line-through text-muted-text-strong" : "min-w-0 truncate text-foreground/80"}
                  >
                    {t.text}
                  </motion.span>
                </label>
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
            className="flex gap-2 border border-subtle-border rounded px-2.5 py-1.5 bg-input-bg z-10"
          >
            <label htmlFor="planner-task-input" className="sr-only">Add task to weekly planner</label>
            <input
              id="planner-task-input"
              type="text"
              value={plannerInput}
              onChange={(e) => setPlannerInput(e.target.value)}
              placeholder="> Add task to weekly planner..."
              className="bg-transparent border-0 outline-none p-0 text-xs text-foreground placeholder-muted-text-strong flex-1 ring-0 focus:ring-0"
            />
            <motion.button
              type="submit"
              aria-label="Add task to weekly study planner"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="text-[10px] font-bold text-azure-dynamic uppercase tracking-wider hover:text-foreground cursor-pointer"
            >
              Add
            </motion.button>
          </form>
        </BentoCard>

        {/* Mock Score Log */}
        <BentoCard
          index={3}
          reduceMotion={reduceMotion}
          featureId="feature-mock-ledger"
          ariaLabelledBy="feature-ledger-title"
          className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-card-solid hover:bg-card-hover border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-mock-ledger">
            <h4>Feature: Mock Test Scores Ledger</h4>
            <p>
              Tracks full-length and chapter mock test scores for JEE Main, JEE Advanced, and NEET. Records test title, test date, and total score out of maximum marks (300 or 720) to compute accuracy trends.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-text-strong">JEE & NEET Mock Score Tracker</span>
            <h3 id="feature-ledger-title" className="text-base font-bold tracking-tight mt-0.5 text-foreground">Mock Scores Ledger (300 / 720 Marks)</h3>
          </div>

          <div className="flex flex-col gap-2 my-2" role="list" aria-label="Mock Test Scores List">
            <AnimatePresence initial={false}>
              {mockLedger.slice(-2).map((item) => (
              <motion.div
                key={`${item.name}-${item.date}-${item.score}`}
                role="listitem"
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                whileHover={
                  reduceMotion || !item.subject
                    ? undefined
                    : { x: 3, borderColor: subjectThemes[item.subject].border, backgroundColor: subjectThemes[item.subject].soft }
                }
                className="flex items-center justify-between p-2 rounded border border-subtle-border bg-table-row-bg text-xs"
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
                    <span className="font-semibold text-foreground/90">{item.name}</span>
                  </div>
                  <span className="text-[9px] text-muted-text-strong">{item.date}</span>
                </div>
                <motion.span
                  initial={reduceMotion ? false : { scale: 1.18, color: "var(--foreground)" }}
                  animate={{ scale: 1, color: item.subject ? subjectThemes[item.subject].color : "var(--color-azure)" }}
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
              <label htmlFor="mock-test-name-input" className="sr-only">Mock Test Name</label>
              <input
                id="mock-test-name-input"
                type="text"
                value={mockInputName}
                onChange={(e) => setMockInputName(e.target.value)}
                placeholder="Test Name"
                className="bg-foreground/5 border border-subtle-border rounded px-2 py-1 text-[10px] text-foreground placeholder-muted-text-strong flex-1 outline-none"
              />
              <label htmlFor="mock-test-score-input" className="sr-only">Mock Test Score</label>
              <input
                id="mock-test-score-input"
                type="text"
                value={mockInputScore}
                onChange={(e) => setMockInputScore(e.target.value)}
                placeholder="Score"
                className="bg-foreground/5 border border-subtle-border rounded px-2 py-1 text-[10px] text-foreground placeholder-muted-text-strong w-16 outline-none"
              />
            </div>
            <motion.button
              type="submit"
              aria-label="Log mock exam score into ledger"
              whileHover={reduceMotion ? undefined : { scale: 1.02, borderColor: "var(--subtle-border)" }}
              whileTap={{ scale: 0.96 }}
              className="w-full h-7 rounded border border-subtle-border hover:border-card-border text-[10px] font-semibold text-foreground tracking-wider uppercase transition-colors cursor-pointer"
            >
              Log Mock Score
            </motion.button>
          </form>
        </BentoCard>

        {/* AI IITian Planner Agent */}
        <BentoCard
          index={4}
          reduceMotion={reduceMotion}
          featureId="feature-ai-agent"
          ariaLabelledBy="feature-ai-title"
          className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-card-solid hover:bg-card-hover border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-ai-agent">
            <h4>Feature: BLUE AI Study Planner</h4>
            <p>
              Diagnostic study agent that analyzes student performance patterns, test score gaps, and syllabus velocity to formulate prioritized study recommendations.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-azure"
                aria-hidden="true"
                animate={reduceMotion ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span id="feature-ai-title" className="text-xs font-semibold uppercase tracking-wider text-muted-text-strong">BLUE AI Planner</span>
            </div>
            <span className="text-[9px] text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono bg-emerald-500/10">API KEY ACTIVE</span>
          </div>

          <div className="flex flex-col gap-2 my-2 max-h-[110px] overflow-y-auto text-sm pr-1" role="log" aria-label="AI Planner Chat Log">
            <AnimatePresence initial={false}>
              {aiChat.slice(-3).map((msg, idx) => (
              <motion.div
                key={`${msg.sender}-${idx}-${msg.text}`}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: msg.sender === "agent" ? -14 : 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={`flex flex-col gap-0.5 p-2 rounded ${msg.sender === "agent" ? " bg-foreground/5 text-foreground/80 border-l border-azure-dynamic/50" : "bg-azure-dynamic/10 text-foreground/90 self-end max-w-[90%]"}`}
              >
                <span className="font-bold text-[12px] uppercase tracking-wider text-muted-text-strong">{msg.sender === "agent" ? "AI Planner" : "You"}</span>
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
            className="flex gap-2 border border-subtle-border rounded px-2.5 py-1.5 bg-input-bg z-10"
          >
            <label htmlFor="ai-chat-input" className="sr-only">Ask AI study planner agent</label>
            <input
              id="ai-chat-input"
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask AI agent (e.g. Plan my day)..."
              className="bg-transparent border-0 outline-none p-0 text-xs text-foreground placeholder-muted-text-strong flex-1 ring-0 focus:ring-0"
            />
          </form>
        </BentoCard>

        {/* Daily Reports Page Widget */}
        <BentoCard
          index={5}
          reduceMotion={reduceMotion}
          featureId="feature-progress-reports"
          ariaLabelledBy="feature-reports-title"
          className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[240px] bg-card-solid border border-subtle-border rounded-lg"
        >
          {/* Machine Summary for AI Agents & Screen Readers */}
          <div className="sr-only" data-agent-reading="feature-reports-data">
            <h4>Feature: Study Progress Reports Data</h4>
            <table>
              <caption>Weekly Study Hours by Day and Subject</caption>
              <thead>
                <tr><th scope="col">Day</th><th scope="col">Total Hours</th><th scope="col">Physics</th><th scope="col">Chemistry</th><th scope="col">Mathematics</th></tr>
              </thead>
              <tbody>
                <tr><td>Monday</td><td>8.5h</td><td>3.5h</td><td>2.5h</td><td>2.5h</td></tr>
                <tr><td>Tuesday</td><td>9.2h</td><td>4.0h</td><td>3.2h</td><td>2.0h</td></tr>
                <tr><td>Wednesday</td><td>6.0h</td><td>2.5h</td><td>2.0h</td><td>1.5h</td></tr>
                <tr><td>Thursday</td><td>7.8h</td><td>3.0h</td><td>2.8h</td><td>2.0h</td></tr>
                <tr><td>Friday</td><td>10.5h</td><td>4.5h</td><td>3.5h</td><td>2.5h</td></tr>
                <tr><td>Saturday</td><td>12.0h</td><td>5.0h</td><td>4.0h</td><td>3.0h</td></tr>
                <tr><td>Sunday</td><td>8.4h</td><td>3.4h</td><td>3.0h</td><td>2.0h</td></tr>
              </tbody>
            </table>
            <p>Weekly Total: 62.4 Hours (+12% improvement vs previous week). Subject Distribution: Physics 28.4h, Chemistry 20.0h, Mathematics 14.0h.</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-subtle-border pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-text-strong">Time Tracker & Prep Analytics</span>
              <h3 id="feature-reports-title" className="text-base font-bold tracking-tight mt-0.5 text-foreground">Daily Study Hours & Reports</h3>
            </div>
            <div role="tablist" aria-label="Report Metric Switcher" className="flex items-center gap-1 bg-foreground/5 border border-subtle-border p-0.5 rounded text-[10px]">
              {(["hours", "weekly"] as const).map((metric) => (
                <motion.button
                  key={metric}
                  role="tab"
                  aria-selected={reportMetric === metric}
                  aria-label={`View ${metric === "hours" ? "daily study hours trend" : "weekly subject distribution"} chart`}
                  onClick={() => setReportMetric(metric)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-2 py-0.5 rounded capitalize font-semibold cursor-pointer ${reportMetric === metric ? "text-foreground" : "text-muted-text hover:text-foreground"}`}
                >
                  {reportMetric === metric && <motion.span layoutId="report-metric-pill" className="absolute inset-0 rounded bg-azure" transition={pressTransition} />}
                  <span className="relative z-10">{metric}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0.55, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: easeOutExpo }}
            className="relative h-32 my-3 w-full"
          >
            <StudyHoursChart metric={reportMetric} isDark={isDark} />
          </motion.div>

          <div className="flex justify-between items-center text-[10px] text-muted-text-strong pt-2 border-t border-subtle-border">
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
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.96 }}
              aria-label="View full study progress analytics and reports"
              className="text-azure hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              View Full Reports →
            </motion.button>
          </div>
        </BentoCard>

        {/* Friends System Widget */}
        <BentoCard
          index={6}
          reduceMotion={reduceMotion}
          featureId="feature-friends-feed"
          ariaLabelledBy="feature-friends-title"
          className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[220px] bg-card-solid hover:bg-card-hover border border-subtle-border rounded-lg transition-colors duration-300"
        >
          {/* Machine Summary for AI Agents */}
          <div className="sr-only" data-agent-reading="feature-friends-feed">
            <h4>Feature: Accountability Friends Network</h4>
            <p>
              Peer accountability network displaying real-time study activity and daily hours among study partners (e.g. solving Matrices, revising formulas) to foster focus without social media distraction.
            </p>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-text-strong">JEE & NEET Peer Network</span>
              <h3 id="feature-friends-title" className="text-base font-bold tracking-tight mt-0.5 text-foreground">Friends Prep & Hours Feed</h3>
            </div>
            <span className="text-[10px] text-muted-text-strong">3 Friends Online</span>
          </div>

          <div className="flex flex-col gap-2 my-2" role="feed" aria-label="Friends study activity feed">
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
                whileHover={reduceMotion ? undefined : { x: 4, borderColor: "rgba(0,127,255,0.25)", backgroundColor: "var(--table-row-bg-hover)" }}
                className="flex items-center justify-between p-2 rounded border border-subtle-border bg-table-row-bg text-xs"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${item.online ? "bg-emerald-500" : "bg-foreground/20"}`}
                    aria-label={item.online ? "Online studying" : "Offline"}
                    animate={item.online && !reduceMotion ? { scale: [1, 1.7, 1] } : undefined}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.25 }}
                  />
                  <span className="font-semibold text-foreground/80">{item.name}</span>
                </div>
                <span className="text-[10px] text-muted-text-strong font-mono">{item.status}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 w-full z-10">
            <motion.button
              type="button"
              aria-label="Challenge friends to a study sprint"
              whileHover={reduceMotion ? undefined : { scale: 1.02, borderColor: "var(--subtle-border)" }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 h-8 rounded border border-subtle-border hover:bg-foreground/5 text-[10px] font-semibold text-foreground/80 transition-all cursor-pointer"
            >
              Challenge Friends
            </motion.button>
            <motion.button
              type="button"
              aria-label="Connect with new study peers"
              whileHover={reduceMotion ? undefined : { scale: 1.04, borderColor: "rgba(0,127,255,0.45)" }}
              whileTap={{ scale: 0.96 }}
              className="h-8 px-3 rounded border border-subtle-border hover:bg-foreground/5 text-[10px] font-semibold text-foreground/80 transition-all cursor-pointer"
            >
              + Connect
            </motion.button>
          </div>
        </BentoCard>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
