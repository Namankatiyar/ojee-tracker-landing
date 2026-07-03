"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ShareableCardProps {
  hoursToday?: number;
  countdownDays?: number;
}

export default function ShareableCard({ hoursToday = 6.4, countdownDays = 142 }: ShareableCardProps) {
  const [copied, setCopied] = useState(false);

  // Interactive Agenda items aligned with the Obsidian Command Deck language
  const [agenda, setAgenda] = useState([
    { id: 1, title: "Electrostatics & Gauss Law (PYQs)", time: "15:00 HRS", done: false, indicator: "border-azure bg-azure/20" },
    { id: 2, title: "Coordination Compounds Revision", time: "17:30 HRS", done: false, indicator: "border-white/40 bg-transparent" },
    { id: 3, title: "Rotational Dynamics Mock Analysis", time: "20:00 HRS", done: true, indicator: "border-azure bg-azure" },
    { id: 4, title: "Definite Integration Module Qs", time: "22:30 HRS", done: false, indicator: "border-white/40 bg-transparent" }
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
    <div className="w-full">
      {/* Main Obsidian Command Deck Card Container */}
      <motion.div
        layout
        className="relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
      >
        {/* Top Blueprint Header Canvas (No glow, high precision grid lines) */}
        <div className="relative h-24 w-full bg-[#08080a] border-b border-white/10 overflow-hidden">
          {/* Clean Top Header Canvas */}
        </div>

        {/* Card Body */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar & Online Status Row */}
          <div className="flex items-end justify-between -mt-10 mb-5">
            {/* High-Contrast Monogram Avatar (Border-Only Depth Rule) */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-white/20 bg-black flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-white/[0.02] flex items-center justify-center font-display font-black text-3xl text-white tracking-tight">
                  OT
                </div>
              </div>
            </div>

            {/* High-Contrast Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded border border-white/15 bg-white/[0.02] text-xs font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>STUDYING</span>
            </div>
          </div>

          {/* Motto & Tag Pills */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-white/70 pl-2.5 border-l border-azure">
              <span>Grinding with absolute focus.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-white/90">
                DROPPER
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-xs font-mono text-white/90">
                JEE 2027
              </span>
            </div>
          </div>

          {/* Divider & Technical Metrics Row */}
          <div className="py-3.5 border-y border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
            {/* Left Metrics */}
            <div className="flex items-center gap-5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-white/40 uppercase text-[10px]">TIME</span>
                <span className="font-semibold text-white">{hoursToday.toFixed(1)}H</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-white/40 uppercase text-[10px]">SOLVED</span>
                <span className="font-semibold text-white">93 QS</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-white/40 uppercase text-[10px]">STREAK</span>
                <span className="font-semibold text-azure">14D</span>
              </div>
            </div>

            {/* Right Weekly Activity Matrix */}
            <div className="flex items-center gap-1.5">
              {(["F", "S", "S", "M", "T", "W", "T"] as const).map((day, i) => {
                // High-precision monochromatic/azure heatmap blocks
                const isActive = i === 6 || i === 1 || i === 3 || i === 4 || i === 1 || i === 6;
                const isHighlight = i === 6;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-2.5 h-2.5 rounded-[1px] transition-colors ${
                        isHighlight
                          ? "bg-green-400"
                          : isActive
                          ? "bg-green-700"
                          : "bg-green-500"
                      }`}
                    />
                    <span className="text-[8px] font-mono text-white/30">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Agenda Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium tracking-widest text-white/40 uppercase">
                TODAY&apos;S AGENDA
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {agenda.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleAgendaItem(item.id)}
                  className={`group flex items-center justify-between p-3 rounded border transition-all cursor-pointer ${
                    item.done
                      ? "bg-white/[0.01] border-white/5 opacity-50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-[1px] border shrink-0 transition-colors ${
                        item.done ? "bg-azure border-azure" : item.indicator
                      }`}
                    />
                    <span
                      className={`text-xs font-sans truncate transition-all ${
                        item.done ? "line-through text-white/40" : "text-white/90"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 ml-2 shrink-0 group-hover:text-white/70 transition-colors">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer Action Bar */}
        <div className="bg-white/[0.01] border-t border-white/10 h-9">
        </div>
      </motion.div>
    </div>
  );
}
