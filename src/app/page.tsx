"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveGrid from "../../InteractiveGrid";

// Helper for inline SVGs to keep the codebase dependency-free and performant
const Icons = {
  Github: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Discord: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
    </svg>
  ),
  Timer: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
  ),
  Check: () => (
    <svg className="w-4.5 h-4.5 text-azure" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5 text-azure" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
    </svg>
  ),
  Syllabus: () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5 text-azure" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
    </svg>
  )
};

// Realistic mock motivational quotes
const MOTIVATIONAL_QUOTES = [
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The difference between a successful person and others is not a lack of strength, but a lack of will.", author: "Vince Lombardi" },
  { text: "Your JEE rank is decided by what you do when no one is watching.", author: "IITian Mentor" },
  { text: "Struggle today, conquer tomorrow. Physics, Chemistry, Maths are won one problem at a time.", author: "OJEE Strategy" },
  { text: "Don't stop when you are tired. Stop when you are done.", author: "Unknown" }
];

// Sample syllabus dataset for OJEE-Tracker
const SYLLABUS_DATA = {
  Maths: [
    { id: "m1", name: "Matrices & Determinants", subtopics: "Cramer's Rule, Adjoint, Inverse Properties", progress: { ncert: true, pyq: true, module: false }, revisedDaysAgo: 12 },
    { id: "m2", name: "Limits, Continuity & Differentiability", subtopics: "L'Hopital Rule, Intermediate Value Theorem", progress: { ncert: true, pyq: false, module: false }, revisedDaysAgo: 45 },
    { id: "m3", name: "Vector Algebra & 3D Geometry", subtopics: "Shortest distance between skew lines, Scalar Triple Product", progress: { ncert: false, pyq: false, module: false }, revisedDaysAgo: 5 },
    { id: "m4", name: "Definite Integration", subtopics: "Leibniz Rule, King's & Queen's Properties", progress: { ncert: true, pyq: true, module: true }, revisedDaysAgo: 2 }
  ],
  Physics: [
    { id: "p1", name: "Electrostatics & Capacitance", subtopics: "Gauss Law applications, Dielectric slabs", progress: { ncert: true, pyq: true, module: false }, revisedDaysAgo: 35 },
    { id: "p2", name: "Rotational Mechanics", subtopics: "Moment of Inertia, Angular Momentum Conservation", progress: { ncert: false, pyq: false, module: false }, revisedDaysAgo: 8 },
    { id: "p3", name: "Modern Physics", subtopics: "Photoelectric Effect, Bohr's Model, Radioactive decay", progress: { ncert: true, pyq: true, module: true }, revisedDaysAgo: 28 },
    { id: "p4", name: "Optics (Wave & Ray)", subtopics: "YDSE fringes, Prism formula, Lens maker's formula", progress: { ncert: true, pyq: false, module: false }, revisedDaysAgo: 50 }
  ],
  Chemistry: [
    { id: "c1", name: "Chemical Bonding", subtopics: "VSEPR theory, Hybridization, Molecular Orbital Theory", progress: { ncert: true, pyq: true, module: true }, revisedDaysAgo: 3 },
    { id: "c2", name: "Gaseous State & Thermodynamics", subtopics: "Ideal gas laws, Entropy, Gibbs Free Energy", progress: { ncert: true, pyq: false, module: false }, revisedDaysAgo: 19 },
    { id: "c3", name: "Organic Chemistry Basics (GOC)", subtopics: "Inductive & Resonance Effects, Hyperconjugation", progress: { ncert: true, pyq: true, module: false }, revisedDaysAgo: 32 },
    { id: "c4", name: "Coordination Compounds", subtopics: "Crystal Field Theory, Isomerism in coordination complexes", progress: { ncert: false, pyq: false, module: false }, revisedDaysAgo: 14 }
  ]
};

