import React from "react";
import type { Metadata, Viewport } from "next";
import LandingPageClient from "./LandingPageClient";

// Page-specific metadata configuration
export const metadata: Metadata = {
  title: "OJEE-Tracker | Premium JEE, NEET Study Command Centre",
  description:
    "Track syllabus down to the last subtopic, log study hours, and analyze progress. An offline-first study command center built for JEE, NEET & OJEE aspirants.",
  keywords: [
    "OJEE-Tracker",
    "JEE study planner",
    "NEET study planner",
    "JEE syllabus tracker",
    "NEET syllabus tracker",
    "IIT JEE preparation app",
    "JEE NEET online planner",
    "study hours tracker",
    "JEE daily schedule",
    "OJEE tracker",
    "JEE main Advanced preparation",
    "free JEE tracker",
    "JEE NEET study tracker",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OJEE-Tracker | Premium JEE, NEET Study Command Centre",
    description:
      "Track syllabus, analyze progress, log study hours, and connect with peers. An offline-first study command center built for JEE, NEET & OJEE aspirants.",
    url: "https://ojeet.tech",
    siteName: "OJEE-Tracker",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "OJEE-Tracker App Dashboard showing syllabus tracker, study timer, and analytics.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OJEE-Tracker | Premium JEE, NEET & OJEE Study Command Centre",
    description:
      "Track syllabus, analyze progress, log study hours, and connect with peers. An offline-first study command center built for JEE, NEET & OJEE aspirants.",
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
  // SoftwareApplication JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OJEE-Tracker",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "description":
      "An offline-first study command center built for JEE, NEET & OJEE aspirants. Track syllabus, analyze progress, log study hours, and connect with peers.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
    "url": "https://ojeet.tech",
    "softwareVersion": "1.0.0",
    "applicationSubCategory": "Study Planner & Syllabus Tracker",
    "screenshot": "https://ojeet.tech/og_image.png",
    "author": {
      "@type": "Person",
      "name": "Naman Katiyar",
      "url": "https://github.com/Namankatiyar",
    },
    "publisher": {
      "@type": "Organization",
      "name": "OJEE-Tracker",
      "url": "https://ojeet.tech",
    },
  };

  return (
    <>
      {/* Inject JSON-LD Schema markup */}
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
