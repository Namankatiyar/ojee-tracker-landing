"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ShareableCardProps {
  hoursToday?: number;
  countdownDays?: number;
}

export default function ShareableCard({ hoursToday = 6.4, countdownDays = 142 }: ShareableCardProps) {
  const [copied, setCopied] = useState(false);

  const [agenda, setAgenda] = useState([
    { id: 1, title: "Electrostatics & Gauss Law (PYQs)", time: "15:00 HRS", done: false, indicator: "border-azure bg-azure/20" },
    { id: 2, title: "Coordination Compounds Revision", time: "17:30 HRS", done: false, indicator: "border-card-border bg-transparent" },
    { id: 3, title: "Rotational Dynamics Mock Analysis", time: "20:00 HRS", done: true, indicator: "border-azure bg-azure" },
    { id: 4, title: "Definite Integration Module Qs", time: "22:30 HRS", done: false, indicator: "border-card-border bg-transparent" }
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
      <motion.div
        layout
        className="relative bg-card-solid border border-subtle-border rounded-xl overflow-hidden transition-all duration-200"
      >
        <div className="relative h-24 w-full bg-card-hover border-b border-subtle-border overflow-hidden">
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-card-border bg-background flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-foreground/[0.02] flex items-center justify-center font-display font-black text-3xl text-foreground tracking-tight">
                  OT
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded border border-subtle-border bg-card-bg text-xs font-mono text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>STUDYING</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-text pl-2.5 border-l border-azure">
              <span>Grinding with absolute focus.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-foreground/[0.03] border border-subtle-border text-xs font-mono text-foreground/90">
                DROPPER
              </span>
              <span className="px-2.5 py-1 rounded bg-foreground/[0.03] border border-subtle-border text-xs font-mono text-foreground/90">
                JEE 2027
              </span>
            </div>
          </div>

          <div className="py-3.5 border-y border-subtle-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
            <div className="flex items-center gap-5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-text-strong uppercase text-[10px]">TIME</span>
                <span className="font-semibold text-foreground">{hoursToday.toFixed(1)}H</span>
              </div>
              <div className="w-px h-3 bg-subtle-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-text-strong uppercase text-[10px]">SOLVED</span>
                <span className="font-semibold text-foreground">93 QS</span>
              </div>
              <div className="w-px h-3 bg-subtle-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-text-strong uppercase text-[10px]">STREAK</span>
                <span className="font-semibold text-azure">14D</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {(["F", "S", "S", "M", "T", "W", "T"] as const).map((day, i) => {
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
                    <span className="text-[8px] font-mono text-muted-text-strong">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-medium tracking-widest text-muted-text-strong uppercase">
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
                      ? "bg-table-row-bg border-subtle-border opacity-50"
                      : "bg-table-row-bg border-subtle-border hover:border-card-border hover:bg-table-row-bg-hover"
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
                        item.done ? "line-through text-muted-text-strong" : "text-foreground/90"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-text-strong ml-2 shrink-0 group-hover:text-muted-text transition-colors">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-table-row-bg border-t border-subtle-border h-9">
        </div>
      </motion.div>
    </div>
  );
}
