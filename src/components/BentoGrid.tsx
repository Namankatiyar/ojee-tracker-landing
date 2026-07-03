"use client";

import React, { useState, useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

export default function BentoGrid() {
  // Cockpit States
  const [clockMode, setClockMode] = useState<"pomo" | "stopwatch" | "custom">("pomo");
  const [clockTime, setClockTime] = useState("25:00");
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [plannerTasks, setPlannerTasks] = useState([
    { id: 1, text: "Solve 15 Maths Matrices PYQs", done: true },
    { id: 2, text: "Read Electrostatics NCERT Capacitor theory", done: false },
    { id: 3, text: "Attempt Chemistry Mock Test 3", done: false }
  ]);
  const [plannerInput, setPlannerInput] = useState("");
  const [mockLedger, setMockLedger] = useState([
    { name: "JEE Advanced Mock 8", score: "198", max: "300", date: "June 25" },
    { name: "JEE Main Mock 14", score: "254", max: "300", date: "June 20" }
  ]);
  const [mockInputName, setMockInputName] = useState("");
  const [mockInputScore, setMockInputScore] = useState("");
  const [aiChat, setAiChat] = useState([
    { sender: "agent", text: "Rotational dynamics physics score logged (42%). Torque and rolling mechanics require review." }
  ]);
  const [aiInput, setAiInput] = useState("");

  // Daily Reports State
  const [reportMetric, setReportMetric] = useState<"hours" | "weekly">("hours");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, "rgba(0, 127, 255, 0.25)");
    gradient.addColorStop(1, "rgba(0, 127, 255, 0.0)");

    const dataMap: any = {
      hours: {
        type: "line",
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Study Hours",
            data: [8.5, 9.2, 6.0, 7.8, 10.5, 12.0, 8.4],
            borderColor: "#007fff",
            borderWidth: 2,
            backgroundColor: gradient,
            fill: true,
            tension: 0.25,
            pointBackgroundColor: "#000000",
            pointBorderColor: "#007fff",
            pointBorderWidth: 1.5,
            pointRadius: 3.5,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#007fff",
            pointHoverBorderColor: "#ffffff",
          }
        ],
        max: 14,
        unit: "h",
        stacked: false
      },
      weekly: {
        type: "bar",
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Physics",
            data: [3.5, 4.0, 2.5, 3.0, 4.5, 5.0, 3.4],
            backgroundColor: "#007fff",
            borderRadius: 2
          },
          {
            label: "Chemistry",
            data: [2.5, 3.2, 2.0, 2.8, 3.5, 4.0, 3.0],
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 2
          },
          {
            label: "Maths",
            data: [2.5, 2.0, 1.5, 2.0, 2.5, 3.0, 2.0],
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            borderRadius: 2
          }
        ],
        max: 14,
        unit: "h",
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
              callback: (val: any) => `${val}h`
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
              label: (context: any) => `${context.dataset.label}: ${context.parsed.y}h`
            }
          }
        } as any
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
    <div className="relative cockpit-container">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1px] bg-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden">
        {/* Syllabus Tracker */}
        <div className="md:col-span-8 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Granular Syllabus Matrix</span>
              <h3 className="text-xl font-bold tracking-tight mt-1 text-white">Syllabus Tracker</h3>
            </div>
          </div>

          <div className="flex flex-col gap-3 my-4">
            {[
              { subject: "Physics", topic: "Rotational Mechanics", sub: "Moment of Inertia, Angular Momentum", done: [true, false, false, true] },
              { subject: "Maths", topic: "Matrices & Determinants", sub: "Cramer's Rule, Adjoint properties", done: [true, true, false, false] },
              { subject: "Chemistry", topic: "Organic Chemistry GOC", sub: "Inductive & Resonance Effects", done: [true, true, true, false] }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row lg:items-center justify-between p-3 rounded border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors gap-3">
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-mono text-azure-dynamic font-semibold">{item.subject}</span>
                    <span className="text-xs font-semibold text-white">{item.topic}</span>
                  </div>
                  <span className="text-[10px] text-white/50 mt-0.5">{item.sub}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["NCERT", "PYQs", "Modules", "Mock Tests"].map((node, nIdx) => (
                    <button 
                      key={nIdx}
                      className={`px-2.5 py-1 text-[9px] font-semibold border transition-all rounded-full uppercase tracking-wider ${
                        item.done[nIdx] 
                          ? "bg-azure/80 border-azure/80 text-white" 
                          : "border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {node}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-white/5">
            <span>Track daily syllabus milestones.</span>
            <button className="text-azure hover:underline font-semibold flex items-center gap-1">
              + Add Custom Topic
            </button>
          </div>
        </div>

        {/* Study Clock Engine */}
        <div className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Study Clock Engine</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-azure-dynamic opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-azure-dynamic"></span>
            </span>
          </div>

          <div className="flex flex-col items-center py-2">
            <div className="flex rounded bg-white/5 p-0.5 text-[10px] font-semibold border border-white/10 mb-4 z-10">
              {(["pomo", "stopwatch", "custom"] as const).map((mode) => (
                <button 
                  key={mode} 
                  onClick={() => {
                    setClockMode(mode);
                    setClockTime(mode === "pomo" ? "25:00" : mode === "stopwatch" ? "00:00:00" : "45:00");
                  }}
                  className={`px-3 py-1 rounded transition-all capitalize cursor-pointer ${clockMode === mode ? "bg-azure-dynamic text-white" : "text-white/60"}`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="text-4xl font-mono font-bold tracking-tight text-white mb-2">{clockTime}</div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{isClockRunning ? "Focus Session Active" : "Paused"}</span>
          </div>

          <div className="flex gap-2 w-full z-10">
            <button 
              onClick={() => setIsClockRunning(!isClockRunning)}
              className="flex-1 h-9 rounded bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer"
            >
              {isClockRunning ? "Pause" : "Start"}
            </button>
            <button 
              onClick={() => {
                setIsClockRunning(false);
                setClockTime(clockMode === "pomo" ? "25:00" : clockMode === "stopwatch" ? "00:00:00" : "45:00");
              }}
              className="px-3 h-9 rounded border border-white/10 text-xs text-white/60 hover:text-white transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Frictionless Weekly Planner */}
        <div className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Frictionless Planner</span>
            <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Weekly Study Tasks</h3>
          </div>

          <div className="flex flex-col gap-2 my-3 max-h-[110px] overflow-y-auto pr-1">
            {plannerTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2 text-xs">
                <input 
                  type="checkbox" 
                  checked={t.done} 
                  onChange={() => setPlannerTasks(prev => prev.map(item => item.id === t.id ? { ...item, done: !item.done } : item))}
                  className="rounded border-white/20 bg-black text-azure-dynamic focus:ring-0 w-3.5 h-3.5"
                />
                <span className={`text-white/80 ${t.done ? "line-through text-white/40" : ""}`}>{t.text}</span>
              </div>
            ))}
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
            <button type="submit" className="text-[10px] font-bold text-azure-dynamic uppercase tracking-wider hover:text-white">Add</button>
          </form>
        </div>

        {/* Mock Score Log */}
        <div className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Mock Test Scores</span>
            <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Scores Ledger</h3>
          </div>

          <div className="flex flex-col gap-2 my-2">
            {mockLedger.slice(-2).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded border border-white/5 bg-white/[0.01] text-xs">
                <div className="flex flex-col">
                  <span className="font-semibold text-white/90">{item.name}</span>
                  <span className="text-[9px] text-white/40">{item.date}</span>
                </div>
                <span className="font-mono text-azure-dynamic font-bold">{item.score} / {item.max}</span>
              </div>
            ))}
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
            <button type="submit" className="w-full h-7 rounded border border-white/20 hover:border-white/50 text-[10px] font-semibold text-white tracking-wider uppercase transition-colors">
              Log Mock Score
            </button>
          </form>
        </div>

        {/* AI IITian Planner Agent */}
        <div className="md:col-span-4 p-5 relative flex flex-col justify-between min-h-[260px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-azure animate-pulse"></div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">BLUE AI</span>
            </div>
            <span className="text-[9px] text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono bg-emerald-500/10">API KEY ACTIVE</span>
          </div>

          <div className="flex flex-col gap-2 my-2 max-h-[110px] overflow-y-auto text-sm pr-1">
            {aiChat.slice(-3).map((msg, idx) => (
              <div key={idx} className={`flex flex-col gap-0.5 p-2 rounded ${msg.sender === "agent" ? " bg-white/5 text-white/80 border-l border-azure-dynamic/50" : "bg-azure-dynamic/10 text-white/90 self-end max-w-[90%]"}`}>
                <span className="font-bold text-[12px] uppercase tracking-wider text-white/40">{msg.sender === "agent" ? "AI Planner" : "You"}</span>
                <p className="leading-tight">{msg.text}</p>
              </div>
            ))}
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
        </div>

        {/* Daily Reports Page Widget */}
        <div className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[240px] bg-[#000000] border border-white/10 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">Study Progress Reports</span>
              <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Daily Reports Page</h3>
            </div>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded text-[10px]">
              {(["hours", "weekly"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setReportMetric(metric)}
                  className={`px-2 py-0.5 rounded capitalize transition-all font-semibold cursor-pointer ${
                    reportMetric === metric ? "bg-azure text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-32 my-3 w-full">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-white/5">
            <span>
              {reportMetric === "hours" && "Total Week study: 62.4 Hours (+12% vs last week)"}
              {reportMetric === "weekly" && "Subject breakdown: Physics (28.4h), Chem (20.0h), Maths (14.0h)"}
            </span>
            <button className="text-azure hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              View Full Reports →
            </button>
          </div>
        </div>

        {/* Friends System Widget */}
        <div className="md:col-span-6 p-5 relative flex flex-col justify-between min-h-[220px] bg-[#000000] hover:bg-[#080808] border border-white/10 rounded-lg transition-colors duration-300">
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
              <div key={idx} className="flex items-center justify-between p-2 rounded border border-white/5 bg-white/[0.01] text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.online ? "bg-emerald-500" : "bg-white/20"}`}></span>
                  <span className="font-semibold text-white/80">{item.name}</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">{item.status}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 w-full z-10">
            <button className="flex-1 h-8 rounded border border-white/5 hover:bg-white/5 text-[10px] font-semibold text-white/80 transition-all cursor-pointer">
              Challenge Friends
            </button>
            <button className="h-8 px-3 rounded border border-white/10 hover:bg-white/5 text-[10px] font-semibold text-white/80 transition-all cursor-pointer">
              + Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
