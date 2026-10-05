import React from "react";

export default function BlogCtaBanner({
  customTitle,
  customSubtitle,
}: {
  customTitle?: string;
  customSubtitle?: string;
}) {
  const TRACKER_URL = "https://tracker.ojeet.tech";

  return (
    <section className="my-14 rounded-2xl border-2 border-azure/40 bg-gradient-to-br from-azure/[0.08] via-foreground/[0.02] to-transparent p-6 sm:p-10 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -right-16 -bottom-16 w-64 h-64 bg-azure/10 rounded-full blur-3xl pointer-events-none"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-azure tracking-widest uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-azure animate-ping" />
            100% Free · Zero Ads · Offline PWA
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {customTitle || "Take Control of Your JEE & NEET Prep Today"}
          </h3>
          <p className="text-sm text-muted-text leading-relaxed">
            {customSubtitle ||
              "Stop juggling messy notebooks, laggy Notion templates, and ad-filled timers. Track your subtopics, log focused hours, and record mock scores in one ad-free command center."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href={TRACKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 h-12 rounded bg-foreground text-background font-semibold text-sm tracking-tight hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-foreground/5"
          >
            <span>Open Tracker (Free)</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
