import React from "react";
import Image from "next/image";
import Link from "next/link";

function ExternalLinkIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 ml-1 inline-block opacity-65 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export default function Footer() {
  const TRACKER_URL = "https://tracker.ojeet.tech";

  return (
    <footer aria-label="Site Footer" className="border-t border-footer-border bg-background py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        {/* Main Footer Links Grid - 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <Image
                src="/logo.png"
                alt="OJEE-Tracker logo"
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="font-display font-bold text-base tracking-tight group-hover:text-azure transition-colors">
                OJEE-Tracker
              </span>
            </Link>
            <p className="text-xs text-muted-text leading-relaxed">
              The offline-first study planner, syllabus tracker, time tracker, and mock score ledger for JEE &amp; NEET students. 100% free and completely ad-free.
            </p>
            <div className="pt-1">
              <a
                href={TRACKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-azure text-white text-xs font-semibold hover:bg-azure/90 transition-all shadow-xs"
              >
                <span>Launch App (Free)</span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Platform & Features */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-foreground">
              Platform &amp; Tools
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-text">
              <li>
                <a
                  href={TRACKER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center font-medium text-azure"
                >
                  Web &amp; Mobile App (PWA)
                  <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <Link href="/#dashboard-preview" className="hover:text-foreground transition-colors">
                  Interactive Cockpit Demo
                </Link>
              </li>
              <li>
                <Link href="/#community" className="hover:text-foreground transition-colors">
                  Friends Study Network
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground transition-colors">
                  100% Free Guarantee
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-foreground transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Strategy & Planning (Blog Backlinks) */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-foreground">
              Strategy &amp; Planning
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-text">
              <li>
                <Link
                  href="/blog/clear-class-11-backlog-strategy"
                  className="hover:text-foreground transition-colors"
                >
                  Class 11 Backlog Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/last-60-days-revision-protocol"
                  className="hover:text-foreground transition-colors"
                >
                  Last 60 Days Revision Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/subtopic-checklist-jee-neet"
                  className="hover:text-foreground transition-colors"
                >
                  JEE &amp; NEET Subtopic Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/notion-excel-vs-study-tracker"
                  className="hover:text-foreground transition-colors"
                >
                  Notion vs Dedicated Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-azure hover:underline transition-colors font-medium inline-flex items-center gap-1 pt-0.5"
                >
                  <span>All Preparation Guides</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Subject & Score Mastery (Blog Backlinks) */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-foreground">
              Subject &amp; Score Mastery
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-text">
              <li>
                <Link
                  href="/blog/mock-test-analysis-framework"
                  className="hover:text-foreground transition-colors"
                >
                  Mock Test Analysis Framework
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/organic-chemistry-mastery-roadmap"
                  className="hover:text-foreground transition-colors"
                >
                  Organic Chemistry Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/jee-neet-subject-balance-formula"
                  className="hover:text-foreground transition-colors"
                >
                  40-30-30 Subject Balance
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/deep-work-pomodoro-study-routine"
                  className="hover:text-foreground transition-colors"
                >
                  Pomodoro Deep Work Routine
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ad-free-offline-study-tools"
                  className="hover:text-foreground transition-colors"
                >
                  Ad-Free &amp; Offline Study Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Community & Open Source */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-foreground">
              Community &amp; Connect
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-text">
              <li>
                <Link
                  href="/blog/peer-accountability-without-distraction"
                  className="hover:text-foreground transition-colors"
                >
                  Peer Accountability Study Pods
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/6dKrbVQU8W"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center"
                >
                  Discord Study Server
                  <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Namankatiyar/ojeet-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center"
                >
                  GitHub Repository
                  <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Namankatiyar/ojeet-tracker/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center"
                >
                  Report Issue / Feedback
                  <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center"
                >
                  GNU GPL-3.0 License
                  <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-subtle-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-text-strong text-center md:text-left">
            &copy; 2026 OJEE-Tracker. Built with precision for JEE &amp; NEET aspirants. Open source under GNU GPLv3.
          </p>

          <div className="flex items-center gap-6 text-xs text-muted-text">
            <a
              href="https://www.gnu.org/licenses/gpl-3.0.en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GPL-3.0 License
            </a>
            <a
              href="https://tracker.ojeet.tech/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://tracker.ojeet.tech/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