export default function LandingPage() {
  
  // App-specific interactive demo states
  const [selectedSubject, setSelectedSubject] = useState<"Maths" | "Physics" | "Chemistry">("Maths");
  const [syllabusList, setSyllabusList] = useState(SYLLABUS_DATA);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [countdownDays, setCountdownDays] = useState(142);
  const [studyHoursToday, setStudyHoursToday] = useState(6.4);
  const [totalCompletedItems, setTotalCompletedItems] = useState(18);

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

  // Rotate quotes index
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Update total progress count dynamically when user clicks resource dots
  useEffect(() => {
    let completedCount = 0;
    Object.values(syllabusList).forEach((topics) => {
      topics.forEach((topic) => {
        if (topic.progress.ncert) completedCount++;
        if (topic.progress.pyq) completedCount++;
        if (topic.progress.module) completedCount++;
      });
    });
    setTotalCompletedItems(completedCount);
  }, [syllabusList]);

  // Click handler to toggle syllabus resource item states (NCERT, PYQ, Module)
  const handleToggleResource = (subject: "Maths" | "Physics" | "Chemistry", id: string, key: "ncert" | "pyq" | "module") => {
    setSyllabusList((prev) => {
      const updatedTopics = prev[subject].map((topic) => {
        if (topic.id === id) {
          return {
            ...topic,
            progress: {
              ...topic.progress,
              [key]: !topic.progress[key]
            }
          };
        }
        return topic;
      });
      return {
        ...prev,
        [subject]: updatedTopics
      };
    });
  };

  // Glassmorphic CSS style generation
  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-azure selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Minimal High-Contrast Logo */}
            <div className="w-8 h-8 rounded border border-white flex items-center justify-center font-display font-bold text-sm tracking-tighter">
              OT
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">OJEE-Tracker</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#features" className="transition-colors hover:text-white">Features</a>
            <a href="#dashboard-preview" className="transition-colors hover:text-white">Analytics</a>
            <a href="#syllabus" className="transition-colors hover:text-white">Workspace</a>
            <a href="#community" className="transition-colors hover:text-white">Community</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Namankatiyar/ojee-tracker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="GitHub Repository"
            >
              <Icons.Github />
            </a>
            <a 
              href="https://discord.gg/6dKrbVQU8W" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 h-9 rounded bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Icons.Discord />
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Wrapper with Full-Width Background Grid */}
      <div className="relative w-full bg-black border-b border-white/5 overflow-hidden">
        <InteractiveGrid />
        
        {/* Smooth fade-out to solid black at the bottom of the hero grid */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 md:py-20">
          {/* 2. HERO SECTION */}
          <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Subtle Accent Kicker */}
          <div 
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold mb-6"
            style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
          >
            <div className="flex -space-x-2">
              <span className="w-4.5 h-4.5 rounded-full bg-azure flex items-center justify-center text-[8px] text-black font-mono font-bold border-0">A</span>
              <span className="w-4.5 h-4.5 rounded-full bg-purple-600 flex items-center justify-center text-[8px] text-white font-mono font-bold border-0">R</span>
              <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 flex items-center justify-center text-[8px] text-white font-mono font-bold border-0">S</span>
            </div>
            <span className="text-white/70 tracking-wide uppercase text-[10px] flex items-center gap-2">
              Join 500+ aspirants
              <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-azure"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-azure" />
              </div>
            </span>
          </div>

          {/* Hero Heading: Outfit font with tight letter spacing */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Finally, a Planner That Gets It.
            <span className="block text-xs sm:text-sm font-medium tracking-widest text-azure uppercase mt-4">
              built by a jee aspirant for the jee aspirants.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 font-normal leading-relaxed max-w-2xl mb-10">
            Log active study hours, track syllabus completion down to subtopics, and analyze progress with zero cloud dependencies. High-density design meets distraction-free productivity.
          </p>

          {/* Call to Actions (No glows, high contrast borders) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => {
                const element = document.getElementById("dashboard-preview");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-white text-black font-semibold text-base tracking-tight hover:bg-white/90 transition-all cursor-pointer"
            >
              <span>Explore Active Live Demo</span>
              <Icons.ExternalLink />
            </button>
            <a 
              href="https://github.com/Namankatiyar/ojee-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-white/5 border border-white/20 text-white font-medium text-base hover:bg-white/10 hover:border-white/40 transition-colors"
              style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            >
              <Icons.Github />
              <span>View Code on GitHub</span>
            </a>
          </div>


        </section>
      </div>
    </div>

    <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-24">

        {/* 4. PREMIUM BENTO ANALYTICS DASHBOARD */}
        <section id="dashboard-preview" className="flex flex-col gap-8 scroll-mt-24">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="text-sm font-semibold text-azure tracking-widest uppercase">Live Workspace Showcase</div>
            <h2 className="font-display text-3xl font-bold tracking-tight">The 12-Column Bento Analytics Dashboard</h2>
            <p className="text-base text-white/60">
              All stats, heatmap calendars, active subject ratios, and countdowns laid out cleanly with a premium glassmorphic visual style.
            </p>
          </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative">
                  {/* Absolute Crosshairs in corners of the bento grid */}
                  <div className="absolute -top-2.5 -left-2 text-[10px] font-mono text-azure-dynamic/40 mechanical-crosshair select-none">+</div>
                  <div className="absolute -top-2.5 -right-2 text-[10px] font-mono text-azure-dynamic/40 mechanical-crosshair select-none">+</div>
                  <div className="absolute -bottom-2.5 -left-2 text-[10px] font-mono text-azure-dynamic/40 mechanical-crosshair select-none">+</div>
                  <div className="absolute -bottom-2.5 -right-2 text-[10px] font-mono text-azure-dynamic/40 mechanical-crosshair select-none">+</div>

                  {/* Syllabus Tracker */}
                  <div className="md:col-span-8 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[260px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[A1]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_SYLLABUS_MATRIX</span>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Granular Syllabus Matrix</span>
                        <h3 className="text-lg font-bold tracking-tight mt-1 text-white">Topic Completion Ledger</h3>
                      </div>
                      <span className="text-[10px] bg-azure-dynamic/15 text-azure-dynamic px-2 py-0.5 rounded border border-azure-dynamic/30 font-mono z-10">Customizable</span>
                    </div>

                    <div className="flex flex-col gap-2.5 my-4">
                      {[
                        { subject: "Physics", topic: "Rotational Mechanics", sub: "Moment of Inertia, Angular Momentum", done: [true, false, false, true] },
                        { subject: "Maths", topic: "Matrices & Determinants", sub: "Cramer's Rule, Adjoint properties", done: [true, true, false, false] },
                        { subject: "Chemistry", topic: "Organic Chemistry GOC", sub: "Inductive & Resonance Effects", done: [true, true, true, false] }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded border border-white/5 bg-white/[0.01] gap-2">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] uppercase tracking-wider font-mono text-white/40">{item.subject}</span>
                              <span className="text-xs font-semibold text-white">{item.topic}</span>
                            </div>
                            <span className="text-[10px] text-white/50 truncate max-w-xs">{item.sub}</span>
                          </div>
                          <div className="flex items-center gap-1.5 self-end sm:self-center">
                            {["N", "P", "M", "T"].map((node, nIdx) => (
                              <button 
                                key={nIdx}
                                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold border transition-all ${
                                  item.done[nIdx] 
                                    ? "bg-azure-dynamic border-azure-dynamic text-white" 
                                    : "border-white/10 text-white/40 hover:border-white/30"
                                }`}
                              >
                                {node}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-white/40">
                      <span>NCERT (N) · PYQs (P) · Modules (M) · Mock Tests (T)</span>
                      <button className="text-azure-dynamic hover:underline font-semibold flex items-center gap-1">
                        + Add Custom Topic
                      </button>
                    </div>
                  </div>

                  {/* Study Clock Engine */}
                  <div className="md:col-span-4 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[260px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[A2]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_TIMER_CORE</span>

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
                  <div className="md:col-span-4 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[260px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[B1]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_WEEKLY_PLANNER</span>

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
                  <div className="md:col-span-4 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[260px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[B2]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_MOCK_LEDGER</span>

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
                  <div className="md:col-span-4 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[260px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[B3]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_AI_PLANNER_AGENT</span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">IITian AI Planner</span>
                      </div>
                      <span className="text-[9px] text-emerald-500 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono bg-emerald-500/10">Active</span>
                    </div>

                    <div className="flex flex-col gap-2 my-2 max-h-[110px] overflow-y-auto text-[10px] pr-1">
                      {aiChat.slice(-3).map((msg, idx) => (
                        <div key={idx} className={`flex flex-col gap-0.5 p-2 rounded ${msg.sender === "agent" ? "bg-white/5 text-white/80 border-l border-azure-dynamic/50" : "bg-azure-dynamic/10 text-white/90 self-end max-w-[90%]"}`}>
                          <span className="font-bold text-[8px] uppercase tracking-wider text-white/40">{msg.sender === "agent" ? "AI Planner" : "You"}</span>
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
                      <button type="submit" className="text-[10px] font-bold text-azure-dynamic uppercase tracking-wider hover:text-white">Ask</button>
                    </form>
                  </div>

                  {/* Daily Reports Page Widget */}
                  <div className="md:col-span-6 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[220px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[C1]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_DAILY_REPORTS</span>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Study Progress Reports</span>
                        <h3 className="text-base font-bold tracking-tight mt-0.5 text-white">Daily Reports Page</h3>
                      </div>
                      <span className="text-[10px] text-azure-dynamic font-semibold">+12% vs last week</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2.5 items-end h-24 mt-2">
                      {[8.5, 9.2, 6.0, 7.8, 10.5, 12.0, 8.4].map((hrs, idx) => {
                        const heightPct = (hrs / 14) * 100;
                        const days = ["M", "T", "W", "T", "F", "S", "S"];
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group relative">
                            <div className="absolute bottom-full bg-black border border-white/10 px-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap mb-1">
                              {hrs} Hrs
                            </div>
                            <div style={{ height: `${heightPct}%` }} className="w-full bg-azure-dynamic/30 rounded-t-sm group-hover:bg-azure-dynamic transition-all duration-300"></div>
                            <span className="font-mono text-[9px] text-white/30">{days[idx]}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-t-white/5">
                      <span>Total Week study: 62.4 Hours</span>
                      <button className="text-azure-dynamic hover:underline font-semibold">View Full Reports</button>
                    </div>
                  </div>

                  {/* Friends System Widget */}
                  <div className="md:col-span-6 rounded-xl p-5 border border-white/10 bg-white/[0.02] backdrop-blur-md relative flex flex-col justify-between min-h-[220px] hover:border-white/20 transition-all duration-200">
                    <span className="coord-marker font-mono text-[8px] text-azure-dynamic/50 absolute top-1.5 right-2">[C2]</span>
                    <span className="label-marker font-mono text-[7px] text-white/30 absolute bottom-1.5 left-2">// SYS_PEER_FEED</span>

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
        </section>

        {/* 5. SYLLABUS & SUBTOPICS WORKSPACE */}
        <section id="syllabus" className="flex flex-col gap-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="text-sm font-semibold text-azure tracking-widest uppercase">Granular Syllabus Hub</div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Subject & Subtopics Workspace (V2)</h2>
              <p className="text-base text-white/60">
                OJEE-Tracker replaces messy lists with clear structured topic matrices. Click the dots to toggle syllabus elements NCERT (N), Previous Year Questions (P), and coaching modules (M).
              </p>
            </div>

            {/* Segment Selector */}
            <div className="flex rounded-lg border border-white/10 p-1 bg-white/[0.02] self-start md:self-end">
              {(["Maths", "Physics", "Chemistry"] as const).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${selectedSubject === subject ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Workspace Grid Table */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]">
            {/* Header */}
            <div className="grid grid-cols-12 bg-white/[0.03] border-b border-white/10 px-6 py-3 text-xs font-semibold tracking-wider text-white/40 uppercase">
              <div className="col-span-6 md:col-span-7">Syllabus Topic</div>
              <div className="col-span-4 md:col-span-3 text-center">Resource Progress (N / P / M)</div>
              <div className="col-span-2 text-right">Revision Status</div>
            </div>

            {/* List Body */}
            <div className="divide-y divide-white/5">
              {syllabusList[selectedSubject].map((topic) => {
                const isStale = topic.revisedDaysAgo >= 30;

                return (
                  <div key={topic.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.01] transition-colors">
                    
                    {/* Topic details */}
                    <div className="col-span-6 md:col-span-7 flex flex-col gap-1 pr-4">
                      <span className="text-sm font-semibold">{topic.name}</span>
                      <span className="text-xs text-white/40 truncate max-w-xs sm:max-w-md">{topic.subtopics}</span>
                    </div>

                    {/* Progress dots N / P / M */}
                    <div className="col-span-4 md:col-span-3 flex justify-center items-center gap-3">
                      {(["ncert", "pyq", "module"] as const).map((resKey) => {
                        const isDone = topic.progress[resKey];
                        const resLabel = resKey.charAt(0).toUpperCase();

                        return (
                          <button
                            key={resKey}
                            onClick={() => handleToggleResource(selectedSubject, topic.id, resKey)}
                            title={`Toggle ${resKey.toUpperCase()}`}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all cursor-pointer ${
                              isDone 
                                ? "bg-azure border-azure text-white" 
                                : "border-white/10 hover:border-white/30 text-white/40"
                            }`}
                          >
                            {resLabel}
                          </button>
                        );
                      })}
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-2 text-right">
                      {isStale ? (
                        <span className="inline-flex px-2 py-0.5 rounded border border-white/20 text-[10px] font-semibold text-azure uppercase tracking-wider">
                          Stale: {topic.revisedDaysAgo}d
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded border border-white/5 text-[10px] text-white/40 uppercase tracking-wider">
                          Revised {topic.revisedDaysAgo}d ago
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. PEER COMMUNITY & SOCIAL FEED */}
        <section id="community" className="flex flex-col gap-8 scroll-mt-24">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="text-sm font-semibold text-azure tracking-widest uppercase">Peer Network</div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Study Better, Together</h2>
            <p className="text-base text-white/60">
              Synchronize logs, compare metrics, and stay accountable. Below is a live rendering of the companion peer feed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Friends Activity Feed Component */}
            <div 
              style={glassStyle}
              className="rounded-xl p-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-azure"></span>
                <span className="text-sm font-bold uppercase tracking-wider">Active Peer Stream</span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { name: "Aman Rathore", status: "Solving Matrices PYQs", active: "Just now", hours: "7.8 hrs", initials: "AR" },
                  { name: "Sneha Mahapatra", status: "Completing Organic Chemistry NCERT", active: "12 mins ago", hours: "5.2 hrs", initials: "SM" },
                  { name: "Rohan Das", status: "Idle - stopwatch paused", active: "2 hours ago", hours: "4.1 hrs", initials: "RD" }
                ].map((friend, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-display font-semibold text-xs border border-white/20">
                        {friend.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{friend.name}</span>
                        <span className="text-xs text-white/50">{friend.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-mono text-azure">{friend.hours} today</span>
                      <span className="text-[10px] text-white/40">{friend.active}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shareable OG Card Exporter preview */}
            <div 
              style={glassStyle}
              className="rounded-xl p-6 flex flex-col justify-between min-h-[300px]"
            >
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-white/40">Dynamic Shareable Card</span>
                <p className="text-xs text-white/60">Generate and export high-res summaries to share on study forums, Discord, or WhatsApp.</p>
              </div>

              {/* Visual Exporter Container Mock */}
              <div className="border border-white/15 rounded bg-black p-4 flex flex-col gap-3 my-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-azure flex items-center justify-center font-bold text-[10px]">JEE</div>
                    <span className="text-xs font-semibold">OJEE-Tracker Profile</span>
                  </div>
                  <span className="font-mono text-[9px] text-white/40">June 28, 2026</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center py-1">
                  <div>
                    <div className="text-[9px] text-white/40 uppercase">Hours Logged</div>
                    <div className="text-base font-bold text-azure">{studyHoursToday.toFixed(1)}h</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-white/40 uppercase">Overall Progress</div>
                    <div className="text-base font-bold text-white">{Math.round((totalCompletedItems / 36) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-white/40 uppercase">Countdown</div>
                    <div className="text-base font-bold text-white">{countdownDays}d</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert("Simulated Profile Exporter triggered. High-res card ready for clipboard!")}
                className="w-full h-10 rounded border border-white/20 text-xs font-semibold tracking-wide uppercase hover:bg-white/5 hover:border-white/40 transition-colors cursor-pointer"
              >
                Export Progress summary Card
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-white flex items-center justify-center font-display font-bold text-xs tracking-tighter">
              OT
            </div>
            <span className="font-display font-semibold text-sm tracking-tight">OJEE-Tracker</span>
          </div>

          <p className="text-xs text-white/40 text-center md:text-left">
            &copy; 2026 OJEE-Tracker. Built with React, Next.js, and Framer Motion. Open source under the MIT License.
          </p>

          <div className="flex items-center gap-6 text-xs text-white/60">
            <a href="https://github.com/Namankatiyar/ojee-tracker/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">License</a>
            <a href="https://discord.gg/6dKrbVQU8W" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
