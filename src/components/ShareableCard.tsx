"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Banner preset options inspired by reference themes (Sunset, Cyberpunk, Ethereal, Deep Space)
const BANNER_PRESETS = [
  {
    id: "sunset",
    name: "Crimson Horizon",
    gradient: "from-rose-500 via-orange-500 to-amber-400",
    pattern: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 40%)"
  },
  {
    id: "cyberpunk",
    name: "Neon Cyber",
    gradient: "from-purple-600 via-indigo-600 to-cyan-400",
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)"
  },
  {
    id: "ethereal",
    name: "Emerald Garden",
    gradient: "from-emerald-600 via-teal-500 to-lime-400",
    pattern: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.25) 0%, transparent 50%)"
  },
  {
    id: "void",
    name: "Cosmic Void",
    gradient: "from-slate-900 via-blue-950 to-indigo-900",
    pattern: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.2) 0%, transparent 60%)"
  }
];

export default function ShareableCard() {
  const [activeBanner, setActiveBanner] = useState(BANNER_PRESETS[0]);
  const [copied, setCopied] = useState(false);

  // Interactive Agenda items state
  const [agenda, setAgenda] = useState([
    { id: 1, title: "Electrostatics & Gauss Law (PYQs)", time: "3:00 PM", done: false, color: "bg-purple-500 shadow-purple-500/50" },
    { id: 2, title: "Coordination Compounds Revision", time: "5:30 PM", done: false, color: "bg-amber-400 shadow-amber-400/50" },
    { id: 3, title: "Rotational Dynamics Mock Analysis", time: "8:00 PM", done: true, color: "bg-emerald-500 shadow-emerald-500/50" },
    { id: 4, title: "Definite Integration Module Qs", time: "10:30 PM", done: false, color: "bg-cyan-400 shadow-cyan-400/50" }
  ]);

  const toggleAgendaItem = (id: number) => {
    setAgenda((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleExport = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Banner Theme Switcher Toolbar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-white/50 font-medium">Select Card Aesthetic:</span>
        <div className="flex items-center gap-2">
          {BANNER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setActiveBanner(preset)}
              title={preset.name}
              className={`w-5 h-5 rounded-full bg-gradient-to-tr ${preset.gradient} transition-transform cursor-pointer ${
                activeBanner.id === preset.id
                  ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-black"
                  : "opacity-60 hover:opacity-100 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Card Container */}
      <motion.div
        layout
        className="relative bg-[#0d0e12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
      >
        {/* Top Banner Artwork */}
        <div className={`relative h-28 w-full bg-gradient-to-r ${activeBanner.gradient} overflow-hidden transition-colors duration-500`}>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: activeBanner.pattern }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0e12]/80" />
        </div>

        {/* Card Body */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar & Online Status Row */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            {/* Overlapping Avatar Circle */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-[#0d0e12] bg-[#1a1c26] flex items-center justify-center shadow-xl overflow-hidden group">
                {/* Minimalist Aspirant Emblem inside Avatar */}
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex flex-col items-center justify-center">
                  <svg className="w-8 h-8 text-white/80 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0d0e12]" />
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active study session</span>
            </div>
          </div>

          {/* Notice: No name displayed here, as specifically requested! */}
          
          {/* Motto / Status Quote & Tag Pills */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex items-center gap-2 text-xs text-white/70 italic font-mono pl-1 border-l-2 border-azure">
              <span>&ldquo;Grinding Physics & PYQs. No shortcuts.&rdquo;</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-azure" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
                <span>Dropper</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                <span>JEE 2027</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-azure/10 border border-azure/30 text-[10px] font-mono font-bold text-azure tracking-wider uppercase">
                AIR &lt; 500
              </span>
            </div>
          </div>

          {/* Divider & Metrics Toolbar Row */}
          <div className="py-3.5 border-y border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-5">
            {/* Left Metrics */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-white/40">⏱</span>
                <span className="font-bold text-white">6h 40m</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-white/40">⚡</span>
                <span className="font-bold text-white">93 Qs</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-white/40">🔥</span>
                <span className="font-bold text-amber-400">14d</span>
              </div>
            </div>

            {/* Right Weekly Heatmap */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                {(["F", "S", "S", "M", "T", "W", "T"] as const).map((day, i) => {
                  // Simulate heatmap levels
                  const levels = ["bg-emerald-500", "bg-emerald-500", "bg-white/10", "bg-emerald-400", "bg-emerald-600", "bg-emerald-500", "bg-azure animate-pulse"];
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-2.5 h-2.5 rounded-[2px] ${levels[i]} transition-transform hover:scale-125`} />
                      <span className="text-[8px] font-mono text-white/30">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Today's Agenda Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">
                Today&apos;s Agenda
              </span>
              <span className="text-[10px] text-white/30 font-mono">Click to check off</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {agenda.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleAgendaItem(item.id)}
                  className={`group flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                    item.done
                      ? "bg-white/[0.01] border-white/5 opacity-50"
                      : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${item.done ? "bg-white/20" : item.color}`} />
                    <span className={`text-xs truncate transition-all ${item.done ? "line-through text-white/40" : "font-medium text-white/90"}`}>
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/40 ml-2 shrink-0 group-hover:text-white/70 transition-colors">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer Action Bar */}
        <div className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-white/40 font-mono">Interactive Live Snapshot</span>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                <span>Share Card Link</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
