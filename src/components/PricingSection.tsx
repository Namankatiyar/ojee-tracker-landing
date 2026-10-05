"use client";

import React from "react";

const GITHUB_URL = "https://github.com/Namankatiyar/ojeet-tracker";

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-azure shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export default function PricingSection() {
  const coreFeatures = [
    {
      category: "Syllabus Planner & Prep Tracker",
      items: [
        "Complete JEE Main, Advanced & NEET syllabus planned down to subtopics",
        "4 verification milestones: NCERT theory, PYQs, coaching modules & mock tests",
        "Offline-first local storage (IndexedDB) with instant, zero-latency loading",
        "Installable as a Progressive Web App (PWA) on Android, iOS & Windows/Mac",
        "Subject-specific task checklists for daily preparation consistency"
      ]
    },
    {
      category: "Time Tracker & Study Clock",
      items: [
        "Integrated Pomodoro study timer (25/5 min cycles) with subject tagging",
        "Continuous deep-work stopwatch for uninterrupted mock simulations",
        "Friends Network live peer study time and daily hour comparisons",
        "Visual daily time tracker charts with subject hour breakdowns"
      ]
    },
    {
      category: "Mock Score Tracker & Zero Ads",
      items: [
        "Mock test scores ledger for JEE (300 marks) & NEET (720 marks)",
        "Score trajectory and subject-wise accuracy analytics",
        "Completely ad-free experience — zero banner ads, popups, or sponsorships",
        "100% open source under GNU GPLv3 with absolute local data privacy"
      ]
    }
  ];

  const comparisonRows = [
    {
      feature: "Pricing & Subscriptions",
      ojeet: "100% Free Forever (GPLv3)",
      notion: "Free or $10+ for templates",
      commercial: "₹999 – ₹4,999 / year"
    },
    {
      feature: "Offline-First Operation",
      ojeet: "100% Local (IndexedDB)",
      notion: "Requires online sync / laggy",
      commercial: "No (Requires internet)"
    },
    {
      feature: "Granular Subtopic Breakdown",
      ojeet: "Pre-configured for JEE & NEET",
      notion: "Requires manual setup",
      commercial: "Broad chapters only"
    },
    {
      feature: "Integrated Study Stopwatch",
      ojeet: "Built-in with subject tagging",
      notion: "Third-party widget needed",
      commercial: "Basic or missing"
    },
    {
      feature: "User Data Privacy",
      ojeet: "Stored on your device only",
      notion: "Hosted on cloud servers",
      commercial: "Collected by coaching platform"
    },
    {
      feature: "Distraction-Free (Zero Ads)",
      ojeet: "100% Completely Ad-Free",
      notion: "Clean, but general-purpose",
      commercial: "Course upsells & notifications"
    }
  ];

  return (
    <section id="pricing" className="flex flex-col gap-12 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
        <div className="text-sm font-semibold text-azure tracking-widest uppercase">
          100% Free & Completely Ad-Free
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Simple, Honest Pricing. 100% Free Forever.
        </h2>
        <p className="text-base sm:text-lg text-muted-text max-w-2xl">
          The all-in-one study planner, syllabus tracker, time tracker, and mock score tracker for JEE and NEET students. No ads, no credit cards, no paywalls.
        </p>
      </div>

      {/* Single Unified Pricing Card */}
      <div
        className="max-w-4xl mx-auto w-full rounded-2xl border-2 border-azure/40 bg-card-bg/80 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-azure/5 relative overflow-hidden"
      >
        {/* Glow Accent Top Border */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-azure to-transparent"
        />

        {/* Card Header & Price Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-subtle-border">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              The Complete JEE & NEET Prep Command Centre
            </h3>
            <p className="text-xs sm:text-sm text-muted-text max-w-xl">
              Unrestricted access to the syllabus planner, deep work study time tracker, mock test score tracker, and peer accountability network. 100% free forever.
            </p>
          </div>

          {/* Big Price Display */}
          <div className="flex md:flex-col items-baseline md:items-end justify-between md:justify-center shrink-0 gap-1 bg-foreground/[0.03] md:bg-transparent p-4 md:p-0 rounded-xl border border-subtle-border md:border-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-5xl sm:text-6xl font-extrabold text-foreground tracking-tight">
                ₹0
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-text font-medium">
                / free forever
              </span>
            </div>
            <span className="text-[11px] text-azure font-semibold tracking-wide">
              No subscription · No credit card
            </span>
          </div>
        </div>

        {/* 3 Value Pillars Inside the Single Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {coreFeatures.map((pillar, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-azure" />
                {pillar.category}
              </span>
              <ul className="flex flex-col gap-2.5">
                {pillar.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2.5 text-xs text-foreground/85 leading-relaxed">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="rounded-2xl border border-subtle-border bg-card-bg/40 p-6 md:p-8 backdrop-blur-md flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold text-azure tracking-widest uppercase">
            Feature Comparison
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            How OJEE-Tracker Compares to Alternatives
          </h3>
          <p className="text-xs sm:text-sm text-muted-text">
            Compare why aspirants switch from disorganized spreadsheets and paid apps to our focused study command centre.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-subtle-border text-muted-text text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold">Capability</th>
                <th className="py-3 px-3 font-semibold text-azure">OJEE-Tracker</th>
                <th className="py-3 px-3 font-semibold">Notion / Excel</th>
                <th className="py-3 px-3 font-semibold">Paid EdTech Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle-border/50">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-foreground/[0.02] transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{row.feature}</td>
                  <td className="py-3 px-3 font-semibold text-azure flex items-center gap-1.5">
                    <CheckIcon />
                    <span>{row.ojeet}</span>
                  </td>
                  <td className="py-3 px-3 text-muted-text">{row.notion}</td>
                  <td className="py-3 px-3 text-muted-text">{row.commercial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Quote / Philosophy */}
      <div className="p-6 rounded-xl border border-subtle-border bg-gradient-to-r from-azure/5 via-foreground/[0.02] to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="font-display font-semibold text-sm">
            Why is OJEE-Tracker completely free?
          </span>
          <p className="text-xs text-muted-text max-w-xl">
            As students preparing for competitive exams, we were frustrated with expensive coaching paywalls and half-baked trackers. OJEE-Tracker is built as open-source public good for all aspirants.
          </p>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold bg-foreground/10 border border-subtle-border text-foreground hover:bg-foreground/15 transition-colors"
        >
          Star on GitHub ★
        </a>
      </div>
    </section>
  );
}
