import React from "react";
import type { Metadata, Viewport } from "next";
import InteractiveGrid from "@/components/InteractiveGrid";
import BentoGrid from "@/components/BentoGrid";
import ShareableCard from "@/components/ShareableCard";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { FAQ_ITEMS } from "@/data/faqData";

// Page-specific metadata configuration optimized for search engines
export const metadata: Metadata = {
  title: "OJEE-Tracker | Study Planner, Syllabus & Mock Score Tracker for JEE & NEET",
  description:
    "Completely ad-free study planner and prep tracker for JEE and NEET students. Plan your syllabus down to subtopics, log focused study hours with an offline time tracker, and record mock test scores.",
  keywords: [
    "study planner for JEE and NEET students",
    "syllabus planner for JEE and NEET",
    "prep tracker for JEE and NEET",
    "preparation tracker for JEE and NEET",
    "time tracker for JEE and NEET",
    "study hours tracker for JEE and NEET",
    "mock score tracker for JEE and NEET",
    "score tracker for JEE and NEET",
    "completely ad free study planner",
    "ad free JEE tracker",
    "ad free NEET prep tracker",
    "JEE study planner",
    "NEET study planner",
    "JEE syllabus tracker",
    "NEET syllabus tracker",
    "free JEE tracker",
    "free NEET planner",
    "JEE Main 2026 checklist",
    "IIT JEE preparation app",
    "offline study command center",
    "Pomodoro study timer JEE",
    "subtopic syllabus tracker",
    "peer study accountability network"
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/landing.md",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "OJEE-Tracker | Study Planner & Prep Tracker for JEE & NEET (100% Ad-Free)",
    description:
      "Plan your syllabus, log focused hours with our time tracker, and record mock test scores. 100% completely ad-free study command center built for JEE & NEET students.",
    url: "https://ojeet.tech",
    siteName: "OJEE-Tracker",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "OJEE-Tracker Dashboard showing syllabus planner, study time tracker, mock score ledger, and peer study network.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OJEE-Tracker | Study Planner & Prep Tracker for JEE & NEET (100% Ad-Free)",
    description:
      "Plan syllabus, log study hours with a time tracker, and track mock test scores. 100% free and completely ad-free study command center for JEE & NEET aspirants.",
    images: ["/og_image.png"],
  },
};

// Viewport configuration for browser styling & Discord/Telegram embed accent color
export const viewport: Viewport = {
  themeColor: "#0080ff",
  width: "device-width",
  initialScale: 1,
};

const TRACKER_URL = "https://tracker.ojeet.tech";

