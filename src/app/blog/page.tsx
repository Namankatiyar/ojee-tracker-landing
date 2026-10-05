import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { getAllBlogPosts, getAllCategories } from "@/data/blogs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JEE & NEET Study Blog & Preparation Guides | OJEE-Tracker",
  description:
    "Actionable, science-backed study strategies, mock test analysis frameworks, subtopic syllabus checklists, and deep work routines for JEE Main, JEE Advanced, and NEET UG aspirants.",
  keywords: [
    "JEE study blog",
    "NEET study guide",
    "JEE Main preparation tips",
    "how to analyze mock tests JEE",
    "JEE syllabus tracker",
    "Pomodoro study timer JEE",
    "Class 11 backlog clearing strategy",
    "ad free study planner"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "JEE & NEET Study Blog & Preparation Guides | OJEE-Tracker",
    description:
      "Actionable study strategies, syllabus checklists, mock score analysis, and deep work routines for JEE & NEET students.",
    url: "https://ojeet.tech/blog",
    siteName: "OJEE-Tracker",
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://ojeet.tech/blog#blog",
        "url": "https://ojeet.tech/blog",
        "name": "OJEE-Tracker Preparation Blog",
        "description":
          "Actionable study blueprints, syllabus checklists, and mock score analysis for JEE & NEET aspirants.",
        "publisher": {
          "@type": "Organization",
          "name": "OJEE-Tracker",
          "url": "https://ojeet.tech",
          "logo": "https://ojeet.tech/logo.png"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://ojeet.tech/blog#breadcrumb",
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
            "name": "Blog",
            "item": "https://ojeet.tech/blog"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-1 flex-col bg-background text-foreground selection:bg-azure selection:text-white font-sans min-h-screen">
        {/* Blog Header / Hero */}
        <div className="relative w-full border-b border-subtle-border bg-gradient-to-b from-foreground/[0.03] to-transparent py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-text">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-azure font-medium">Blog</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/30 text-azure text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-azure animate-pulse" />
              The Preparation Playbook
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl leading-[1.1] mb-6">
              Science-Backed Study Blueprints for JEE & NEET
            </h1>

            <p className="text-base sm:text-lg text-muted-text max-w-2xl leading-relaxed">
              No generic motivation or coaching fluff. In-depth, actionable frameworks on subtopic mastery, mock test analysis, and deep work routines written by top rankers.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <span className="text-xs font-medium text-muted-text-strong mr-1">Topics:</span>
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 border border-subtle-border text-foreground/80 hover:border-azure/40 transition-colors cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <main className="max-w-7xl w-full mx-auto px-6 py-16 flex flex-col gap-12 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Latest Guides & Articles ({posts.length})
            </h2>
            <Link
              href="https://tracker.ojeet.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-azure hover:underline flex items-center gap-1"
            >
              <span>Open Study Tracker</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
