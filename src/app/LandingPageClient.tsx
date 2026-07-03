"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import InteractiveGrid from "../../InteractiveGrid";
import BentoGrid from "@/components/BentoGrid";
import ShareableCard from "@/components/ShareableCard";

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

export default function LandingPageClient() {
  const TRACKER_URL = "https://tracker.ojeet.tech";
  
  // App-specific interactive demo states
  const [countdownDays] = useState(142);
  const [studyHoursToday] = useState(6.4);

  // Glassmorphic CSS style generation
  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  };

  return (
    <div className="flex flex-1 flex-col bg-black text-white selection:bg-azure selection:text-white font-sans overflow-x-hidden">
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
                    className="absolute inline-flex h-full w-full rounded-full bg-azure/70"
                    animate={{ scale: [1, 2.3, 1], opacity: [0.7, 0.15, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-azure/55"
                    animate={{ scale: [1, 2.3, 1], opacity: [0, 0.45, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                  />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-azure" />
                </div>
              </span>
            </div>

            {/* Hero Heading: Outfit font with tight letter spacing */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Finally, a Planner That Gets It.
              <span className="block text-xs sm:text-sm font-medium tracking-widest text-azure uppercase mt-4">
                built by a jee aspirant for jee aspirants.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 font-normal leading-relaxed max-w-2xl mb-10">
              Built for the grind. Track your syllabus down to the last subtopic, log every study hour, and analyse your progress — offline-first, always instant.
            </p>

            {/* Call to Actions (No glows, high contrast borders) */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={TRACKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-white text-black font-semibold text-base tracking-tight hover:bg-white/90 transition-all cursor-pointer"
              >
                <span>Open Tracker</span>
                <Icons.ExternalLink />
              </a>
              <a 
                href="https://github.com/Namankatiyar/ojee-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-white/5 border border-white/20 text-white font-medium text-base hover:bg-white/10 hover:border-white/40 transition-colors"
                style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
              >
                <Icons.Github />
                <span>View on GitHub</span>
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
            <h2 className="font-display text-3xl font-bold tracking-tight">All the features you need.</h2>
            <p className="text-base text-white/60">
              Every stat available at your fingertips.
            </p>
          </div>

          <BentoGrid />
        </section>

        {/* 6. PEER COMMUNITY & SOCIAL FEED */}
        <section id="community" className="flex flex-col gap-8 scroll-mt-24">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="text-sm font-semibold text-azure tracking-widest uppercase">Friends Network</div>
            <h2 className="font-display text-3xl font-bold tracking-tight">Study Better, Together</h2>
            <p className="text-base text-white/60">
              Synchronize logs, compare metrics, and stay accountable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Friends Activity Feed Component */}
            <div 
              style={glassStyle}
              className="rounded-xl p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-azure"></span>
                  <span className="text-sm font-bold uppercase tracking-wider">Friends</span>
                </div>
                <span className="text-xs text-white/40 font-mono">4 peers live</span>
              </div>

              <div className="peer-list flex flex-col gap-3 transition-all duration-200">
                {[
                  { name: "Aman Rathore", status: "Solving Matrices PYQs", active: "Just now", hours: "7.8 hrs", initials: "AR", isOnline: true },
                  { name: "Priya Sharma", status: "Revising Modern Physics formulas", active: "5 mins ago", hours: "6.4 hrs", initials: "PS", isOnline: true },
                  { name: "Sneha Mahapatra", status: "Completing Organic Chemistry NCERT", active: "12 mins ago", hours: "5.2 hrs", initials: "SM", isOnline: true },
                  { name: "Aditya Patel", status: "Writing Organic Chemistry Notes", active: "45 mins ago", hours: "4.8 hrs", initials: "AP", isOnline: true },
                  { name: "Rohan Das", status: "Idle - stopwatch paused", active: "2 hours ago", hours: "4.1 hrs", initials: "RD", isOnline: false },
                  { name: "Tanmay Rao", status: "Solving Integration Practice", active: "1 hour ago", hours: "3.5 hrs", initials: "TR", isOnline: false },
                  { name: "Divya Nair", status: "Mock Test Analysis - Test 3", active: "3 hours ago", hours: "8.2 hrs", initials: "DN", isOnline: false }
                ].map((friend, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01] transition-all duration-150 hover:bg-white/[0.03] hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-display font-semibold text-xs border border-white/20">
                          {friend.initials}
                        </div>
                        {friend.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-azure border border-black" />
                        )}
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

            {/* Redesigned Shareable Card Component */}
            <ShareableCard hoursToday={studyHoursToday} countdownDays={countdownDays} />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-azure tracking-widest uppercase">Ready to track</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-2">
                Open the tracker when you&apos;re ready to turn the grind into data.
              </h2>
            </div>

            <a
              href={TRACKER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded bg-white text-black font-semibold text-base tracking-tight hover:bg-white/90 transition-all"
            >
              <span>Open Tracker</span>
              <Icons.ExternalLink />
            </a>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="OJEE-Tracker logo"
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
            />
            <span className="font-display font-semibold text-sm tracking-tight">OJEE-Tracker</span>
          </div>

          <p className="text-xs text-white/40 text-center md:text-left">
            &copy; 2026 OJEE-Tracker. Open source under the GNU GPLv3 License.
          </p>

          <div className="flex items-center gap-4 text-xs text-white/60">
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">License</a>
            <a href="https://tracker.ojeet.tech/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
            <a href="https://tracker.ojeet.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