const friendsData = [
  { name: "Aman Rathore", status: "Solving Matrices PYQs", active: "Just now", hours: "7.8 hrs", initials: "AR", isOnline: true },
  { name: "Priya Sharma", status: "Revising Modern Physics formulas", active: "5 mins ago", hours: "6.4 hrs", initials: "PS", isOnline: true },
  { name: "Sneha Mahapatra", status: "Completing Organic Chemistry NCERT", active: "12 mins ago", hours: "5.2 hrs", initials: "SM", isOnline: true },
  { name: "Aditya Patel", status: "Writing Organic Chemistry Notes", active: "45 mins ago", hours: "4.8 hrs", initials: "AP", isOnline: true },
  { name: "Rohan Das", status: "Idle - stopwatch paused", active: "2 hours ago", hours: "4.1 hrs", initials: "RD", isOnline: false },
  { name: "Tanmay Rao", status: "Solving Integration Practice", active: "1 hour ago", hours: "3.5 hrs", initials: "TR", isOnline: false },
  { name: "Divya Nair", status: "Mock Test Analysis - Test 3", active: "3 hours ago", hours: "8.2 hrs", initials: "DN", isOnline: false }
];

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ojeet.tech/#website",
        "url": "https://ojeet.tech",
        "name": "OJEE-Tracker",
        "description":
          "Completely ad-free study planner, syllabus planner, and mock score tracker for JEE and NEET students.",
        "inLanguage": "en-IN"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://ojeet.tech/#software",
        "name": "OJEE-Tracker",
        "operatingSystem": "All (Web, Android, iOS, Windows, macOS, Linux)",
        "applicationCategory": "EducationalApplication",
        "applicationSubCategory": "Study Planner & Syllabus Tracker",
        "description":
          "A completely ad-free study planner and prep tracker built for JEE and NEET students. Plan syllabus down to subtopics, log deep work with an offline time tracker, and record mock test scores.",
        "url": "https://ojeet.tech",
        "softwareVersion": "1.0.0",
        "screenshot": "https://ojeet.tech/og_image.png",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2030-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "520",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Subtopic Syllabus Planner for JEE & NEET",
          "Deep Work Study Time Tracker with Pomodoro & Stopwatch",
          "Mock Test Score & Accuracy Tracker (300 / 720 Marks)",
          "100% Completely Ad-Free Experience (Zero Advertisements)",
          "Offline-First Local Storage (IndexedDB)",
          "Peer Accountability & Friends Study Hours Feed",
          "PWA Standalone App for Android, iOS, Windows, Mac",
          "100% Free Forever under GNU GPLv3"
        ],
        "author": {
          "@type": "Person",
          "name": "Naman Katiyar",
          "url": "https://github.com/Namankatiyar"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OJEE-Tracker",
          "url": "https://ojeet.tech",
          "logo": "https://ojeet.tech/logo.png"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://ojeet.tech/#faq",
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://ojeet.tech/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ojeet.tech"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://ojeet.tech/#dashboard-preview"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Friends Network",
            "item": "https://ojeet.tech/#community"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Pricing",
            "item": "https://ojeet.tech/#pricing"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "FAQ",
            "item": "https://ojeet.tech/#faq"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://ojeet.tech/#organization",
        "name": "OJEE-Tracker",
        "url": "https://ojeet.tech",
        "logo": "https://ojeet.tech/logo.png",
        "sameAs": [
          "https://github.com/Namankatiyar/ojeet-tracker",
          "https://discord.gg/6dKrbVQU8W"
        ]
      }
    ]
  };

  const glassStyle = {
    backgroundColor: "var(--card-bg)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid var(--card-border)"
  };

  return (
    <>
      {/* Inject Rich JSON-LD Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-1 flex-col bg-background text-foreground selection:bg-azure selection:text-white font-sans overflow-x-hidden">
        {/* Hero Section (Server Component with Client Grid Island) */}
        <div className="relative w-full bg-background border-b border-subtle-border overflow-hidden">
          <InteractiveGrid />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

          <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 md:py-20">
            <section className="relative flex flex-col items-center text-center max-w-4xl mx-auto">
              <div
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-foreground/5 border border-subtle-border text-xs font-semibold mb-6"
                style={{ backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
              >
                <div className="flex -space-x-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-azure flex items-center justify-center text-[8px] text-white font-mono font-bold border-0">A</span>
                  <span className="w-4.5 h-4.5 rounded-full bg-purple-600 flex items-center justify-center text-[8px] text-white font-mono font-bold border-0">R</span>
                  <span className="w-4.5 h-4.5 rounded-full bg-emerald-600 flex items-center justify-center text-[8px] text-white font-mono font-bold border-0">S</span>
                </div>
                <span className="text-muted-text tracking-wide uppercase text-[10px] flex items-center gap-2">
                  Join 500+ JEE & NEET Aspirants · 100% Ad-Free
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-azure/70 animate-ping opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-azure" />
                  </div>
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
                The Complete Study Planner & Prep Tracker for JEE & NEET
                <span className="block text-xs sm:text-sm font-semibold tracking-widest text-azure uppercase mt-4">
                  Syllabus Planner · Time Tracker · Mock Score Tracker · 100% Ad-Free
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-text font-normal leading-relaxed max-w-3xl mb-8">
                Built for serious aspirants by an IIT JEE student. Plan your syllabus down to the exact subtopic, log every focused hour with a distraction-free time tracker, and record mock test scores — completely ad-free, offline-first, and always instant.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href={TRACKER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-foreground text-background font-semibold text-base tracking-tight hover:opacity-90 transition-all cursor-pointer"
                >
                  <span>Open Tracker (Free)</span>
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/Namankatiyar/ojeet-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 h-12 rounded bg-foreground/5 border border-subtle-border text-foreground font-medium text-base hover:bg-foreground/10 transition-colors"
                  style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>View on GitHub</span>
                </a>
              </div>

              {/* Core Feature Value Badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-muted-text">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4.5 h-4.5 text-azure" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                  <span>Syllabus Planner for JEE & NEET</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4.5 h-4.5 text-azure" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                  <span>Deep Work Time Tracker</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4.5 h-4.5 text-azure" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                  <span>Mock Score & Accuracy Tracker</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4.5 h-4.5 text-azure" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                  </svg>
                  <span>100% Completely Ad-Free</span>
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-24">
          {/* Dashboard Preview Section (RSC Header with BentoGrid Client Island) */}
          <section id="dashboard-preview" className="flex flex-col gap-8 scroll-mt-24">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="text-sm font-semibold text-azure tracking-widest uppercase">Core JEE & NEET Prep Tools</div>
              <h2 className="font-display text-3xl font-bold tracking-tight">One Command Centre. Every Tracker You Need.</h2>
              <p className="text-base text-muted-text">
                A granular syllabus planner, precision study time tracker, and mock score ledger — designed without ads, paywalls, or subscriptions.
              </p>
            </div>
            <BentoGrid />
          </section>

          {/* Community Section (RSC Header & Friends List with ShareableCard Client Island) */}
          <section id="community" className="flex flex-col gap-8 scroll-mt-24">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="text-sm font-semibold text-azure tracking-widest uppercase">Peer Accountability Network</div>
              <h2 className="font-display text-3xl font-bold tracking-tight">Study Better, Together</h2>
              <p className="text-base text-muted-text">
                Sync study hours, compare prep velocity with fellow JEE & NEET students, and stay disciplined without social media distraction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                style={glassStyle}
                className="rounded-xl p-6 flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-azure"></span>
                    <span className="text-sm font-bold uppercase tracking-wider">Friends</span>
                  </div>
                  <span className="text-xs text-muted-text-strong font-mono">4 peers live</span>
                </div>

                <div className="peer-list flex flex-col gap-3 transition-all duration-200">
                  {friendsData.map((friend, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-subtle-border bg-table-row-bg transition-all duration-150 hover:bg-table-row-bg-hover hover:border-card-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center font-display font-semibold text-xs border border-card-border">
                            {friend.initials}
                          </div>
                          {friend.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-azure border border-background" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{friend.name}</span>
                          <span className="text-xs text-muted-text">{friend.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-mono text-azure">{friend.hours} today</span>
                        <span className="text-[10px] text-muted-text-strong">{friend.active}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ShareableCard hoursToday={6.4} countdownDays={142} />
            </div>
          </section>

          {/* Pricing Section (100% Free Forever & Completely Ad-Free RSC) */}
          <PricingSection />

          {/* Detailed FAQ Section (Client Island) */}
          <FaqSection />

          {/* CTA Banner Section (RSC) */}
          <section className="rounded-2xl border border-subtle-border bg-gradient-to-r from-foreground/[0.04] via-foreground/[0.02] to-foreground/[0.04] px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold text-azure tracking-widest uppercase">Start Your Prep Today</div>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-2">
                  Turn your daily study hours into top percentile consistency.
                </h2>
                <p className="text-sm text-muted-text mt-1">
                  Open the completely ad-free study planner, syllabus tracker, and mock score tracker. Built by students who know the grind.
                </p>
              </div>
              <a
                href={TRACKER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded bg-foreground text-background font-semibold text-base tracking-tight hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Open Tracker (Free)</span>
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </a>
            </div>
          </section>
        </main>

        {/* Footer (Server Component) */}
        <Footer />
      </div>
    </>
  );
}
