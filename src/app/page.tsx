import React from "react";
import type { Metadata, Viewport } from "next";
import LandingPageClient from "./LandingPageClient";
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
  themeColor: "#0080ff", // Azure/blue brand accent color for social previews
  width: "device-width",
  initialScale: 1,
};

export default function LandingPage() {
  // Rich Graph JSON-LD Schema: WebSite, SoftwareApplication, FAQPage, BreadcrumbList, Organization
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

  return (
    <>
      {/* Inject Rich JSON-LD Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPageClient />
    </>
  );
}
